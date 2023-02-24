const navBar = () => {
  const $navbar = document.getElementById("navbar");
  window.addEventListener("DOMContentLoaded", () => {
    if (window.screenY > 32) {
      $navbar.classList.add("navbar-scroll");
    }
  });
  window.addEventListener("scroll", () => {
    if (window.scrollY > 32) {
      $navbar.classList.add("navbar-scroll");
    } else {
      $navbar.classList.remove("navbar-scroll");
    }
  });

  window.addEventListener("click", (e) => {
    if (e.target.matches(".btn-scroll") || e.target.matches(".btn-scroll *")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
};

export default navBar;
