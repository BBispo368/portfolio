(function () {
  const C = window.CONFIG;
  const P = window.PROJECTS;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  // Idioma: ?lang= na URL > escolha salva > idioma do navegador
  const urlLang = new URLSearchParams(location.search).get("lang");
  let lang = ["pt", "en"].includes(urlLang) ? urlLang : store.get("lang") || (/^pt/i.test(navigator.language) ? "pt" : "en");
  if (!window.I18N[lang]) lang = "pt";

  const T = () => window.I18N[lang];
  const get = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), T());
  const fill = (s, vars) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k]);
  const cats = () => (lang === "en" ? window.CATEGORIES_EN : window.CATEGORIES);
  const tr = (p) => (lang === "en" && window.PROJECTS_EN[p.id] ? { ...p, ...window.PROJECTS_EN[p.id] } : p);

  const ordered = [...P].sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0));
  let active = "all";

  // Mini-ilustrações por categoria (traço = cor do texto, detalhe = destaque)
  const ART = {
    web: `<svg class="art" viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="156" height="96" rx="8"/><path d="M2 20h156"/><circle cx="12" cy="11" r="2.5"/><circle cx="21" cy="11" r="2.5"/><circle cx="30" cy="11" r="2.5"/><path d="M14 36h70M14 48h52M14 60h60"/><rect x="14" y="74" width="34" height="12" rx="6" class="hl" stroke="none"/><rect x="98" y="32" width="48" height="54" rx="5"/></svg>`,
    corp: `<svg class="art" viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="48" height="96" rx="7"/><rect x="56" y="2" width="48" height="96" rx="7"/><rect x="110" y="2" width="48" height="96" rx="7"/><rect x="9" y="12" width="34" height="18" rx="4"/><rect x="9" y="36" width="34" height="18" rx="4"/><rect x="63" y="12" width="34" height="18" rx="4" class="hl" stroke="none"/><rect x="63" y="36" width="34" height="18" rx="4"/><rect x="63" y="60" width="34" height="18" rx="4"/><rect x="117" y="12" width="34" height="18" rx="4"/></svg>`,
    mobile: `<svg class="art" viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="52" y="2" width="56" height="96" rx="10"/><path d="M72 9h16"/><circle cx="80" cy="42" r="16"/><path d="M71 40h0M89 40h0" stroke-linecap="round" stroke-width="3"/><path d="M73 48c4 4 10 4 14 0"/><path d="M60 26l6-6M100 26l-6-6M60 58l6 6M100 58l-6 6" class="hl-s"/><rect x="62" y="74" width="36" height="12" rx="6" class="hl" stroke="none"/></svg>`,
    auto: `<svg class="art" viewBox="0 0 160 100" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="2" width="156" height="96" rx="8"/><path d="M14 22l8 6-8 6M28 34h22"/><path d="M14 52h60M14 64h44"/><rect x="14" y="78" width="132" height="8" rx="4"/><rect x="14" y="78" width="88" height="8" rx="4" class="hl" stroke="none"/><circle cx="128" cy="38" r="14"/><path d="M128 18v6M128 52v6M108 38h6M142 38h6"/></svg>`,
  };

  // ───────── Textos estáticos
  function applyStatic() {
    const t = T();
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]').content = t.meta.description;
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = get(el.dataset.i18n) || ""));
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", get(el.dataset.i18nAria)));
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    $("#workIntro").textContent = fill(t.work.intro, { n: P.length });
    $("#aboutText").innerHTML = t.about.text.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#faqList").innerHTML = t.faq.items.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
    $("#steps").innerHTML = t.process.steps.map((s) => `<li><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></li>`).join("");
    renderContact();
    renderTools();
    renderFilters();
    renderBento();
  }

  // ───────── Dados pessoais
  document.querySelectorAll("[data-bind]").forEach((el) => {
    const v = C[el.dataset.bind];
    if (v) el.textContent = v; else el.remove();
  });
  $("#year").textContent = new Date().getFullYear();
  const initials = C.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  $("#photo").innerHTML = C.photo ? `<img src="${esc(C.photo)}" alt="${esc(C.name)}" />` : initials;

  function renderContact() {
    const t = T().contact;
    const items = [
      C.whatsapp && [t.whatsapp, `https://wa.me/${C.whatsapp}`, "btn-accent"],
      C.email && [t.email, `mailto:${C.email}?subject=${encodeURIComponent(t.mailSubject)}`, C.whatsapp ? "btn-quiet" : "btn-accent"],
      C.linkedin && ["LinkedIn", C.linkedin, "btn-quiet"],
      C.github && ["GitHub", C.github, "btn-quiet"],
    ].filter(Boolean);
    $("#contactActions").innerHTML = items
      .map(([label, href, cls]) => `<a class="btn ${cls}" href="${esc(href)}"${href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(label)}</a>`)
      .join("");
  }

  // ───────── Ferramentas: só as usadas em 2+ projetos
  const techCount = {};
  P.forEach((p) => p.stack.forEach((t) => (techCount[t] = (techCount[t] || 0) + 1)));
  const techs = Object.entries(techCount).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const mainTechs = techs.filter(([, n]) => n > 1);
  function renderTools() {
    const rest = techs.length - mainTechs.length;
    $("#tools").innerHTML =
      mainTechs.map(([t, n], i) => `<li class="${i < 5 ? "top" : ""}">${esc(t)}<b>${n}</b></li>`).join("") +
      (rest ? `<li class="more">${esc(fill(T().stack.more, { n: rest }))}</li>` : "");
  }

  // ───────── Filtros
  function renderFilters() {
    const c = cats();
    const defs = [["all", T().work.all, P.length]].concat(Object.keys(c).map((k) => [k, c[k], P.filter((p) => p.category === k).length]));
    $("#filters").innerHTML = defs
      .map(([k, label, n]) => `<button type="button" data-cat="${k}" aria-pressed="${k === active}">${esc(label)}<span>${n}</span></button>`)
      .join("");
  }
  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    active = b.dataset.cat;
    renderFilters();
    renderBento();
  });

  // ───────── Bento de projetos
  function renderBento() {
    const t = T().work;
    const c = cats();
    const list = ordered.filter((p) => active === "all" || p.category === active).map(tr);
    // Destaques alternam entre bloco grande (2x2) e largo (2x1) para formar o mosaico
    let feat = 0;
    $("#bento").innerHTML = list
      .map((p) => {
        const big = p.highlight;
        const size = big ? (feat++ % 3 === 0 ? " big" : " wide") : "";
        const cover = big && p.images && p.images[0];
        return `
        <button type="button" class="tile${size}${cover ? " has-shot" : ""}" data-id="${p.id}">
          <span class="tile-top"><span>${esc(c[p.category])}</span>${big ? `<span class="flag">${esc(t.featured)}</span>` : ""}</span>
          ${cover ? `<span class="shot"><img src="${esc(cover)}" alt="" loading="lazy" /></span>` : big ? ART[p.category] : ""}
          <h3>${esc(p.title)}</h3>
          <p class="sum">${esc(p.summary)}</p>
          <span class="stk">${esc(p.stack.slice(0, big ? 4 : 3).join(" / "))}</span>
        </button>`;
      })
      .join("");
  }

  // ───────── Painel de detalhe
  const sheet = $("#sheet");
  function openProject(id) {
    const t = T().work;
    const p = tr(P.find((x) => x.id === id));
    const links = [
      p.links.demo && `<a class="btn btn-accent" href="${esc(p.links.demo)}" target="_blank" rel="noopener">${esc(t.demo)}</a>`,
      p.links.repo && `<a class="btn btn-quiet" href="${esc(p.links.repo)}" target="_blank" rel="noopener">${esc(t.repo)}</a>`,
    ].filter(Boolean);
    const shots = p.images || [];
    const gallery = shots.length
      ? `<figure class="gallery">
          <img class="gallery-main" id="galleryMain" src="${esc(shots[0])}" alt="${esc(fill(t.shotAlt, { title: p.title, n: 1 }))}" />
          ${shots.length > 1 ? `<div class="thumbs">${shots.map((s, i) => `<button type="button" data-shot="${esc(s)}" data-n="${i + 1}" aria-pressed="${i === 0}" aria-label="${esc(fill(t.shotAlt, { title: p.title, n: i + 1 }))}"><img src="${esc(s)}" alt="" loading="lazy" /></button>`).join("")}</div>` : ""}
          <figcaption>${esc(p.shotsRecreated ? t.shotNoteRecreated : t.shotNote)}</figcaption>
        </figure>`
      : "";
    $("#sheetBody").innerHTML = `
      ${gallery}
      <p class="meta">${esc(cats()[p.category])}, ${esc((t.kinds[p.kind] || "").toLowerCase())}</p>
      <h3 id="sheetTitle">${esc(p.title)}</h3>
      <p class="desc">${esc(p.description)}</p>
      <div class="sheet-cols">
        <div><h4>${esc(t.features)}</h4><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>
        <div><h4>${esc(t.stack)}</h4><div class="chips">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>
      </div>
      ${links.length ? `<div class="actions">${links.join("")}</div>` : ""}`;
    sheet.showModal();
  }
  $("#bento").addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (tile) openProject(tile.dataset.id);
  });
  // Troca da imagem principal da galeria
  $("#sheetBody").addEventListener("click", (e) => {
    const b = e.target.closest("[data-shot]");
    if (!b) return;
    const main = $("#galleryMain");
    main.src = b.dataset.shot;
    main.alt = b.getAttribute("aria-label");
    document.querySelectorAll(".thumbs button").forEach((x) => x.setAttribute("aria-pressed", x === b));
  });
  $("#sheetClose").addEventListener("click", () => sheet.close());
  sheet.addEventListener("click", (e) => e.target === sheet && sheet.close());

  // ───────── Idioma e tema
  document.querySelectorAll("[data-lang]").forEach((b) =>
    b.addEventListener("click", () => {
      if (b.dataset.lang === lang) return;
      lang = b.dataset.lang;
      store.set("lang", lang);
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
      applyStatic();
    })
  );
  if (!document.documentElement.dataset.theme) document.documentElement.dataset.theme = "dark";
  $("#themeToggle").addEventListener("click", () => {
    const root = document.documentElement;
    root.dataset.theme = root.dataset.theme === "light" ? "dark" : "light";
    store.set("theme", root.dataset.theme);
  });

  applyStatic();
})();
