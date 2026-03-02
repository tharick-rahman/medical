const Stackly = (() => {
  const KEY_USERS = "stackly_users";
  const KEY_SESSION = "stackly_session";
  const KEY_MESSAGES = "stackly_messages";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const safeJsonParse = (val, fallback) => {
    try {
      const parsed = JSON.parse(val);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  };

  const store = {
    get(key, fallback) {
      return safeJsonParse(localStorage.getItem(key), fallback);
    },
    set(key, value) {
      localStorage.setItem(key, JSON.stringify(value));
    },
    del(key) {
      localStorage.removeItem(key);
    },
  };

  const toast = (() => {
    let el = null;
    let timer = null;

    const ensure = () => {
      if (el) return el;
      el = document.createElement("div");
      el.className = "toast";
      el.setAttribute("role", "status");
      el.setAttribute("aria-live", "polite");
      el.innerHTML = `<strong></strong><div class="muted"></div>`;
      document.body.appendChild(el);
      return el;
    };

    const show = (title, message, ms = 2800) => {
      const t = ensure();
      $("strong", t).textContent = title;
      $(".muted", t).textContent = message;
      t.dataset.open = "true";
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        t.dataset.open = "false";
        window.setTimeout(() => t.removeAttribute("data-open"), 180);
      }, ms);
    };

    return { show };
  })();

  const revealOnScroll = () => {
    const targets = $$(".reveal");
    if (!targets.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.14 }
    );
    targets.forEach((t) => io.observe(t));
  };

  const setActiveNav = () => {
    const here = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const links = $$('a[data-navlink="true"]');
    links.forEach((a) => {
      const href = (a.getAttribute("href") || "").toLowerCase();
      if (href === here) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
  };

  const initNav = () => {
    const toggle = $("#navToggle");
    const menu = $("#menu");
    const drop = $("#homeDropdown");
    const dropBtn = $("#homeDropdownBtn");

    const closeAll = () => {
      if (menu) menu.dataset.open = "false";
      if (drop) drop.dataset.open = "false";
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      if (dropBtn) dropBtn.setAttribute("aria-expanded", "false");
    };

    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.dataset.open === "true";
        menu.dataset.open = open ? "false" : "true";
        toggle.setAttribute("aria-expanded", open ? "false" : "true");
        if (open) closeAll();
        if (!open && drop) drop.dataset.open = "false";
      });
    }

    // clicking the toggle button reveals the alternate home panel; the main Home link navigates normally
    if (drop && dropBtn) {
      dropBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const open = drop.dataset.open === "true";
        drop.dataset.open = open ? "false" : "true";
        dropBtn.setAttribute("aria-expanded", open ? "false" : "true");
      });
    }

    document.addEventListener("click", (e) => {
      const target = e.target;
      const insideMenu = menu?.contains(target);
      const insideToggle = toggle?.contains(target);
      const insideDrop = drop?.contains(target);
      if (!insideMenu && !insideToggle && !insideDrop) closeAll();
    });

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeAll();
    });
  };

  const auth = {
    users() {
      return store.get(KEY_USERS, []);
    },
    session() {
      return store.get(KEY_SESSION, null);
    },
    isLoggedIn() {
      return !!auth.session();
    },
    signup({ name, email, password }) {
      const users = auth.users();
      const exists = users.some((u) => u.email.toLowerCase() === email.toLowerCase());
      if (exists) return { ok: false, message: "Email already exists." };
      const user = {
        id: crypto?.randomUUID ? crypto.randomUUID() : String(Date.now()),
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      store.set(KEY_USERS, users);
      store.set(KEY_SESSION, { userId: user.id, createdAt: new Date().toISOString() });
      return { ok: true, user };
    },
    login({ email, password }) {
      const users = auth.users();
      const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (!user || user.password !== password) return { ok: false, message: "Invalid email or password." };
      store.set(KEY_SESSION, { userId: user.id, createdAt: new Date().toISOString() });
      return { ok: true, user };
    },
    logout() {
      store.del(KEY_SESSION);
    },
    currentUser() {
      const s = auth.session();
      if (!s) return null;
      return auth.users().find((u) => u.id === s.userId) ?? null;
    },
  };

  const messages = {
    all() {
      return store.get(KEY_MESSAGES, []);
    },
    add(msg) {
      const all = messages.all();
      all.unshift({ ...msg, id: String(Date.now()), createdAt: new Date().toISOString() });
      store.set(KEY_MESSAGES, all);
    },
  };

  const initFooterYear = () => {
    const y = $("#year");
    if (y) y.textContent = String(new Date().getFullYear());
  };

  const protectPage = (options) => {
    const { requireAuth, redirectTo = "login.html" } = options || {};
    if (!requireAuth) return true;
    if (auth.isLoggedIn()) return true;
    location.href = redirectTo;
    return false;
  };

  const init = () => {
    initNav();
    setActiveNav();
    revealOnScroll();
    initFooterYear();
  };

  return { $, $$, toast, auth, messages, protectPage, init };
})();

document.addEventListener("DOMContentLoaded", () => {
  Stackly.init();
});
