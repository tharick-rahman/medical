(() => {
  const form = Stackly.$("#signupForm");
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
    const name = Stackly.$("#signupName").value.trim();
    const email = Stackly.$("#signupEmail").value.trim();
    const password = Stackly.$("#signupPassword").value.trim();
    const confirm = Stackly.$("#signupConfirm").value.trim();

    let ok = true;
    if (!name) {
      setError("signupName", "Please enter your name.");
      ok = false;
    } else setError("signupName", "");

    if (!email || !email.includes("@")) {
      setError("signupEmail", "Please enter a valid email.");
      ok = false;
    } else setError("signupEmail", "");

    if (!password || password.length < 6) {
      setError("signupPassword", "Password should be at least 6 characters.");
      ok = false;
    } else setError("signupPassword", "");

    if (!confirm || confirm !== password) {
      setError("signupConfirm", "Passwords do not match.");
      ok = false;
    } else setError("signupConfirm", "");

    if (!ok) return;

    const result = Stackly.auth.signup({ name, email, password });
    if (!result.ok) {
      setError("signupEmail", result.message || "Could not create account.");
      return;
    }

    Stackly.toast.show("Account created", "You’re signed in and can open the dashboard.");
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);
  });
})();

