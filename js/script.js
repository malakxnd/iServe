(() => {
  "use strict";

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav   = document.getElementById("mainNav");

  const closeNav = () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  /* ---------- Header shadow on scroll + progress bar ---------- */
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");

  const onScroll = () => {
    header?.classList.toggle("scrolled", window.scrollY > 8);

    const doc = document.documentElement;
    const max = doc.scrollHeight - doc.clientHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = pct + "%";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Active nav link on scroll (scrollspy) ---------- */
  const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = "#" + entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === id);
        });
      });
    },
    { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
  );
  sections.forEach((section) => spy.observe(section));

  /* ---------- Aurora canvas (CTA banner moving blue gradient) ---------- */
  const auroraCanvas = document.getElementById("auroraCanvas");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (auroraCanvas && !prefersReducedMotion) {
    const ctx = auroraCanvas.getContext("2d");
    const section = auroraCanvas.closest(".cta-banner");
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Blobs of different DARK blue shades sweeping across the banner, aurora-style
    const blobs = [
      { hue: "#050F1E", rx: 0.58, ry: 0.62, sx: 0.14, sy: 0.10, phase: 0.0  },
      { hue: "#0A2E52", rx: 0.52, ry: 0.56, sx: 0.11, sy: 0.15, phase: 1.4  },
      { hue: "#123C6B", rx: 0.44, ry: 0.5,  sx: 0.09, sy: 0.13, phase: 2.7  },
      { hue: "#1E5A96", rx: 0.36, ry: 0.42, sx: 0.13, sy: 0.08, phase: 4.1  },
      { hue: "#0D2F52", rx: 0.48, ry: 0.48, sx: 0.08, sy: 0.12, phase: 5.3  },
      { hue: "#2B4C7E", rx: 0.30, ry: 0.30, sx: 0.15, sy: 0.10, phase: 6.0  },
    ];

    const resize = () => {
      const rect = section.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      auroraCanvas.width = w * dpr;
      auroraCanvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let visible = true;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { visible = e.isIntersecting; });
    }, { threshold: 0 });
    io.observe(section);

    const draw = () => {
      t += 0.012;

      // Base flat deep navy so the shape always reads as a full, solid banner
      ctx.fillStyle = "#050F1E";
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "lighter";
      blobs.forEach((b) => {
        const cx = w * (0.5 + b.rx * Math.sin(t * b.sx + b.phase));
        const cy = h * (0.5 + b.ry * Math.cos(t * b.sy + b.phase * 1.3));
        const radius = Math.max(w, h) * 0.55;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, b.hue + "99");
        grad.addColorStop(0.5, b.hue + "33");
        grad.addColorStop(1, b.hue + "00");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });
      ctx.globalCompositeOperation = "source-over";

      // Even darkening pass so white text always keeps enough contrast,
      // regardless of which blob is passing behind it
      ctx.fillStyle = "rgba(2,8,16,0.35)";
      ctx.fillRect(0, 0, w, h);

      // Slightly deeper vignette at the edges for depth
      const vg = ctx.createRadialGradient(w/2, h*0.4, h*0.2, w/2, h*0.5, Math.max(w,h)*0.75);
      vg.addColorStop(0, "rgba(4,16,30,0)");
      vg.addColorStop(1, "rgba(4,16,30,0.3)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, w, h);

      if (visible) requestAnimationFrame(draw);
      else setTimeout(draw, 200);
    };
    requestAnimationFrame(draw);
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          reveal.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealEls.forEach((el) => reveal.observe(el));
})();
