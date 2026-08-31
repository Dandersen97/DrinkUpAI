/* Ambient floating icons per color theme — purely decorative */
const AMBIENT_ICONS = {
  "default": ["images/Icons/3drinks.svg", 
              "images/Icons/beer.svg", 
              "images/Icons/beer2.svg", 
              "images/Icons/beer3.svg", 
              "images/Icons/beerGlassAndPitcher.svg", 
              "images/Icons/bottle3pack.svg", 
              "images/Icons/spiral-eyes.svg", 
              "images/Icons/partyChampagne.svg", 
              "images/Icons/plasticCups.svg", 
              "images/Icons/beerBarrel.svg",
              "images/Icons/toilet.svg",
              "images/Icons/tropicalDrink.svg", 
              "images/Icons/tropicalDrink3.svg",
              "images/Icons/WhiskeyAndGlasses.svg", 
              "images/Icons/whiskeyGlass.svg", 
              "images/Icons/wineBottle.svg",
              "images/Icons/wineBottleAndGlass2.svg",
              "images/Icons/wineGlass2.svg",  ],
  "luxury-bar": ["images/Icons/martiniGlasses.svg", 
                 "images/Icons/whiskeyGlass.svg", 
                 "images/Icons/wineBottleAngGlass2.svg"],
  "fantasy-tavern": ["images/Icons/beerStein.svg",
                     "images/Icons/paper.svg",
                     "images/Icons/roast-chicken.svg"
  ],
  "dive-bar": ["images/Icons/beer-mub.svg",
               "images/Icons/cigarette.svg",
               "images/Icons/WhiskeyAndGlasses.svg"
  ],
  "liquor-store": ["images/Icons/beer-mub.svg",
                   "images/Icons/cigarette.svg",
                   "images/Icons/WhiskeyAndGlasses.svg"],
  "brewery": ["images/Icons/beer-mub.svg",
              "images/Icons/cigarette.svg",
              "images/Icons/WhiskeyAndGlasses.svg"],
  "micro-brewery": ["images/Icons/beer-mub.svg",
                    "images/Icons/cigarette.svg",
                    "images/Icons/WhiskeyAndGlasses.svg"]
};

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



/* ---------------- Color theme (Default + bar/tavern skins) ---------------- */
function applyColorTheme(theme){
  document.documentElement.setAttribute("data-color-theme", theme);
  const isDefault = theme === "default";
  document.getElementById("themeToggle").disabled = !isDefault;
  document.getElementById("darkModeSwitch").disabled = !isDefault;
  buildAmbientLayer(theme);
  try { localStorage.setItem("playbase-color-theme", theme); } catch (e) { /* storage unavailable */ }
}

function initColorTheme(){
  let saved = null;
  try { saved = localStorage.getItem("playbase-color-theme"); } catch (e) { /* storage unavailable */ }
  const theme = saved || "default";
  document.getElementById("themeSelect").value = theme;
  applyColorTheme(theme);
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