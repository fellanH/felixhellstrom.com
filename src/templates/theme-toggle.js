(function () {
  var btn = document.getElementById("theme-toggle");
  if (!btn) return;

  function icon() {
    var d = document.documentElement.getAttribute("data-theme");
    if (!d)
      d = matchMedia("(prefers-color-scheme:dark)").matches ? "dark" : "light";
    btn.textContent = d === "dark" ? "\u2600" : "\u263E";
  }

  icon();

  btn.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    if (!cur)
      cur = matchMedia("(prefers-color-scheme:dark)").matches
        ? "dark"
        : "light";
    var next = cur === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    icon();
  });
})();
