(function () {
  var burger = document.getElementById("nav-burger");
  var menu = document.getElementById("mobile-menu");
  if (!burger || !menu) return;

  burger.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    burger.innerHTML = open ? "&#10005;" : "&#9776;";
  });
})();
