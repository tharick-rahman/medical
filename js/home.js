(() => {
  const counters = Stackly.$$(".stat .num[data-count]");
  if (!counters.length) return;

  const animate = (el) => {
    const target = Number(el.getAttribute("data-count") || "0");
    const suffix = el.getAttribute("data-suffix") || "";
    const dur = 900;
    const start = performance.now();

    const step = (t) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent = `${val}${suffix}`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          animate(e.target);
          io.unobserve(e.target);
        }
      }
    },
    { threshold: 0.5 }
  );

  counters.forEach((c) => io.observe(c));
})();

// ===== PREMIUM LOADER CONTROL =====

window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").classList.add("loader-hidden");
  }, 1500); // 1.5 seconds
});


const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
  item.querySelector(".faq-question").addEventListener("click", () => {

    // Close others (optional)
    faqItems.forEach(el => {
      if(el !== item){
        el.classList.remove("active");
      }
    });

    item.classList.toggle("active");
  });
});


// Animated Counter Function
function animateCounter(id, end, duration) {
  let element = document.getElementById(id);
  let start = 0;
  let increment = end / (duration / 16);

  function update() {
    start += increment;
    if (start < end) {
      element.textContent = Math.floor(start).toLocaleString();
      requestAnimationFrame(update);
    } else {
      element.textContent = end.toLocaleString();
    }
  }
  update();
}

// Trigger when visible
window.addEventListener("load", () => {

  animateCounter("devices", 1482, 2000);
  animateCounter("hospitals", 128, 2000);
  animateCounter("datapoints", 2400000, 2000);

  document.getElementById("uptime").textContent = "99.98%";

  // Animate progress bars
  document.querySelectorAll(".progress-fill").forEach(bar => {
    setTimeout(() => {
      bar.style.width = bar.dataset.width;
    }, 800);
  });

});