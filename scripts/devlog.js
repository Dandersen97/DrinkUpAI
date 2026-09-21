/* ---------------- Devlog accordion ---------------- */
function devlogEntryTemplate(entry, index){
  const collapseId = `devlogCollapse${index}`;
  const expanded = index === 0;
  return `
    <div class="accordion-item">
      <h2 class="accordion-header">
        <button class="accordion-button ${expanded ? "" : "collapsed"}" type="button"
          data-bs-toggle="collapse" data-bs-target="#${collapseId}"
          aria-expanded="${expanded}" aria-controls="${collapseId}">
          <span class="devlog-date">${escapeHtml(entry.date)}</span> ${escapeHtml(entry.title)}
        </button>
      </h2>
      <div id="${collapseId}" class="accordion-collapse collapse ${expanded ? "show" : ""}" data-bs-parent="#devlogAccordion">
        <div class="accordion-body">${entry.body}</div>
      </div>
    </div>
  `;
}

function renderDevlog(){
  const list = document.getElementById("devlogAccordion");
  if (!list) return;
  list.innerHTML = DEVLOG.map((entry, i) => devlogEntryTemplate(entry, i)).join("");
}
