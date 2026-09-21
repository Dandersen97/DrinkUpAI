/* Shared site footer — tagline, page nav, and copyright year. Injected into
   #footer-root so any page can pull in the identical footer with a single
   script tag, the same way scripts/topbar.js injects the top bar. Runs
   top-level (not deferred to an init call) so it renders as soon as the
   script loads, no matter what page includes it.

   Root-absolute link paths ("/index.html" etc.) so the footer still points
   to the right place from a page nested under Games/<name>/. */
function renderFooter(){
  const root = document.getElementById("footer-root");
  if (!root) return;
  root.innerHTML = `
<footer>
  <div class="container d-flex flex-column flex-sm-row justify-content-between gap-2">
    <span>DrinkUp! — built with Bootstrap 5 · rendered from JSON</span>
    <nav class="footer-links">
      <a href="/index.html">Home</a>
      <a href="/about.html">About</a>
      <a href="/devlog.html">Devlog</a>
    </nav>
    <span>© ${new Date().getFullYear()}</span>
  </div>
</footer>
`;
}

renderFooter();
