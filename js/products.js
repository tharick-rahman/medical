(() => {
  const searchInput = Stackly.$("#productSearch");
  const pills = Stackly.$$("#productCategories .category-pill");
  const cards = Stackly.$$("#productGrid .product-card");
  const zero = Stackly.$("#productZero");
  if (!searchInput || !pills.length || !cards.length || !zero) return;

  let activeCategory = "all";

  const applyFilter = () => {
    const term = searchInput.value.trim().toLowerCase();
    let visible = 0;

    cards.forEach((card) => {
      const name = card.getAttribute("data-name") || "";
      const category = card.getAttribute("data-category") || "other";
      const text = card.textContent.toLowerCase();

      const matchesCategory = activeCategory === "all" || category === activeCategory;
      const matchesText = !term || name.toLowerCase().includes(term) || text.includes(term);

      const show = matchesCategory && matchesText;
      card.style.display = show ? "" : "none";
      if (show) visible += 1;
    });

    zero.style.display = visible === 0 ? "block" : "none";
  };

  searchInput.addEventListener("input", applyFilter);

  pills.forEach((pill) => {
    pill.addEventListener("click", () => {
      activeCategory = pill.getAttribute("data-category") || "all";
      pills.forEach((p) => p.setAttribute("data-active", p === pill ? "true" : "false"));
      applyFilter();
    });
  });

  applyFilter();
})();

