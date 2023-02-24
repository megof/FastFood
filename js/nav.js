export default (() => {
  const $navbar = document.getElementById("navbar");
  window.addEventListener("scroll", (e) => {
    if (window.scrollY > 52) {
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
})();
