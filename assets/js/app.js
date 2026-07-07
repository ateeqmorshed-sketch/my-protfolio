/* Ateeq Morshed — portfolio interactions (v2 gallery) */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- footer year ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- scroll progress + back-to-top ---------- */
  const progress = document.getElementById("progress");
  const toTop = document.getElementById("toTop");

  const onScroll = () => {
    toTop.classList.toggle("show", window.scrollY > window.innerHeight);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = max > 0 ? `${(window.scrollY / max) * 100}%` : "0";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

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
        cards[step % 3].querySelector("[data-demo-size]").textContent = sizes[step % 3];
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
          ["New · COD", "new"],
          ["Producing", ""],
          ["Delivered", "ok"],
        ];
        const [label, cls] = states[step % 3];
        p3.textContent = label;
        p3.className = `gw-pill ${cls}`.trim();
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
})();
