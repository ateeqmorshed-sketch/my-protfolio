/* Ateeq Morshed — portfolio interactions (v2 gallery) */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- scroll progress + back-to-top + topbar shadow ---------- */
  const progress = document.getElementById("progress");
  const toTop = document.getElementById("toTop");
  const topbar = document.getElementById("topbar");

  const onScroll = () => {
    toTop.classList.toggle("show", window.scrollY > window.innerHeight);
    topbar.classList.toggle("scrolled", window.scrollY > 10);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const burger = document.getElementById("burger");
  const navEl = document.getElementById("navLinks");
  burger.addEventListener("click", () => {
    const open = navEl.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  navEl.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      navEl.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    }
  });

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- active rail link ---------- */
  const links = document.getElementById("navLinks");
  const navAnchors = [...links.querySelectorAll("a")];
  const sections = [...document.querySelectorAll("section[id]")];
  const setActive = () => {
    let current = "";
    for (const s of sections) {
      if (window.scrollY >= s.offsetTop - window.innerHeight * 0.4) current = s.id;
    }
    navAnchors.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${current}`)
    );
  };
  window.addEventListener("scroll", setActive, { passive: true });
  setActive();

  /* ---------- reveal on scroll ---------- */
  const revealer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          revealer.unobserve(e.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealer.observe(el));

  /* ---------- animated counters ---------- */
  const counter = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        counter.unobserve(e.target);
        const el = e.target;
        const target = Number(el.dataset.count);
        if (reduceMotion) { el.textContent = target; continue; }
        const t0 = performance.now();
        const dur = 1300;
        const tick = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => counter.observe(el));

  /* ---------- tilt + magnetic (fine pointers only) ---------- */
  if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((wrap) => {
      const mock = wrap.querySelector(".mock");
      if (!mock) return;
      wrap.addEventListener("pointermove", (e) => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        mock.style.transform = `rotateY(${x * 9}deg) rotateX(${-y * 9}deg) translateZ(6px)`;
      });
      wrap.addEventListener("pointerleave", () => {
        mock.style.transform = "";
      });
    });

    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.14}px, ${y * 0.18}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- copy email + toast ---------- */
  const toast = document.getElementById("toast");
  let toastTimer;
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  };
  const copyBtn = document.getElementById("copyEmail");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText("ateeqmorshed@gmail.com");
        showToast("Email copied — talk soon.");
      } catch {
        showToast("ateeqmorshed@gmail.com");
      }
    });
  }

  /* ---------- feature showcase players ---------- */
  document.querySelectorAll("[data-player]").forEach((player) => {
    const scenes = [...player.querySelectorAll(".scene")];
    const chips = [...player.querySelectorAll(".pchip")];
    if (!scenes.length || scenes.length !== chips.length) return;
    let idx = 0;
    let timer = null;

    const go = (i) => {
      idx = ((i % scenes.length) + scenes.length) % scenes.length;
      scenes.forEach((s, j) => s.classList.toggle("active", j === idx));
      chips.forEach((c, j) => {
        c.classList.toggle("on", j === idx);
        c.setAttribute("aria-selected", String(j === idx));
        const bar = c.querySelector("i");
        bar.style.animation = "none";
        void bar.offsetWidth; // restart the progress bar
        if (j === idx && !reduceMotion) bar.style.animation = "chipbar 5.2s linear forwards";
      });
    };

    const restart = () => {
      clearInterval(timer);
      timer = reduceMotion ? null : setInterval(() => go(idx + 1), 5200);
    };

    chips.forEach((c, j) =>
      c.addEventListener("click", () => {
        go(j);
        restart();
      })
    );

    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          go(idx);
          restart();
        } else {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.25 }
    ).observe(player);

    go(0);
  });
})();
