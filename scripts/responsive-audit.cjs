/* Responsive audit: load each page at each width, report horizontal overflow + offenders. */
const { chromium } = require("playwright-core");

const PAGES = ["/", "/about", "/skills", "/projects", "/experience", "/contact"];
const WIDTHS = [320, 375, 390, 414, 640, 768, 820, 1024, 1280, 1440, 1728];

(async () => {
  const browser = await chromium.launch();
  const findings = [];

  for (const w of WIDTHS) {
    const h = w < 640 ? 700 : w < 1024 ? 900 : 1000;
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    for (const path of PAGES) {
      const errors = [];
      page.on("console", (m) => m.type() === "error" && errors.push(m.text().slice(0, 120)));
      try {
        await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle", timeout: 20000 });
      } catch (e) {
        findings.push({ w, path, fatal: e.message.slice(0, 100) });
        continue;
      }
      await page.waitForTimeout(700); // let reveal animations settle

      const r = await page.evaluate(() => {
        const doc = document.documentElement;
        const vw = doc.clientWidth;
        const overflowX = doc.scrollWidth - vw;
        const offenders = [];
        if (overflowX > 1) {
          const els = document.querySelectorAll("body *");
          for (const el of els) {
            const b = el.getBoundingClientRect();
            if (b.width > 4 && (b.right > vw + 1 || b.left < -1)) {
              const cs = getComputedStyle(el);
              if (cs.position === "fixed") continue; // rails/marquee are transformed, judge via scroll
              offenders.push({
                tag: el.tagName.toLowerCase(),
                cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || "")
                  .toString().split(/\s+/).slice(0, 4).join("."),
                right: Math.round(b.right - vw),
                w: Math.round(b.width),
                text: (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40),
              });
            }
            if (offenders.length >= 6) break;
          }
        }
        // smallest font-size actually used for visible text (px)
        let minFont = 99;
        for (const el of document.querySelectorAll("h1,h2,h3,p,li,a,button,span,blockquote")) {
          const cs = getComputedStyle(el);
          const fs = parseFloat(cs.fontSize);
          if (cs.display !== "none" && cs.visibility !== "hidden" && fs > 0 && el.textContent.trim()) minFont = Math.min(minFont, fs);
        }
        return { vw, overflowX, offenders, minFont, docScrollW: doc.scrollWidth };
      });

      if (r.overflowX > 1 || errors.length) {
        findings.push({ w, path, overflowX: r.overflowX, docScrollW: r.docScrollW, offenders: r.offenders, errors });
      }
    }
    await ctx.close();
  }
  await browser.close();

  if (!findings.length) console.log("CLEAN: no horizontal overflow at any tested width.");
  for (const f of findings) {
    console.log(`\n== ${f.w}px ${f.path} ${f.fatal ? "FATAL " + f.fatal : ""}`);
    if (f.fatal) continue;
    console.log(`   overflowX=${f.overflowX} (docScrollW=${f.docScrollW})`);
    for (const o of f.offenders) console.log(`   → <${o.tag}> .${o.cls} w=${o.w} right+${o.right} "${o.text}"`);
    if (f.errors) console.log(`   console: ${f.errors.slice(0, 2).join(" | ")}`);
  }
})();
