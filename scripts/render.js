const state = { category: "All" };

/* Games with disabled: true are excluded everywhere — grid, chips,
   quick-jump nav, game count, and the detail carousel. */
const VISIBLE_GAMES = GAMES.filter(g => !g.disabled);

/* The first category in a game's list sets its primary accent color */
function primaryColor(game){
  return CATEGORY_COLORS[game.categories[0]] || "#6d5bf5";
}

/* Renders one small pill per category, each in its own accent color */
function tagsHtml(game){
  return game.categories.map(cat => {
    const color = CATEGORY_COLORS[cat] || "#6d5bf5";
    return `<span class="tag-pill" style="--accent-cat:${color}">${escapeHtml(cat)}</span>`;
  }).join("");
}

/* ---------------- Category chips ---------------- */
function buildChips(){
  const categories = ["All", ...new Set(VISIBLE_GAMES.flatMap(g => g.categories))];
  const row = document.getElementById("chipRow");
  row.innerHTML = categories.map(cat => {
    const color = CATEGORY_COLORS[cat] || "#6d5bf5";
    const active = cat === state.category ? "active" : "";
    return `<button type="button" class="chip ${active}" style="--accent-cat:${color}" data-cat="${escapeHtml(cat)}">${escapeHtml(cat)}</button>`;
  }).join("");

  row.querySelectorAll(".chip").forEach(btn => {
    btn.addEventListener("click", () => {
      state.category = btn.dataset.cat;
      buildChips();
      renderGrid();
    });
  });
}

/* ---------------- Game grid cards ---------------- */
function cardTemplate(game){
  const color = primaryColor(game);
  return `
    <div class="col-12 col-sm-6 col-lg-4 col-xl-3">
      <div class="game-card" style="--accent-cat:${color}" data-id="${escapeHtml(game.id)}" role="button" tabindex="0" aria-haspopup="dialog">
        <div class="card-image-wrap">
          <img class="card-image" src="${escapeHtml(game.image)}" alt="${escapeHtml(game.title)} cover art" loading="lazy">
        </div>
        <div class="card-body">
          <div class="card-title">${escapeHtml(game.title)}</div>
          <div class="card-desc">${escapeHtml(game.short_desc)}</div>
          <div class="card-tags">${tagsHtml(game)}</div>
          <div class="card-meta">
            <span>${escapeHtml(game.players)}</span>
          </div>
          <div class="card-cta">View details</div>
        </div>
      </div>
    </div>
  `;
}

function renderGrid(){
  const grid = document.getElementById("gameGrid");
  const empty = document.getElementById("emptyState");

  const filtered = VISIBLE_GAMES.filter(g =>
    state.category === "All" || g.categories.includes(state.category)
  );

  grid.innerHTML = filtered.map(g => cardTemplate(g)).join("");
  empty.style.display = filtered.length === 0 ? "block" : "none";
  document.getElementById("gameCount").textContent = VISIBLE_GAMES.length;

  grid.querySelectorAll(".game-card").forEach(card => {
    card.addEventListener("click", () => openGameModalById(card.dataset.id));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " "){
        e.preventDefault();
        openGameModalById(card.dataset.id);
      }
    });
  });
}

/* ---------------- Game detail modal + carousel ---------------- */
function gameDetailTemplate(game, index){
  const color = primaryColor(game);
  return `
    <div class="carousel-item ${index === 0 ? "active" : ""}" data-id="${escapeHtml(game.id)}">
      <div class="modal-game-detail" style="--accent-cat:${color}">
        <div class="modal-game-image-wrap">
          <img class="modal-game-image" src="${escapeHtml(game.image)}" alt="${escapeHtml(game.title)} cover art">
        </div>
        <h3 class="modal-game-title">${escapeHtml(game.title)}</h3>
        <div class="modal-game-tags">${tagsHtml(game)}</div>
        <div class="modal-game-meta font-mono">
          <span>${escapeHtml(game.players)}</span>
        </div>
        <div class="modal-game-desc">${game.long_desc}</div>
        <div class="modal-game-actions">
          <a class="btn-play-full" href="${escapeHtml(game.url)}" rel="noopener">Play ${escapeHtml(game.title)}</a>
        </div>
        <div class="modal-game-progress font-mono">${index + 1} / ${VISIBLE_GAMES.length}</div>
      </div>
    </div>
  `;
}

let gameCarouselInstance = null;
let gameModalInstance = null;

function buildGameCarousel(){
  const inner = document.getElementById("gameCarouselInner");
  inner.innerHTML = VISIBLE_GAMES.map((g, i) => gameDetailTemplate(g, i)).join("");
  gameCarouselInstance = new bootstrap.Carousel(document.getElementById("gameCarousel"), {
    interval: false, ride: false, touch: true, wrap: true
  });
  gameModalInstance = new bootstrap.Modal(document.getElementById("gameModal"));
}

function setActiveSlide(index){
  const items = document.querySelectorAll("#gameCarouselInner .carousel-item");
  items.forEach((item, i) => item.classList.toggle("active", i === index));
}

function openGameModalById(id){
  const index = VISIBLE_GAMES.findIndex(g => g.id === id);
  if (index === -1) return;
  setActiveSlide(index);
  gameModalInstance.show();
}

/* ---------------- Nav dropdown: quick-jump icon carousel ---------------- */
function buildNavIconCarousel(){
  const inner = document.getElementById("navIconCarouselInner");
  const groups = chunk(VISIBLE_GAMES, 4);
  inner.innerHTML = groups.map((group, i) => `
    <div class="carousel-item ${i === 0 ? "active" : ""}">
      <div class="nav-icon-row">
        ${group.map(g => `
          <button type="button" class="nav-icon-btn" data-id="${escapeHtml(g.id)}"
            title="${escapeHtml(g.title)}" style="--accent-cat:${primaryColor(g)}">
            <img src="${escapeHtml(g.image)}" alt="${escapeHtml(g.title)}">
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");

  new bootstrap.Carousel(document.getElementById("navIconCarousel"), {
    interval: false, ride: false, touch: true, wrap: true
  });

  inner.querySelectorAll(".nav-icon-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const dropdownToggle = document.querySelector('[data-bs-toggle="dropdown"]');
      bootstrap.Dropdown.getOrCreateInstance(dropdownToggle).hide();
      openGameModalById(btn.dataset.id);
    });
  });
}
