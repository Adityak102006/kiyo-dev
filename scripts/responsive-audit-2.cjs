/* Audit v2: tap targets, font scaling, cramped grids, overlaps at phone widths. */
const { chromium } = require("playwright-core");

const PAGES = ["/", "/about", "/skills", "/projects", "/experience", "/contact"];
const WIDTHS = [320, 375, 390];

(async () => {
  const browser = await chromium.launch();
  for (const w of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 800 }, deviceScaleFactor: 1, isMobile: w <= 430, hasTouch: w <= 430 });
    const page = await ctx.newPage();
    for (const path of PAGES) {
      try {
        await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle", timeout: 20000 });
      } catch { continue; }
      await page.waitForTimeout(600);
      const r = await page.evaluate(() => {
        const out = { smallTaps: [], bigHeads: [], overlaps: [], cramped: [] };
        // 1. tap targets: visible links/buttons with tiny boxes
        for (const el of document.querySelectorAll("a, button")) {
          const b = el.getBoundingClientRect();
          if (!b.width || !b.height || b.bottom < 0 || b.top > innerHeight) {
            // check only in-viewport ones (fixed header/footer) plus scroll into view would be slow
          }
          if (b.width > 0 && b.height > 0 && (b.height < 30 || b.width < 30)) {
            const cs = getComputedStyle(el);
            if (cs.display === "none" || cs.visibility === "hidden") continue;
            out.smallTaps.push(`${el.tagName}.${(el.className || "").toString().split(/\s+/).slice(0, 2).join(".")} ${Math.round(b.width)}x${Math.round(b.height)} "${(el.textContent || "").trim().slice(0, 25)}"`);
          }
        }
        // 2. headings wider than viewport-ish or absurd font
        for (const h of document.querySelectorAll("h1, h2")) {
          const fs = parseFloat(getComputedStyle(h).fontSize);
          if (fs > 44) out.bigHeads.push(`${h.tagName} fs=${fs} "${(h.textContent || "").trim().slice(0, 35)}"`);
        }
        // 3. cramped: grid cells under 90px wide inside 3+ col grids
        for (const g of document.querySelectorAll('[class*="grid-cols-3"], [class*="grid-cols-4"], [class*="md\\:grid-cols"], [class*="lg\\:grid-cols"]')) {
          const kids = [...g.children];
          if (kids.length >= 3) {
            const widths = kids.map((k) => k.getBoundingClientRect().width);
            if (Math.min(...widths) < 80) {
              out.cramped.push(`grid ${(g.className || "").toString().split(/\s+/).find((c) => c.includes("grid-cols"))} min-child=${Math.round(Math.min(...widths))} kids=${kids.length}`);
            }
          }
        }
        // 4. text-on-text overlap: leaf text elements intersecting (both non-empty, neither descendant)
        const leaves = [...document.querySelectorAll("h1,h2,h3,p,li,a,button,span,blockquote,time")]
          .filter((el) => el.children.length === 0 && (el.textContent || "").trim())
          .map((el) => ({ el, b: el.getBoundingClientRect() }))
          .filter((x) => x.b.width > 10 && x.b.height > 10);
        for (let i = 0; i < leaves.length && out.overlaps.length < 8; i++) {
          for (let j = i + 1; j < leaves.length; j++) {
            const a = leaves[i], c = leaves[j];
            if (a.el.contains(c.el) || c.el.contains(a.el)) continue;
            const ix = Math.min(a.b.right, c.b.right) - Math.max(a.b.left, c.b.left);
            const iy = Math.min(a.b.bottom, c.b.bottom) - Math.max(a.b.top, c.b.top);
            if (ix > 8 && iy > 8) {
              const sa = getComputedStyle(a.el), sc = getComputedStyle(c.el);
              // ignore if one is aria-hidden decoration
              if (a.el.closest('[aria-hidden="true"]') || c.el.closest('[aria-hidden="true"]')) continue;
              out.overlaps.push(`"${(a.el.textContent || "").trim().slice(0, 22)}" ×  "${(c.el.textContent || "").trim().slice(0, 22)}" @${Math.round(ix)}x${Math.round(iy)}`);
            }
          }
        }
        return out;
      });
      const flag = r.smallTaps.length || r.bigHeads.length || r.cramped.length || r.overlaps.length;
      if (flag) {
        console.log(`\n== ${w}px ${path}`);
        if (r.smallTaps.length) console.log("  SMALL TAPS:\n   " + r.smallTaps.slice(0, 6).join("\n   "));
        if (r.bigHeads.length) console.log("  BIG HEADS:\n   " + r.bigHeads.slice(0, 4).join("\n   "));
        if (r.cramped.length) console.log("  CRAMPED:\n   " + [...new Set(r.cramped)].slice(0, 4).join("\n   "));
        if (r.overlaps.length) console.log("  TEXT OVERLAPS:\n   " + [...new Set(r.overlaps)].slice(0, 6).join("\n   "));
      }
    }
    await ctx.close();
  }
  await browser.close();
  console.log("\naudit v2 done");
})();
