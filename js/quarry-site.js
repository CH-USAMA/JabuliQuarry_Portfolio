(() => {
  const body = document.body;
  const header = document.querySelector("[data-site-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const themeIcon = themeToggle?.querySelector("i");
  const contactForm = document.querySelector("[data-contact-form]");
  const contactStatus = document.querySelector("[data-contact-status]");

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // Ignore storage failures in privacy-restricted browsers.
      }
    }
  };

  const applyTheme = (theme) => {
    body.setAttribute("data-theme", theme);
    storage.set("jq-theme", theme);
    if (themeIcon) {
      themeIcon.className = theme === "dark" ? "fa-solid fa-sun" : "fa-solid fa-moon";
    }
  };

  const storedTheme = storage.get("jq-theme");
  const preferredDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(storedTheme || (preferredDark ? "dark" : "light"));

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
  });

  menuToggle?.addEventListener("click", () => {
    body.classList.toggle("nav-open");
    const expanded = body.classList.contains("nav-open");
    menuToggle.setAttribute("aria-expanded", String(expanded));
    menuToggle.setAttribute("aria-label", expanded ? "Close navigation" : "Open navigation");
  });

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    link.addEventListener("click", () => body.classList.remove("nav-open"));
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && body.classList.contains("nav-open")) {
      body.classList.remove("nav-open");
      menuToggle?.setAttribute("aria-expanded", "false");
      menuToggle?.setAttribute("aria-label", "Open navigation");
    }
  });

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  const communitySlider = document.querySelector("[data-community-slider]");
  if (communitySlider) {
    const track = communitySlider.querySelector(".community-slider__track");
    const slides = Array.from(communitySlider.querySelectorAll(".community-slide"));
    const prev = communitySlider.querySelector(".community-slider__nav--prev");
    const next = communitySlider.querySelector(".community-slider__nav--next");
    let index = 0;

    const updateCommunitySlider = () => {
      const mobile = window.innerWidth <= 720;
      const tablet = window.innerWidth <= 860;
      const basis = mobile ? 100 : tablet ? 50 : 33.333;
      const offset = mobile ? index : tablet ? Math.max(index - 0.5, 0) : Math.max(index - 1, 0);

      track.style.transform = `translateX(-${offset * basis}%)`;
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === index);
      });
    };

    prev?.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCommunitySlider();
    });

    next?.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateCommunitySlider();
    });

    window.addEventListener("resize", updateCommunitySlider);
    updateCommunitySlider();
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const formData = new FormData(contactForm);
      const firstName = (formData.get("fname") || "").toString().trim();
      const lastName = (formData.get("lname") || "").toString().trim();
      const phone = (formData.get("phone") || "").toString().trim();
      const email = (formData.get("email") || "").toString().trim();
      const message = (formData.get("message") || "").toString().trim();
      const fullName = [firstName, lastName].filter(Boolean).join(" ");
      const subject = encodeURIComponent(`Website enquiry from ${fullName || "a customer"}`);
      const bodyText = [
        `Name: ${fullName || "Not provided"}`,
        `Phone: ${phone || "Not provided"}`,
        `Email: ${email || "Not provided"}`,
        "",
        "Enquiry:",
        message
      ].join("\n");

      window.location.href = `mailto:jabulanigroup2002@gmail.com?subject=${subject}&body=${encodeURIComponent(bodyText)}`;

      if (contactStatus) {
        contactStatus.textContent = "Your email app should open now. If it does not, call or WhatsApp us using the details on this page.";
      }
    });
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
