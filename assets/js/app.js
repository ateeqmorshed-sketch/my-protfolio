/* Ateeq Morshed — portfolio interactions */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- nav: scrolled state + scroll progress ---------- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("progress");

  const toTop = document.getElementById("toTop");

  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
    toTop.classList.toggle("show", window.scrollY > window.innerHeight);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  links.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- active nav link ---------- */
  const sections = [...document.querySelectorAll("section[id]")];
  const navAnchors = [...links.querySelectorAll("a")];
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

  /* ---------- tilt on project mockups ---------- */
  if (!reduceMotion && matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt]").forEach((wrap) => {
      const mock = wrap.querySelector(".mock");
      if (!mock) return;
      wrap.addEventListener("pointermove", (e) => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        mock.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
      });
      wrap.addEventListener("pointerleave", () => {
        mock.style.transform = "";
      });
    });

    /* ---------- magnetic buttons ---------- */
    document.querySelectorAll("[data-magnetic]").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.18}px, ${y * 0.22}px)`;
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.transform = "";
      });
    });
  }

  /* ---------- back to top ---------- */
  document.getElementById("toTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- cursor spotlight ---------- */
  const spotlight = document.getElementById("spotlight");
  if (spotlight && !reduceMotion && matchMedia("(pointer: fine)").matches) {
    window.addEventListener(
      "pointermove",
      (e) => {
        spotlight.style.setProperty("--mx", `${e.clientX}px`);
        spotlight.style.setProperty("--my", `${e.clientY}px`);
      },
      { passive: true }
    );
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
  document.getElementById("copyEmail").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("ateeqmorshed@gmail.com");
      showToast("Email copied — talk soon.");
    } catch {
      showToast("ateeqmorshed@gmail.com");
    }
  });

  /* ---------- live demo scenes ---------- */
  if (!reduceMotion) {
    const scenes = {
      book(mock, step) {
        const submit = mock.querySelector("[data-demo-submit]");
        const s = step % 6;
        mock.classList.toggle("s1", s >= 1);
        mock.classList.toggle("s2", s >= 2);
        mock.classList.toggle("s3", s >= 3);
        submit.classList.toggle("booked", s === 4);
        submit.textContent = s === 4 ? "Booked ✓" : "Confirm booking";
      },
      quiz(mock, step) {
        const ring = mock.querySelector(".la-ring");
        const pct = mock.querySelector("[data-demo-pct]");
        const qnum = mock.querySelector("[data-demo-qnum]");
        const opts = mock.querySelectorAll(".la-opt");
        const q = 12 + (step % 4);
        const p = 78 + (step % 4) * 2;
        qnum.textContent = `Question ${q} / 30`;
        ring.style.setProperty("--p", p);
        pct.textContent = `${p}%`;
        opts.forEach((o, i) => o.classList.toggle("ok", i === step % 3));
      },
      ons(mock, step) {
        const cards = mock.querySelectorAll(".ons-card");
        const sizes = ["Decant · 10ml", "Decant · 30ml", "Full bottle"];
        const wa = mock.querySelector("[data-demo-wa]");
        cards.forEach((c, i) => c.classList.toggle("active", i === step % 3));
        const active = mock.querySelector("[data-demo-size]");
        if (active) cards[step % 3].querySelector("[data-demo-size]").textContent = sizes[step % 3];
        wa.classList.toggle("sent", step % 6 === 5);
        wa.textContent = step % 6 === 5 ? "Opening WhatsApp…" : "Order on WhatsApp";
      },
      doctor(mock, step) {
        const rota = [
          ["“chest pain” →", "Dr. Rahman", "Cardiology · Feni", "Chamber · 5–9 PM"],
          ["“skin rash” →", "Dr. Sultana", "Dermatology · Feni", "Chamber · 4–8 PM"],
          ["“fever, cough” →", "Dr. Karim", "Medicine · Feni", "Open now · until 10 PM"],
        ];
        const [sym, doc, spec, time] = rota[step % 3];
        mock.querySelector("[data-demo-symptom]").textContent = `AI: ${sym}`;
        mock.querySelector("[data-demo-doc]").textContent = doc;
        mock.querySelector("[data-demo-spec]").textContent = spec;
        mock.querySelector("[data-demo-time]").textContent = time;
        const days = mock.querySelectorAll(".dr-days b");
        days.forEach((d, i) => d.classList.toggle("on", i === 2 + (step % 3)));
      },
      green(mock, step) {
        mock.querySelector("[data-demo-orders]").textContent = 18 + (step % 4);
        mock.querySelector("[data-demo-prod]").textContent = (2400 + (step % 4) * 150).toLocaleString("en-CA");
        mock.querySelector("[data-demo-del]").textContent = 7 + (step % 3);
        const p3 = mock.querySelector("[data-demo-pill3]");
        const states = [
          ["New · COD", ""],
          ["Producing", ""],
          ["Delivered", "ok"],
        ];
        const [label, cls] = states[step % 3];
        p3.textContent = label;
        p3.className = `gw-pill ${cls || (step % 3 === 0 ? "new" : "")}`.trim();
      },
    };

    document.querySelectorAll("[data-demo]").forEach((mock) => {
      const scene = scenes[mock.dataset.demo];
      if (!scene) return;
      let step = 0;
      let timer = null;
      const tick = () => {
        scene(mock, step);
        step += 1;
      };
      new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !timer) {
            tick();
            timer = setInterval(tick, 1700);
          } else if (!entry.isIntersecting && timer) {
            clearInterval(timer);
            timer = null;
          }
        },
        { threshold: 0.35 }
      ).observe(mock);
    });
  }

  /* ---------- hero starfield ---------- */
  const canvas = document.getElementById("stars");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let stars = [];
    let w, h, raf;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.min(Math.floor((w * h) / 11000), 140);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.3,
        s: Math.random() * 0.25 + 0.05,
        p: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const st of stars) {
        st.y -= st.s;
        if (st.y < -2) { st.y = h + 2; st.x = Math.random() * w; }
        const twinkle = 0.45 + 0.55 * Math.sin(t / 900 + st.p);
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 169, 74, ${0.32 * twinkle})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(draw);

    /* pause when hero is off-screen */
    new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(draw);
        } else {
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 }
    ).observe(canvas);
  }
})();
