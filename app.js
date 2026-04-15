// ---------------------------
// Navigation: active link + mobile toggle
// ---------------------------
(function navInit(){
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path) a.classList.add("nav-active");
  });

  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("open");
      btn.setAttribute("aria-expanded", menu.classList.contains("open") ? "true" : "false");
    });
  }
})();

// ---------------------------
// Reveal on scroll
// ---------------------------
(function revealInit(){
  const reveals = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("show"); });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));
})();

// ---------------------------
// Particles (premium but light)
// ---------------------------
(function particlesInit(){
  const c = document.getElementById("particles");
  if (!c) return;
  const ctx = c.getContext("2d");
  let w, h, particles = [];

  function resize(){
    w = c.width = window.innerWidth;
    h = c.height = window.innerHeight;
    const count = Math.min(95, Math.floor(w / 18));
    particles = Array.from({length: count}, () => ({
      x: Math.random()*w,
      y: Math.random()*h,
      r: 1 + Math.random()*2.2,
      vx: (-0.3 + Math.random()*0.6),
      vy: (-0.25 + Math.random()*0.5),
      a: 0.10 + Math.random()*0.30
    }));
  }
  window.addEventListener("resize", resize);
  resize();

  function tick(){
    ctx.clearRect(0,0,w,h);
    for(const p of particles){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -20) p.x = w+20;
      if(p.x > w+20) p.x = -20;
      if(p.y < -20) p.y = h+20;
      if(p.y > h+20) p.y = -20;

      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `rgba(139,92,246,${p.a})`;
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
})();

// ---------------------------
// Metrics: safe placeholders (edit here later)
// ---------------------------
(function metricsInit(){
  const metrics = {
    clients: { value: "20+", label: "Clients served" },
    success: { value: "95%", label: "Success rate" },
    response: { value: "< 2h", label: "Avg response time target" },
    uptime:  { value: "99.9%", label: "Uptime goal (Hostec)" }
  };

  const set = (id, text) => { const el = document.getElementById(id); if (el) el.textContent = text; };
  set("metric_clients", metrics.clients.value);
  set("metric_clients_label", metrics.clients.label);
  set("metric_success", metrics.success.value);
  set("metric_success_label", metrics.success.label);
  set("metric_response", metrics.response.value);
  set("metric_response_label", metrics.response.label);
  set("metric_uptime", metrics.uptime.value);
  set("metric_uptime_label", metrics.uptime.label);
})();
