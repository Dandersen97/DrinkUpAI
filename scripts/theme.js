/* Ambient floating icons per color theme — purely decorative. Holiday
   themes (halloween, christmas, st-paddy, easter, independence-day,
   new-year) have no entry yet and fall back to AMBIENT_ICONS.default
   below — add a themed icon set here once holiday-specific art exists. */
const AMBIENT_ICONS = {
  "default": ["/images/Icons/3drinks.svg", 
              "/images/Icons/beer.svg", 
              "/images/Icons/beer2.svg", 
              "/images/Icons/beer3.svg", 
              "/images/Icons/beerGlassAndPitcher.svg", 
              "/images/Icons/bottle3pack.svg", 
              "/images/Icons/spiral-eyes.svg", 
              "/images/Icons/partyChampagne.svg", 
              "/images/Icons/plasticCups.svg", 
              "/images/Icons/beerBarrel.svg",
              "/images/Icons/toilet.svg",
              "/images/Icons/tropicalDrink.svg", 
              "/images/Icons/tropicalDrink3.svg",
              "/images/Icons/WhiskeyAndGlasses.svg", 
              "/images/Icons/whiskeyGlass.svg", 
              "/images/Icons/wineBottle.svg",
              "/images/Icons/wineBottleAndGlass2.svg",
              "/images/Icons/wineGlass2.svg",
              "/images/Icons/bottles.svg",
              "/images/Icons/champagne.svg",
              "/images/Icons/champagne3.svg",
              "/images/Icons/cocktail.svg",
              "/images/Icons/cocktail2.svg"  ],
  "luxury-bar": ["/images/Icons/martiniGlasses.svg", 
                 "/images/Icons/whiskeyGlass.svg", 
                 "/images/Icons/wineBottleAndGlass2.svg",
                 "/images/Icons/bar2.svg",
                 "/images/Icons/bar3.svg",
                 "/images/Icons/champagne.svg",
                 "/images/Icons/champagne2.svg",
                 "/images/Icons/cocktail2.svg",
                 "/images/Icons/drinks.svg",
                 "/images/Icons/partyChampagne.svg",
                 "/images/Icons/whiskey3.svg"],
  "fantasy-tavern": ["/images/Icons/beerStein.svg",
                     "/images/Icons/paper.svg",
                     "/images/Icons/roast-chicken.svg",
                     "/images/Icons/bar.svg",
                     "/images/Icons/barSign.svg",
                     "/images/Icons/bottles2.svg",
                     "/images/Icons/bottles3.svg",
                     "/images/Icons/keg.svg"],
  "dive-bar": ["/images/Icons/beer-mug.svg",
               "/images/Icons/cigarette.svg",
               "/images/Icons/WhiskeyAndGlasses.svg",
               "/images/Icons/bar.svg",
               "/images/Icons/bar4.svg",
               "/images/Icons/bar5.svg",
               "/images/Icons/barStool.svg",
               "/images/Icons/bottles5.svg",
               "/images/Icons/crackedGlass.svg"],
  "micro-brewery": ["/images/Icons/beer-mug.svg",
                    "/images/Icons/beerGlassAndPitcher.svg",
                    "/images/Icons/can2.svg",
                    "/images/Icons/bottle3pack4.svg",
                    "/images/Icons/hops.svg",
                    "/images/Icons/hops.svg",
                    "/images/Icons/hops.svg",
                    "/images/Icons/bar5.svg",
                    "/images/Icons/hops.svg",
                    "/images/Icons/tank1.svg",
                    "/images/Icons/tank2.svg"
                ],
  "st-paddy": ["/images/Logos/stpaddy_2026.svg",
               "/images/Icons/bottle3pack3.svg",
               "/images/Icons/vomiting.svg",
               "/images/Icons/clover.svg",
               "/images/Icons/cloverParade.svg",
               "/images/Icons/goldPotRainbow.svg",
               "/images/Icons/bar5.svg"
              ],
  "independence-day": [
                  "/images/Icons/beer-mug.svg",
                  "/images/Icons/eagle.svg",
                  "/images/Icons/baseball.svg",
                  "/images/Icons/statue_liberty.svg",
                  "/images/Icons/fireworks.svg",
                  "/images/Icons/fireworks2.svg",
                  "/images/Icons/fireworks3.svg",
                  "/images/Icons/fireworks4.svg",
                  "/images/Icons/hotdog.svg",
                  "/images/Icons/party.svg"
              ],
  "halloween": ["/images/Logos/halloween_2021.svg",
                "/images/Icons/crossbones.svg",
                "/images/Icons/pirateSkull.svg",
                "/images/Icons/spider.svg",
                "/images/Icons/cauldron.svg",
                "/images/Icons/witch.svg",
                "/images/Icons/reaper.svg",
                "/images/Icons/clown.svg",
                "/images/Icons/cleaver.svg",
                "/images/Icons/zombieHand.svg",
                "/images/Icons/candycorn.svg",
                "/images/Icons/bats.svg"
              ],
  "christmas": ["/images/Logos/christmas_2021.svg",
                "/images/Icons/winter_cap.svg",
                "/images/Icons/winter_cap2.svg",
                "/images/Icons/mistletoe.svg",
                "/images/Icons/festiveTree.svg",
                "/images/Icons/menorah.svg",
                "/images/Icons/candycane.svg"
              ],
  "new-year": ["/images/Icons/party.svg",
               "/images/Icons/partyChampagne.svg",
               "/images/Icons/earth-face.svg",
               "/images/Icons/champagne.svg",
               "/images/Icons/couple.svg",
               "/images/Icons/musical-notes.svg",
               "/images/Icons/party.svg",
               "/images/Icons/fireworks4.svg"
              ]
};
const THEME_LOGOS = {
 "default": "/images/Logos/DRINKUP1.svg",
 "halloween": "/images/Logos/halloween_2021.svg",
 "christmas": "/images/Logos/christmas_2021.svg",
 "st-paddy": "/images/Logos/stpaddy_2026.svg"
}
/* ---------------- Theme (light / dark) ---------------- */
function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  document.getElementById("darkModeSwitch").checked = theme === "dark";
  try { localStorage.setItem("playbase-theme", theme); } catch (e) { /* storage unavailable */ }
  
}

function initTheme(){
  let saved = null;
  try { saved = localStorage.getItem("playbase-theme"); } catch (e) { /* storage unavailable */ }
  applyTheme(saved === "light" ? "light" : "dark"); // defaults to dark
}

function toggleTheme(){
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

document.getElementById("themeToggle").addEventListener("click", toggleTheme);
document.getElementById("darkModeSwitch").addEventListener("change", (e) => {
  applyTheme(e.target.checked ? "dark" : "light");
});

/* ---------------- Ambient floating icons ---------------- */
/* Shared random ranges for an icon's float pass — used both when an icon
   is first created and when it re-rolls itself after finishing a pass. */
function randomAmbientIconVars(){
  return {
    top: (Math.random() * 78 + 6).toFixed(1),
    duration: (Math.random() * 15 + 10).toFixed(1),
    opacity: (Math.random() * 0.22 + 0.4).toFixed(2),
    size: (Math.random() * 110) + 30
  };
}

function buildAmbientLayer(theme){
  const layer = document.getElementById("ambientLayer");
  if (!layer) return;
  const glyphs = AMBIENT_ICONS[theme] || AMBIENT_ICONS.default;
  const count = 7;
  let html = "";
  for (let i = 0; i < count; i++){
    const glyph = glyphs[i % glyphs.length];
    const { top, duration, opacity, size } = randomAmbientIconVars();
    const delay = (-(Math.random() * duration)).toFixed(1);
    //const delay = 0;
    html += `<img src="${glyph}" class="ambient-icon"  style="--icon-top:${top}%; --icon-duration:${duration}s; --icon-delay:${delay}s; --icon-size:${size}px; --icon-opacity:${opacity};" />`;
  }
  layer.innerHTML = html;
}

/* Legal-gate placeholder logo (see .legal-gate-logo / buildLegalGate() in
   scripts/render.js) — reuses each theme's first ambient icon rather than
   a separate curated image, so it stays in sync with AMBIENT_ICONS above
   and needs no upkeep of its own. Swap in real per-theme brand art later
   by giving this its own lookup table instead. */
function legalGateLogoSrc(theme){
  const glyphs = THEME_LOGOS[theme] || THEME_LOGOS.default;
  return glyphs;
}

/* No-op if the gate isn't in the DOM — it's only injected once, when the
   visitor hasn't yet accepted it this session (see buildLegalGate()). */
function updateLegalGateLogo(theme){
  const img = document.querySelector("#legalGateModal .legal-gate-logo img");
  if (!img) return;
  img.src = legalGateLogoSrc(theme);
}

/* Re-rolls one ambient icon's image, size, vertical position, speed, and
   opacity — called each time its floatAcross pass finishes, so it never
   repeats the exact same appearance twice in a row. */
function rerollAmbientIcon(img){
  
  const theme = document.documentElement.getAttribute("data-color-theme") || "default";
  const glyphs = AMBIENT_ICONS[theme] || AMBIENT_ICONS.default;
  const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];
  const { top, duration, opacity, size } = randomAmbientIconVars();

  img.src = glyph;
  img.style.setProperty("--icon-top", `${top}%`);
  //img.style.setProperty("--icon-duration", `${duration}s`);
  img.style.setProperty("--icon-size", `${size}px`);
  //img.style.setProperty("--icon-width", `${size}px`);
  //img.style.setProperty("--icon-height", `${size}px`);
  img.style.setProperty("--icon-opacity", opacity);
  
}



/* ---------------- Seasonal / holiday themes ---------------- */
/* Each entry's `active(date)` returns true when `date` falls inside that
   holiday's window. Checked in listed order — the first match wins — so
   list narrower/higher-priority holidays before wider ones if windows
   could ever overlap. These are approximate placeholder windows; adjust
   freely once real holiday art/copy exists for a theme. */
function isMonthDayInWindow(date, startMonth, startDay, endMonth, endDay){
  const md = (date.getMonth() + 1) * 100 + date.getDate();
  const start = startMonth * 100 + startDay;
  const end = endMonth * 100 + endDay;
  return start <= end ? (md >= start && md <= end) : (md >= start || md <= end);
}

/* Anonymous Gregorian algorithm — Easter Sunday varies year to year
   (late March to late April), so it can't use a fixed month/day window. */
function easterSunday(year){
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

const HOLIDAY_THEMES = [
  { theme: "st-paddy", active: d => isMonthDayInWindow(d, 3, 10, 3, 17) },
  /*//Easter unused but keeping logic
  { theme: "easter", active: d => {
      const sunday = easterSunday(d.getFullYear());
      const start = new Date(sunday); start.setDate(sunday.getDate() - 9);
      const end = new Date(sunday); end.setDate(sunday.getDate() + 1);
      return d >= start && d <= end;
    } },
  */
  { theme: "independence-day", active: d => isMonthDayInWindow(d, 6, 28, 7, 5) },
  { theme: "halloween", active: d => isMonthDayInWindow(d, 10, 16, 11, 6) },
  { theme: "christmas", active: d => isMonthDayInWindow(d, 12, 11, 12, 30) },
  { theme: "new-year", active: d => isMonthDayInWindow(d, 12, 31, 1, 2) }
];

/* Returns the active holiday theme for `date` (defaults to now), or
   "default" when none match. */
function seasonalTheme(date = new Date()){
  const match = HOLIDAY_THEMES.find(h => h.active(date));
  return match ? match.theme : "default";
}

/* ---------------- Color theme (Default + bar/tavern skins) ---------------- */
function applyColorTheme(theme, { persist = true } = {}){
  document.documentElement.setAttribute("data-color-theme", theme);
  const isDefault = theme === "default";
  //document.getElementById("themeToggle").disabled = !isDefault;
  //document.getElementById("darkModeSwitch").disabled = !isDefault;
  buildAmbientLayer(theme);
  updateLegalGateLogo(theme);
  if (persist){
    try { localStorage.setItem("playbase-color-theme", theme); } catch (e) { /* storage unavailable */ }
  }
  try { themeChange(theme); } catch (e) { /* game doesn't use theme change */ }
}

/* No saved preference falls back to whatever holiday is currently in
   season (see HOLIDAY_THEMES above) instead of always "default" — and
   that automatic pick is never persisted, so it keeps re-evaluating
   against today's date on every future visit instead of getting stuck
   on the first holiday it ever landed on. An explicit pick from the
   dropdown always persists and always wins over the seasonal default. */
function initColorTheme(){
  let saved = null;
  try { saved = localStorage.getItem("playbase-color-theme"); } catch (e) { /* storage unavailable */ }
  const theme = saved || seasonalTheme();
  document.getElementById("themeSelect").value = theme;
  applyColorTheme(theme, { persist: false });
}

document.getElementById("themeSelect").addEventListener("change", (e) => {
  applyColorTheme(e.target.value);
});

/* ---------------- Settings: reduce motion ---------------- */
document.getElementById("reduceMotionSwitch").addEventListener("change", (e) => {
  document.body.classList.toggle("reduce-motion", e.target.checked);
});


document.getElementById("ambientLayer").addEventListener("animationiteration", (e) => {
  if (e.target.classList.contains("ambient-icon")) rerollAmbientIcon(e.target);
});