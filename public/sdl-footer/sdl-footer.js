/**
 * SDL Footer — Inyección de año
 * Busca todos los elementos con [data-sdlf-year] dentro de .sdl-footer
 * y escribe el año actual. Sin dependencias, funciona en cualquier proyecto.
 *
 * Uso: <script src="sdl-footer.js" defer></script>
 */

(function () {
  "use strict";

  function init() {
    var año = new Date().getFullYear();
    document.querySelectorAll(".sdl-footer [data-sdlf-year]")
      .forEach(function (el) { el.textContent = año; });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
