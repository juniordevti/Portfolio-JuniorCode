export function menu() {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  const navLinks = document.querySelectorAll(".nav-link, .nav-cta");

  if (!menuToggle || !nav) {
    return;
  }

  const setMenuState = (isOpen) => {
    nav.classList.toggle("is-open", isOpen);
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    nav.setAttribute("aria-hidden", String(!isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  };

  const handleScroll = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 20);
    }
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    setMenuState(!isOpen);
  });

  const closeMenuOnOutsideClick = (event) => {
    if (
      nav.classList.contains("is-open") &&
      window.innerWidth <= 992 &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      setMenuState(false);
    }
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 992) {
        setMenuState(false);
      }
    });
  });

  document.addEventListener("click", closeMenuOnOutsideClick);

  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 992) {
      setMenuState(false);
    }
  });

  handleScroll();
}
