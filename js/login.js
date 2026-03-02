(() => {
  const form = Stackly.$("#loginForm");
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
    const email = Stackly.$("#loginEmail").value.trim();
    const password = Stackly.$("#loginPassword").value.trim();

    let ok = true;
    if (!email) {
      setError("loginEmail", "Please enter your email.");
      ok = false;
    } else setError("loginEmail", "");

    if (!password) {
      setError("loginPassword", "Please enter your password.");
      ok = false;
    } else setError("loginPassword", "");

    if (!ok) return;

    const result = Stackly.auth.login({ email, password });
    if (!result.ok) {
      setError("loginPassword", result.message || "Could not log in.");
      return;
    }

    Stackly.toast.show("Login successful", "Welcome back to your Stackly dashboard.");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 600);
  });
})();

