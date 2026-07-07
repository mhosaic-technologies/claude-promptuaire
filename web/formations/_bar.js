/* Barre de header commune à toutes les pages formations.
   Inclusion : <script src="_bar.js"></script> juste après <body>. */
(function () {
  "use strict";

  var isIndex = /\/formations\/(index(\.html)?)?$/.test(location.pathname);

  var css = [
    "#fbar{position:sticky;top:0;z-index:60;height:46px;background:rgba(244,246,249,.92);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border-bottom:1px solid #DDE3EC}",
    ".fbar-in{max-width:1060px;margin:0 auto;height:100%;padding:0 24px;display:flex;align-items:center;gap:14px}",
    ".fbar-brand{display:inline-flex;align-items:center;gap:8px;color:#141D2C;text-decoration:none;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:.95rem;white-space:nowrap}",
    ".fbar-right{margin-left:auto;display:inline-flex;align-items:center;gap:8px}",
    ".fbar-btn{color:#4B586E;text-decoration:none;font-family:'IBM Plex Sans',system-ui,sans-serif;font-size:.82rem;font-weight:600;padding:6px 10px;border:1px solid #DDE3EC;border-radius:8px;background:#FFFFFF;white-space:nowrap}",
    ".fbar-btn:hover,.fbar-btn:focus-visible{background:#E7EAFC;color:#3947B8;border-color:#E7EAFC}",
    ".fbar-btn.is-current{border-style:dashed;background:transparent;color:#4B586E;opacity:.65;pointer-events:none}",
    ".fbar-link{color:#4B586E;text-decoration:none;font-family:'IBM Plex Sans',system-ui,sans-serif;font-size:.82rem;font-weight:600;padding:6px 10px;border-radius:8px;white-space:nowrap}",
    ".fbar-link:hover,.fbar-link:focus-visible{background:#E7EAFC;color:#3947B8}",
    /* la nav locale des modules reste sticky juste sous la barre */
    "nav{top:46px}",
    "@media(max-width:640px){.fbar-cc,.fbar-lm{display:none}.fbar-in{padding:0 14px;gap:8px}}"
  ].join("\n");

  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var indexItem = isIndex
    ? '<span class="fbar-btn is-current" aria-current="page">Index<span class="fbar-lm"> des modules</span></span>'
    : '<a class="fbar-btn" href="index.html">Index<span class="fbar-lm"> des modules</span></a>';

  document.body.insertAdjacentHTML(
    "afterbegin",
    '<header id="fbar">' +
      '<div class="fbar-in">' +
        '<a class="fbar-brand" href="index.html">🎓 <span>Formations<span class="fbar-cc"> Claude Code</span></span></a>' +
        '<span class="fbar-right">' +
          indexItem +
          '<a class="fbar-link" href="../">← Le Promptuaire</a>' +
        "</span>" +
      "</div>" +
    "</header>"
  );
})();
