const artistsGrid = document.querySelector("#artists-grid");
const worksGrid = document.querySelector("#works-grid");
const artistApplyButtons = document.querySelectorAll("[data-artist-apply]");
const visitorApplyButtons = document.querySelectorAll("[data-visitor-apply]");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const pageShell = document.querySelector("#page-shell");

function getInitials(text) {
  return text
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function createArtistCard(artist, index) {
  const card = document.createElement("article");
  card.className = "artist-card reveal tilt-card";
  card.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
  card.innerHTML = `
    <div class="artist-card__visual">
      <span>${getInitials(artist.name)}</span>
      <span class="artist-card__tag">${artist.tag}</span>
    </div>
    <div class="artist-card__body">
      <h3>${artist.name}</h3>
      <p>${artist.description}</p>
      <ul class="artist-card__keywords">
        ${artist.keywords.map((keyword) => `<li>${keyword}</li>`).join("")}
      </ul>
    </div>
  `;
  return card;
}

function createWorkCard(work, index) {
  const card = document.createElement("article");
  card.className = "work-card reveal tilt-card";
  card.style.transitionDelay = `${Math.min(index * 70, 280)}ms`;
  card.innerHTML = `
    <div class="work-card__visual">
      <span>${work.title}</span>
      <span class="work-card__tag">${work.tag}</span>
    </div>
    <div class="work-card__body">
      <h3>${work.title}</h3>
      <p>${work.description}</p>
      <div class="work-card__meta">
        <span>${work.artist}</span>
        <span>${work.medium}</span>
      </div>
    </div>
  `;
  return card;
}

function renderArtists() {
  if (!artistsGrid || !window.exhibitionData) {
    return;
  }

  const fragment = document.createDocumentFragment();
  exhibitionData.artists.forEach((artist, index) => {
    fragment.appendChild(createArtistCard(artist, index));
  });
  artistsGrid.appendChild(fragment);
}

function renderWorks() {
  if (!worksGrid || !window.exhibitionData) {
    return;
  }

  const fragment = document.createDocumentFragment();
  exhibitionData.works.forEach((work, index) => {
    fragment.appendChild(createWorkCard(work, index));
  });
  worksGrid.appendChild(fragment);
}

function bindExternalLinks() {
  if (!window.exhibitionData) {
    return;
  }

  artistApplyButtons.forEach((button) => {
    button.setAttribute("href", exhibitionData.artistApplyLink);
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noreferrer noopener");
  });

  visitorApplyButtons.forEach((button) => {
    button.setAttribute("href", exhibitionData.visitorApplyLink);
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noreferrer noopener");
  });
}

function setupRevealObserver() {
  const revealItems = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -40px 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setupMobileMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupTiltEffects() {
  const tiltItems = document.querySelectorAll(".tilt-card");
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

  if (isCoarsePointer) {
    return;
  }

  tiltItems.forEach((item) => {
    item.addEventListener("mousemove", (event) => {
      const rect = item.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateY = ((x / rect.width) - 0.5) * 10;
      const rotateX = (0.5 - (y / rect.height)) * 10;

      item.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      item.style.setProperty("--pointer-x", `${(x / rect.width) * 100}%`);
      item.style.setProperty("--pointer-y", `${(y / rect.height) * 100}%`);
    });

    item.addEventListener("mouseleave", () => {
      item.style.transform = "";
      item.style.removeProperty("--pointer-x");
      item.style.removeProperty("--pointer-y");
    });
  });
}

function setupPageSpotlight() {
  if (!pageShell || window.matchMedia("(pointer: coarse)").matches) {
    return;
  }

  window.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    pageShell.style.setProperty("--spotlight-x", `${x}%`);
    pageShell.style.setProperty("--spotlight-y", `${y}%`);
  });
}

renderArtists();
renderWorks();
bindExternalLinks();
setupMobileMenu();
setupRevealObserver();
setupTiltEffects();
setupPageSpotlight();
