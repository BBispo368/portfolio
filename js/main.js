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
  const loc = (v) => (typeof v === "string" ? v : (v && v[lang]) || "");

  const ordered = [...P].sort((a, b) => (b.highlight ? 1 : 0) - (a.highlight ? 1 : 0));
  let active = "all";
  let expanded = false;

  // Movimento: mesma curva em toda a interface; sem deslocamento para quem pede menos movimento
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
  const EASE = "cubic-bezier(0.2, 0.7, 0.1, 1)";
  // O Safari só aplica :active no toque se houver um listener de touchstart
  document.addEventListener("touchstart", () => {}, { passive: true });

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
    const canonical = document.querySelector('link[rel="canonical"]');
    canonical.href = `${canonical.href.split("?")[0]}?lang=${lang}`;
    document.querySelectorAll("[data-i18n]").forEach((el) => (el.textContent = get(el.dataset.i18n) || ""));
    document.querySelectorAll("[data-i18n-aria]").forEach((el) => el.setAttribute("aria-label", get(el.dataset.i18nAria)));
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    $("#workIntro").textContent = fill(t.work.intro, { n: P.length });
    $("#aboutText").innerHTML = t.about.text.map((p) => `<p>${esc(p)}</p>`).join("");
    $("#faqList").innerHTML = t.faq.items.map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join("");
    $("#steps").innerHTML = t.process.steps.map((s) => `<li><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></li>`).join("");
    renderServices();
    renderStats();
    renderTimeline();
    renderTestimonials();
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

  // Trajetória, currículo e depoimentos só aparecem quando preenchidos em config.js
  function renderTimeline() {
    const items = C.timeline || [];
    const list = $("#timeline");
    list.hidden = !items.length;
    list.innerHTML = items
      .map((i) => `<li><span class="period">${esc(i.period)}</span><div><strong>${esc(loc(i.title))}</strong>${loc(i.place) ? `<span class="muted">${esc(loc(i.place))}</span>` : ""}</div></li>`)
      .join("");
    const cv = loc(C.cv);
    const action = $("#cvAction");
    action.hidden = !cv;
    action.innerHTML = cv ? `<a class="btn btn-quiet" href="${esc(cv)}" download>${esc(T().about.cv)}</a>` : "";
    const heroCv = $("#heroCv");
    heroCv.hidden = !cv;
    if (cv) {
      heroCv.href = cv;
      heroCv.textContent = T().about.cv;
    }
  }

  // Tipos de trabalho, cada um com projetos de exemplo que abrem o painel
  function renderServices() {
    const t = T().services;
    $("#services").innerHTML = t.items
      .map((s) => {
        const examples = s.projects.map((id) => P.find((p) => p.id === id)).filter(Boolean).map(tr);
        return `<article><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p>${
          examples.length ? `<p class="examples"><span>${esc(t.examples)}</span>${examples.map((p) => `<button type="button" data-open="${p.id}">${esc(p.title)}</button>`).join("")}</p>` : ""
        }</article>`;
      })
      .join("");
  }
  $("#services").addEventListener("click", (e) => {
    const b = e.target.closest("[data-open]");
    if (b) openProject(b.dataset.open, b);
  });

  // Números do "Sobre", sempre calculados a partir dos projetos
  function renderStats() {
    const s = T().about.stats;
    const values = {
      projects: P.length,
      internal: P.filter((p) => p.kind === "internal").length,
      clients: P.filter((p) => p.kind === "client").length,
      tools: techs.length,
    };
    $("#stats").innerHTML = Object.keys(s)
      .map((k) => `<div><dt>${values[k]}</dt><dd>${esc(s[k])}</dd></div>`)
      .join("");
  }
  function renderTestimonials() {
    const items = C.testimonials || [];
    $("#depoimentos").hidden = !items.length;
    $("#quotes").innerHTML = items
      .map((q) => `<figure><blockquote>${esc(loc(q.quote))}</blockquote><figcaption><strong>${esc(q.author)}</strong>${loc(q.role) ? `<span class="muted">${esc(loc(q.role))}</span>` : ""}</figcaption></figure>`)
      .join("");
  }

  function renderContact() {
    const t = T().contact;
    const short = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
    const phone = (n) => n.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, "+$1 $2 $3-$4");
    const items = [
      C.whatsapp && ["WhatsApp", phone(C.whatsapp), t.channels.whatsapp, `https://wa.me/${C.whatsapp}`],
      C.email && ["E-mail", C.email, t.channels.email, `mailto:${C.email}?subject=${encodeURIComponent(t.mailSubject)}`],
      C.linkedin && ["LinkedIn", short(C.linkedin), t.channels.linkedin, C.linkedin],
      C.github && ["GitHub", short(C.github), t.channels.github, C.github],
    ].filter(Boolean);
    const external = (href) => (href.startsWith("http") ? ' target="_blank" rel="noopener"' : "");
    $("#contactActions").innerHTML = items
      .map(([name, value, hint, href]) => `<a class="channel" href="${esc(href)}"${external(href)}><span class="channel-name">${esc(name)}</span><span class="channel-value">${esc(value)}</span><span class="channel-hint">${esc(hint)}</span></a>`)
      .join("");
    $("#footerContact").innerHTML = items.map(([name, , , href]) => `<li><a href="${esc(href)}"${external(href)}>${esc(name)}</a></li>`).join("");
  }

  // ───────── Ferramentas: as principais (js/tools.js) com ícone por área; das demais, só as usadas em 2+ projetos
  const techCount = {};
  P.forEach((p) => p.stack.forEach((t) => (techCount[t] = (techCount[t] || 0) + 1)));
  const techs = Object.entries(techCount).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  const featured = window.TOOLS.filter((x) => techCount[x.name]).sort((a, b) => techCount[b.name] - techCount[a.name]);
  const others = techs.filter(([t, n]) => n > 1 && !featured.some((x) => x.name === t));
  function renderTools() {
    const t = T().stack;
    const count = (n) => fill(n === 1 ? t.project : t.projects, { n });
    $("#tools").innerHTML = Object.keys(t.groups)
      .map((g) => {
        const items = featured.filter((x) => x.group === g);
        if (!items.length) return "";
        return `<div class="tool-group"><h3>${esc(t.groups[g])}</h3><ul>${items
          .map((x) => `<li><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${esc(x.icon)}"/></svg><span>${esc(x.name)}</span><span class="n">${esc(count(techCount[x.name]))}</span></li>`)
          .join("")}</ul></div>`;
      })
      .join("");
    const rest = techs.length - featured.length - others.length;
    $("#toolsMore").innerHTML =
      `<span class="label">${esc(t.also)}</span>` +
      others.map(([x]) => `<span>${esc(x)}</span>`).join("") +
      (rest ? `<span class="more">${esc(fill(t.more, { n: rest }))}</span>` : "");
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
    if (!b || b.dataset.cat === active) return;
    active = b.dataset.cat;
    // Atualiza sem recriar os botões, para o foco do teclado continuar no filtro
    document.querySelectorAll("#filters [data-cat]").forEach((x) => x.setAttribute("aria-pressed", x === b));
    moveBento();
  });
  $("#moreBtn").addEventListener("click", (e) => {
    expanded = !expanded;
    moveBento();
    e.currentTarget.scrollIntoView({ block: "nearest" });
  });

  // Cada card sai da posição atual na tela até a nova; quem entra ou viajaria mais de uma tela surge com fade
  function moveBento() {
    const tiles = () => [...$("#bento").children];
    const before = new Map(tiles().map((el) => [el.dataset.id, el.getBoundingClientRect()]));
    renderBento();
    tiles().forEach((el) => {
      const was = before.get(el.dataset.id);
      const now = el.getBoundingClientRect();
      const near = was && Math.abs(was.top - now.top) < window.innerHeight;
      if (calm.matches) {
        if (!was) el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200 });
      } else if (near) {
        el.animate([{ transform: `translate(${was.left - now.left}px, ${was.top - now.top}px)` }, { transform: "none" }], { duration: 300, easing: EASE });
      } else {
        el.animate([{ opacity: 0, transform: "scale(0.97)" }, { opacity: 1, transform: "none" }], { duration: 300, easing: EASE });
      }
    });
  }

  // ───────── Bento de projetos
  function renderBento() {
    const t = T().work;
    const c = cats();
    const matches = ordered.filter((p) => active === "all" || p.category === active);
    // Em "Todos", começa só com os destaques; as categorias mostram tudo
    const collapsible = active === "all" && matches.some((p) => !p.highlight);
    const list = (collapsible && !expanded ? matches.filter((p) => p.highlight) : matches).map(tr);
    $("#moreWrap").hidden = !collapsible;
    $("#moreBtn").textContent = expanded ? t.showLess : fill(t.showMore, { n: matches.length - list.length });
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
  let sheetTile = null;
  let closing = false;
  // Estado fechado do painel: reduzido e posicionado sobre o card de origem
  function sheetHidden() {
    if (calm.matches || !sheetTile) return { opacity: 0 };
    const a = sheetTile.getBoundingClientRect();
    const b = sheet.getBoundingClientRect();
    const dx = a.left + a.width / 2 - (b.left + b.width / 2);
    const dy = a.top + a.height / 2 - (b.top + b.height / 2);
    return { opacity: 0, transform: `translate(${dx}px, ${dy}px) scale(${a.width / b.width})` };
  }
  function stopSheetMotion() {
    sheet.getAnimations({ subtree: false }).forEach((x) => x.cancel());
    document.getAnimations().filter((x) => x.effect.pseudoElement === "::backdrop").forEach((x) => x.cancel());
  }
  function showSheet() {
    sheet.showModal();
    sheet.scrollTop = 0;
    sheet.animate([sheetHidden(), { opacity: 1, transform: "none" }], { duration: 320, easing: EASE });
    sheet.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 320, easing: EASE, pseudoElement: "::backdrop" });
  }
  // Volta ao card pelo mesmo caminho, partindo do valor atual na tela (funciona mesmo no meio da abertura)
  function closeSheet() {
    if (closing || !sheet.open) return;
    closing = true;
    const now = getComputedStyle(sheet);
    const from = { opacity: now.opacity, transform: now.transform };
    const backdrop = getComputedStyle(sheet, "::backdrop").opacity;
    const hidden = sheetHidden();
    stopSheetMotion();
    const options = { duration: 200, easing: EASE, fill: "forwards" };
    sheet.animate([{ opacity: backdrop }, { opacity: 0 }], { ...options, pseudoElement: "::backdrop" });
    sheet.animate([from, hidden], options).onfinish = () => sheet.close();
  }
  sheet.addEventListener("close", () => {
    closing = false;
    stopSheetMotion();
    linkProject(null);
  });
  // O projeto aberto fica na URL (?projeto=id), para enviar direto a alguém
  function linkProject(id) {
    const url = new URL(location.href);
    if (id) url.searchParams.set("projeto", id);
    else url.searchParams.delete("projeto");
    history.replaceState(null, "", url);
  }
  function openProject(id, tile) {
    sheetTile = tile;
    linkProject(id);
    const t = T().work;
    const p = tr(P.find((x) => x.id === id));
    const links = [
      p.links.demo && `<a class="btn btn-accent" href="${esc(p.links.demo)}" target="_blank" rel="noopener">${esc(t.demo)}</a>`,
      p.links.repo && `<a class="btn btn-quiet" href="${esc(p.links.repo)}" target="_blank" rel="noopener">${esc(t.repo)}</a>`,
      navigator.clipboard && `<button type="button" class="btn btn-quiet" data-copy aria-live="polite">${esc(t.copyLink)}</button>`,
    ].filter(Boolean);
    const cases = Object.keys(t.caseStudy).filter((k) => p.caseStudy && p.caseStudy[k]);
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
      ${cases.length ? `<div class="case">${cases.map((k) => `<div><h4>${esc(t.caseStudy[k])}</h4><p>${esc(p.caseStudy[k])}</p></div>`).join("")}</div>` : ""}
      <div class="sheet-cols">
        <div><h4>${esc(t.features)}</h4><ul>${p.features.map((f) => `<li>${esc(f)}</li>`).join("")}</ul></div>
        <div><h4>${esc(t.stack)}</h4><div class="chips">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div></div>
      </div>
      ${links.length ? `<div class="actions">${links.join("")}</div>` : ""}`;
    showSheet();
  }
  $("#bento").addEventListener("click", (e) => {
    const tile = e.target.closest(".tile");
    if (tile) openProject(tile.dataset.id, tile);
  });
  // Troca da imagem principal da galeria
  $("#sheetBody").addEventListener("click", (e) => {
    const copy = e.target.closest("[data-copy]");
    if (copy) {
      navigator.clipboard.writeText(location.href).then(() => (copy.textContent = T().work.linkCopied));
      return;
    }
    const b = e.target.closest("[data-shot]");
    if (!b) return;
    const main = $("#galleryMain");
    main.src = b.dataset.shot;
    main.alt = b.getAttribute("aria-label");
    document.querySelectorAll(".thumbs button").forEach((x) => x.setAttribute("aria-pressed", x === b));
  });
  $("#sheetClose").addEventListener("click", closeSheet);
  sheet.addEventListener("click", (e) => e.target === sheet && closeSheet());
  // Esc também anima; se o navegador forçar o fechamento, o evento "close" limpa o estado
  sheet.addEventListener("cancel", (e) => {
    e.preventDefault();
    closeSheet();
  });

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

  const linked = new URLSearchParams(location.search).get("projeto");
  if (P.some((p) => p.id === linked)) openProject(linked, null);
})();
