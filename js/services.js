(() => {
  const items = Stackly.$$(".accordion-item");
  if (!items.length) return;

  const toggleItem = (item) => {
    const open = item.getAttribute("data-open") === "true";
    const body = item.querySelector(".accordion-body");
    if (!body) return;
    if (open) {
      body.style.maxHeight = "0px";
      item.setAttribute("data-open", "false");
    } else {
      body.style.maxHeight = body.scrollHeight + "px";
      item.setAttribute("data-open", "true");
    }
  };

  items.forEach((item, index) => {
    const header = item.querySelector(".accordion-header");
    const body = item.querySelector(".accordion-body");
    if (!header || !body) return;

    header.addEventListener("click", () => toggleItem(item));

    if (index === 0) {
      item.setAttribute("data-open", "true");
      body.style.maxHeight = body.scrollHeight + "px";
    }
  });
})();

