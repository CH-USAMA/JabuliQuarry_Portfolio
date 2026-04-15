(() => {
  const data = window.GALLERY_DATA;

  if (!data || !Array.isArray(data.categories)) {
    return;
  }

  const batchSize = 18;
  const tabsHost = document.querySelector("[data-gallery-tabs]");
  const grid = document.querySelector("[data-gallery-grid]");
  const gridWrap = document.querySelector("[data-gallery-grid-wrap]");
  const emptyState = document.querySelector("[data-gallery-empty]");
  const sentinel = document.querySelector("[data-gallery-sentinel]");
  const countSummary = document.querySelector("[data-gallery-count-summary]");
  const categoryCount = document.querySelector("[data-gallery-category-count]");
  const visibleCount = document.querySelector("[data-gallery-visible-count]");
  const activeName = document.querySelector("[data-gallery-active-name]");
  const lightbox = document.querySelector("[data-gallery-lightbox]");
  const lightboxImage = document.querySelector("[data-lightbox-image]");
  const lightboxTitle = document.querySelector("[data-lightbox-title]");
  const lightboxCategory = document.querySelector("[data-lightbox-category]");
  const lightboxClose = document.querySelector("[data-lightbox-close]");

  let activeIndex = 0;
  let renderedCount = 0;

  const formatLabel = (label) =>
    label
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const skeletonMarkup = Array.from({ length: 10 }, () => `
    <article class="gallery-card gallery-card--skeleton">
      <div class="gallery-skeleton">
        <div class="gallery-skeleton__media"></div>
      </div>
    </article>
  `).join("");

  const getActiveCategory = () => data.categories[activeIndex] || data.categories[0];

  const updateStats = () => {
    const category = getActiveCategory();
    categoryCount.textContent = String(data.categories.length);
    visibleCount.textContent = String(Math.min(renderedCount, category.images.length));
    activeName.textContent = formatLabel(category.label);
    countSummary.textContent = `${category.images.length} image${category.images.length === 1 ? "" : "s"} in ${formatLabel(category.label)}`;
  };

  const setActiveTab = () => {
    tabsHost.querySelectorAll("[data-gallery-tab]").forEach((button, index) => {
      button.classList.toggle("is-active", index === activeIndex);
      button.setAttribute("aria-selected", String(index === activeIndex));
    });
  };

  const renderTabs = () => {
    tabsHost.innerHTML = data.categories.map((category, index) => `
      <button
        class="gallery-tab ${index === activeIndex ? "is-active" : ""}"
        type="button"
        role="tab"
        data-gallery-tab
        data-index="${index}"
        aria-selected="${index === activeIndex ? "true" : "false"}"
      >
        <span>${formatLabel(category.label)}</span>
        <span class="gallery-tab__count">${category.imageCount}</span>
      </button>
    `).join("");

    tabsHost.querySelectorAll("[data-gallery-tab]").forEach((button) => {
      button.addEventListener("click", () => switchCategory(Number(button.dataset.index)));
    });
  };

  const renderBatch = (reset = false) => {
    const category = getActiveCategory();

    if (reset) {
      grid.innerHTML = "";
      renderedCount = 0;
    }

    const slice = category.images.slice(renderedCount, renderedCount + batchSize);

    if (!slice.length) {
      updateStats();
      emptyState.classList.toggle("hidden", category.images.length > 0);
      return;
    }

    const markup = slice.map((image, index) => `
      <article class="gallery-card">
        <button
          class="gallery-panel gallery-image-card"
          type="button"
          data-gallery-image
          data-image-index="${renderedCount + index}"
        >
          <div class="gallery-image-card__media">
            <img
              class="gallery-image-card__image"
              src="${image.src}"
              alt="${image.alt || formatLabel(category.label)}"
              loading="lazy"
              decoding="async"
            >
          </div>
          <div class="gallery-image-card__overlay">
            <p class="gallery-image-card__label">${formatLabel(category.label)}</p>
            <h3 class="gallery-image-card__title">${image.alt || image.name}</h3>
          </div>
        </button>
      </article>
    `).join("");

    grid.insertAdjacentHTML("beforeend", markup);
    renderedCount += slice.length;

    grid.querySelectorAll("[data-gallery-image]").forEach((button) => {
      if (button.dataset.bound === "true") return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => openLightbox(Number(button.dataset.imageIndex)));
    });

    emptyState.classList.toggle("hidden", category.images.length > 0);
    updateStats();
  };

  const showSkeletons = () => {
    grid.innerHTML = skeletonMarkup;
    emptyState.classList.add("hidden");
    gridWrap.classList.add("is-fading");
  };

  const switchCategory = (nextIndex) => {
    if (Number.isNaN(nextIndex) || nextIndex === activeIndex) return;
    activeIndex = nextIndex;
    setActiveTab();
    showSkeletons();

    window.setTimeout(() => {
      renderBatch(true);
      requestAnimationFrame(() => {
        gridWrap.classList.remove("is-fading");
      });
    }, 220);
  };

  const openLightbox = (imageIndex) => {
    const category = getActiveCategory();
    const image = category.images[imageIndex];
    if (!image) return;

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt || formatLabel(category.label);
    lightboxTitle.textContent = image.alt || image.name;
    lightboxCategory.textContent = formatLabel(category.label);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    lightboxImage.src = "";
    document.body.style.overflow = "";
  };

  const observer = new IntersectionObserver((entries) => {
    const category = getActiveCategory();
    const hasMore = renderedCount < category.images.length;
    if (entries.some((entry) => entry.isIntersecting) && hasMore) {
      renderBatch(false);
    }
  }, { rootMargin: "900px 0px 900px 0px" });

  renderTabs();
  setActiveTab();
  showSkeletons();

  window.setTimeout(() => {
    renderBatch(true);
    requestAnimationFrame(() => {
      gridWrap.classList.remove("is-fading");
    });
  }, 180);

  if (sentinel) {
    observer.observe(sentinel);
  }

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !lightbox.hidden) {
      closeLightbox();
    }
  });
})();
