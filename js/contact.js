(() => {
  const form = Stackly.$("#contactForm");
  if (!form) return;

  const setError = (fieldId, msg) => {
    const field = Stackly.$(`#${fieldId}Field`);
    if (!field) return;
    const error = field.querySelector(".error");
    field.dataset.error = msg ? "true" : "false";
    if (error) error.textContent = msg || "";
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = Stackly.$("#contactName").value.trim();
    const email = Stackly.$("#contactEmail").value.trim();
    const org = Stackly.$("#contactOrg").value.trim();
    const message = Stackly.$("#contactMessage").value.trim();

    let ok = true;
    if (!name) {
      setError("contactName", "Please enter your name.");
      ok = false;
    } else setError("contactName", "");

    if (!email || !email.includes("@")) {
      setError("contactEmail", "Please enter a valid email.");
      ok = false;
    } else setError("contactEmail", "");

    if (!message || message.length < 12) {
      setError("contactMessage", "Share a few more details so we can help.");
      ok = false;
    } else setError("contactMessage", "");

    if (!ok) return;

    Stackly.messages.add({ name, email, org, message });
    Stackly.toast.show("Message sent", "We’ve received your message and will get back to you.");
    form.reset();
  });
})();

