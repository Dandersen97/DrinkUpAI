# DrinkUpAI

A static, no-build-step game-hub page ("Playbase") — a single `index.html` styled with Bootstrap 5 that renders a searchable/filterable grid of game cards from a plain JS data array. No bundler, no package.json, no server required: open `index.html` directly in a browser.

## Folder structure

```
index.html              Markup only — links to CSS, then loads scripts in order at the bottom of <body>
styles/
  main.css               Layout & component CSS (topbar, hero, search, chips, cards, disabled-games section, modals, footer, animations, media queries)
themes/
  base.css               :root radius/font vars, dark/light theme variables, shared accent palette
  <theme-name>/<theme-name>.css   One specialty color theme per subfolder (e.g. luxury-bar, fantasy-tavern, dive-bar, liquor-store, brewery, micro-brewery)
GameData/
  games.js               const GAMES = [...] and CATEGORY_COLORS — the single source of truth for game cards.
                          Fields: id, title, short_desc (grid card blurb), long_desc (modal blurb),
                          categories, image, url, players, disabled (optional bool — hides a game
                          from the main grid/chips/nav without deleting it; see Conventions below)
scripts/
  utils.js               escapeHtml(), chunk() — small shared helpers
  topbar.js               Injects the shared top bar (brand, theme toggle, settings/menu dropdown,
                          quick-jump carousel) into <div id="topbar-root"> — the one place its markup
                          lives, so any page can pull in the identical top bar with a single script tag
  theme.js                Light/dark toggle, specialty color-theme switching, reduce-motion switch, and
                          the ambient floating icons — each icon re-rolls its image/size/vertical
                          position/speed every time it finishes floating across the screen
  render.js                Chips, search, card grid, detail modal/carousel, nav quick-jump carousel, and
                          the "Show disabled games" section — VISIBLE_GAMES (disabled: false/absent)
                          drives the main grid/chips/nav/count; DISABLED_GAMES drives the greyed-out
                          section at the bottom, toggled from the navbar and persisted to localStorage
  app.js                  Init sequence only — calls the init functions from theme.js/render.js in order
images/
  Icons/                 ~130 SVG icons (plus a nested Subimage/ folder) — general icon art
  Logos/                 Per-game logo SVGs, named to match games in GameData/games.js
  (both folders' contents are excluded from Claude's context by .claudeignore — the folders
  themselves stay visible for path references, but the hundreds of individual files aren't
  auto-loaded; see .claudeignore)
svg-gallery.html        Standalone dev utility — not linked from index.html or part of the app. Crawls
                          images/ via fetch and thumbnails every SVG found. Needs a local static server
                          to run (directory-listing fetch fails when opened over file://).
```

Scripts are loaded as plain global-scope files via ordered `<script defer>` tags (no ES modules), so the page keeps working when opened directly by double-click. Load order matters: `GameData/games.js` → `scripts/utils.js` → `scripts/topbar.js` → `scripts/theme.js` → `scripts/render.js` → `scripts/app.js` — each depends on globals (or DOM elements) defined by the one before it. `topbar.js` must run before `theme.js`/`render.js` since those attach listeners to top-bar elements at top level, not inside a `DOMContentLoaded` handler.

## Conventions

- **Add a game**: push a new object onto the `GAMES` array in `GameData/games.js` with `short_desc` (grid card) and `long_desc` (detail modal). The grid, chips, search, quick-jump menu, and detail carousel all update automatically — no other code changes needed.
- **Hide a game without deleting it**: set `disabled: true` on its entry. It disappears from the main grid, category chips, quick-jump nav, and game count, but still gets a modal/carousel slide and can be surfaced greyed-out at the bottom of the page via the navbar's "Show disabled games" toggle.
- **Add a color theme**: create `themes/<name>/<name>.css` with a `:root[data-color-theme="<name>"]{...}` block (copy an existing theme file as a template), add a matching `<link>` in `index.html`'s `<head>`, add an `<option>` to the `#themeSelect` dropdown (in `scripts/topbar.js`), and optionally add entries to `CATEGORY_COLORS` (GameData/games.js) or `AMBIENT_ICONS` (scripts/theme.js) if the theme should have its own ambient icon set.
- **Replace placeholder art**: swap the `image` URL in a game's object in `GameData/games.js` for a local path under `images/Logos/` or `images/Icons/`.
- **Wire up a game's Settings / How To Play modals**: the shared top bar (`scripts/topbar.js`) has generic "Settings" and "How To Play" menu buttons that open `#gameSettingsModal` / `#gameHowToPlayModal` if the current page defines them — otherwise the click is a no-op. Add a Bootstrap modal with that exact `id` to the game's own page (see `Games/WheelOfMisfortune/index.html` for an example) to hook it up; content is entirely up to the game.
