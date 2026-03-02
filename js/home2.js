(() => {
  const q = Stackly.$("#quoteText");
  const whoName = Stackly.$("#quoteName");
  const whoRole = Stackly.$("#quoteRole");
  const whoImg = Stackly.$("#quoteImg");
  const prev = Stackly.$("#quotePrev");
  const next = Stackly.$("#quoteNext");
  if (!q || !whoName || !whoRole || !whoImg || !prev || !next) return;

  const data = [
    {
      text:
        "We reduced device onboarding time for new staff. The interface is clean, calibration is straightforward, and support is fast.",
      name: "Dr. A. Mehta",
      role: "Clinical Director, Multi-specialty Hospital",
      image: "assets/images/person1.jfif",
    },
    {
      text:
        "Stackly helped us standardize workflows across departments—installation, training, and maintenance planning were all handled smoothly.",
      name: "S. Nair",
      role: "Biomedical Engineer, Regional Clinic Network",
      image: "assets/images/person1.jfif",
    },
    {
      text:
        "The documentation and service plan made procurement easy. We had clear compliance-ready specs and consistent performance during audits.",
      name: "M. Rahman",
      role: "Procurement Lead, Diagnostics Lab",
      image: "assets/person1.jfif",
    },
  ];

  let idx = 0;
  const render = () => {
    const item = data[idx];
    q.textContent = item.text;
    whoName.textContent = item.name;
    whoRole.textContent = item.role;
   
  };

  prev.addEventListener("click", () => {
    idx = (idx - 1 + data.length) % data.length;
    render();
  });
  next.addEventListener("click", () => {
    idx = (idx + 1) % data.length;
    render();
  });

  render();
})();

// ===== PREMIUM LOADER CONTROL =====

window.addEventListener("load", function () {
  setTimeout(function () {
    document.getElementById("loader").classList.add("loader-hidden");
  }, 1500); // 1.5 seconds
});