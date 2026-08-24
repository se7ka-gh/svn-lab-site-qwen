/* ============================================================
   SVN-LAB — ядро сайта: роутер, рендер страниц, эффекты
   Чистый ES6+, без зависимостей.

   ВНИМАНИЕ: это сборочная копия корневого js/main.js
   (нужна для dist-сборки). Правьте корневой файл и
   синхронизируйте эту копию.
   ============================================================ */

/* Данные (IMG, PROJECTS, PROCESS_STAGES, SOCIALS, FILTERS, хелперы)
   объявлены в js/filters.js и подключаются раньше этого файла. */

/* ---------- утилиты ---------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const smoothScrollTop = () =>
  window.scrollTo({ top: 0, behavior: prefersReduced() ? "auto" : "smooth" });

/* ---------- инлайн-иконки ---------- */

const IC = {
  arrow: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  plus: '<svg class="i-plus" viewBox="0 0 12 12" aria-hidden="true"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.4"/></svg>',
  tg: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M21.5 4.6 18.4 19c-.2.9-.8 1.1-1.6.7l-4.5-3.3-2.2 2.1c-.2.2-.5.5-.9.5l.3-4.6L17.9 7c.4-.3-.1-.5-.6-.2L7 13.4l-4.4-1.4c-1-.3-1-1 .2-1.4l17.2-6.6c.8-.3 1.5.2 1.5 1.1Z" fill="currentColor"/></svg>',
  mail: '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="3" y="5.5" width="18" height="13" rx="1.5"/><path d="m3.5 7 8.5 6 8.5-6"/></svg>',
};

/* ---------- типовые фрагменты ---------- */

const corners = (tone = "") =>
  `<span class="corners ${tone}" aria-hidden="true"><i></i><i></i><i></i><i></i></span>`;

const badge = (status, progress) => {
  const meta = STATUS_META[status];
  const bar =
    status === "inprogress" && progress
      ? `<span class="progress-mini" aria-hidden="true"><b style="width:${progress}%"></b></span>`
      : "";
  return `<span class="badge ${meta.cls}">${meta.label}${bar}</span>`;
};

const marquee = (items) => {
  const chunk = (hidden) =>
    `<div class="marquee-chunk"${hidden ? ' aria-hidden="true"' : ""}>` +
    items.map((t) => `<span>${esc(t)}</span><i></i>`).join("") +
    `</div>`;
  return `<div class="marquee" role="presentation"><div class="marquee-track">${chunk(false)}${chunk(true)}</div></div>`;
};

const secHead = (index, label, title, rightHtml = "") => `
  <div class="sec-head reveal">
    <div>
      <p class="mono-tag"><span class="acc">[ ${index} ]</span> ${esc(label)}</p>
      <h2 class="sec-title">${esc(title)}</h2>
    </div>
    ${rightHtml}
  </div>`;

/* ---------- карточка проекта ---------- */

function projectCard(p, delay = 0) {
  const price =
    p.status === "forsale" && p.price
      ? `<span class="card-price">${formatPrice(p.price)}</span>`
      : `<span class="card-price" style="color:var(--dim)">1/1</span>`;
  return `
  <a class="card reveal" style="--d:${delay}ms" href="#/portfolio/${p.slug}" aria-label="${esc(p.name)} — открыть проект">
    <div class="card-media">
      ${badge(p.status, p.progress)}
      <img src="${p.cover}" alt="Кастомный корпус ${esc(p.name)}" loading="lazy" />
      <span class="card-idx">UNIT_${projectIndex(p)}</span>
    </div>
    <div class="card-body">
      <p class="card-meta">${esc(p.base)} · ${esc(p.format)}</p>
      <h3 class="card-name">${esc(p.name)}</h3>
      <p class="card-desc">${esc(p.description)}</p>
      <div class="card-foot">
        ${price}
        <span class="card-link">Смотреть ${IC.arrow}</span>
      </div>
    </div>
  </a>`;
}

/* ============================================================
   СТРАНИЦА: ГЛАВНАЯ
   ============================================================ */

function pageHome() {
  const feats = PROJECTS.filter((p) => p.featured);

  document.title = "SVN-LAB — Лаборатория кастомных корпусов | svn-lab.ru";

  const hero = `
  <section class="hero">
    <div class="grid-fade" aria-hidden="true"></div>
    <p class="vertical-note hero-geo" aria-hidden="true">55.7558° N — 37.6173° E // MSK LAB</p>

    <div class="container hero-grid">
      <div class="hero-left">
        <p class="mono-tag reveal">
          <span class="acc">[ SYS.START ]</span> Лаборатория кастомных корпусов — est. 2024
          <span class="cursor-blink" aria-hidden="true">▌</span>
        </p>

        <h1 class="hero-title">
          <span class="big" data-scramble>SVN—LAB</span>
          <span class="sub" data-scramble data-delay="450">КАСТОМНЫЕ КОРПУСА</span>
        </h1>

        <p class="hero-sub reveal" style="--d:.15s">
          Уникальные компьютерные корпуса. <strong>Ручная работа.</strong>
          Тираж <span class="tir">1/1</span> — от дефектовки серийной базы до авторской росписи
          и автомобильного лака.
        </p>

        <div class="hero-ctas reveal" style="--d:.25s">
          <a class="btn btn-ember" href="#/portfolio">Смотреть работы <span class="btn-arrow">${IC.arrow}</span></a>
          <a class="btn btn-ghost" href="#/order">Заказать проект</a>
        </div>

        <dl class="data-strip reveal" style="--d:.35s">
          ${[
            ["Тираж", "1:1"],
            ["Роспись", "Вручную"],
            ["Лак", "3 слоя"],
            ["Очередь", "2 места"],
          ]
            .map(
              ([k, v]) => `
              <div class="data-cell"><dt>${k}</dt><dd>${v}</dd></div>`
            )
            .join("")}
        </dl>
      </div>

      <div class="hero-right">
        <div class="hero-object reveal r-right" style="--d:.2s">
          <div class="object-frame">
            ${corners()}
            <div class="object-media">
              <img src="${IMG.hero}" alt="Кастомный корпус COUGAR DUST 2: Knight с ручной росписью" />
              <div class="scanline" aria-hidden="true"></div>
            </div>
            <span class="object-tag">UNIT_01 / KNIGHT</span>
            <span class="object-cross" aria-hidden="true"></span>
            <p class="vertical-note hero-side" aria-hidden="true">Cougar Dust 2 — ручная роспись</p>
          </div>
          <div class="object-caption">
            <span>fig. 01 — объект в продаже</span>
            <span class="price">${formatPrice(16500)}</span>
          </div>
          <div class="rot-badge" aria-hidden="true">
            <svg class="ring" viewBox="0 0 100 100">
              <defs><path id="badge-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs>
              <circle class="ring-bg" cx="50" cy="50" r="49"/>
              <circle class="ring-line" cx="50" cy="50" r="49"/>
              <text><textPath href="#badge-circle">РУЧНАЯ РАБОТА • ТИРАЖ 1/1 • SVN-LAB •</textPath></text>
            </svg>
            <span class="ring-core"></span>
          </div>
        </div>
      </div>
    </div>

    <div class="container scroll-hint" aria-hidden="true">
      <span>Scroll</span>
      <span class="scroll-dash"><b></b></span>
    </div>
  </section>`;

  const about = `
  <section class="section">
    <div class="container section-pad">
      ${secHead("01", "О лаборатории", "Железо как холст")}
      <div class="about-grid">
        <div class="about-left">
          <p class="about-text reveal">
            SVN-LAB — независимая лаборатория кастомных компьютерных корпусов. Мы не собираем ПК
            и не продаём железо: мы берём серийный корпус и превращаем его в единственный экземпляр —
            с авторским эскизом, ручной росписью по металлу и финишем автомобильным лаком.
          </p>
          <p class="about-text reveal" style="--d:.1s">
            Никаких плёнок и печати — только маркер, кисть и аэрограф. Каждый проект документируется
            от первого винта до полировки и выходит из лаборатории под номером.
          </p>
          <p class="about-channel reveal" style="--d:.2s">
            ${IC.plus}
            <span>подписаться на процесс:
              <a href="${TG_CHANNEL}" target="_blank" rel="noopener noreferrer">t.me/svnintg</a>
            </span>
          </p>
        </div>
        <div class="about-right">
          <p class="about-statement reveal" style="--d:.1s">
            Дефектовка <span class="a-e">→</span> подготовка <span class="a-e">→</span>
            эскиз <span class="a-e">→</span> роспись <span class="a-e">→</span> лак.
            Пять этапов, <span class="a-v">один экземпляр</span>, ноль компромиссов.
          </p>
          <div class="stat-grid reveal" style="--d:.2s">
            ${[
              [23, "проекта в архиве лаборатории", ""],
              [60, "часов росписи — рекорд корпуса", ""],
              [3, "слоя автомобильного лака", "×"],
              [1, "экземпляр — тираж каждого проекта", "/1"],
            ]
              .map(
                ([n, label, suf]) => `
                <div class="stat-cell">
                  <p class="stat-num"><span data-count="${n}">0</span><em>${suf}</em></p>
                  <p class="stat-label">${label}</p>
                  <span class="stat-line" aria-hidden="true"></span>
                </div>`
              )
              .join("")}
          </div>
        </div>
      </div>
    </div>
  </section>`;

  const featured = `
  <section class="section section-alt">
    <div class="container section-pad">
      ${secHead(
        "02",
        "Избранные работы",
        "Из архива лаборатории",
        `<a class="btn btn-ghost" href="#/portfolio">Все объекты</a>`
      )}
      <div class="cards-grid zig">
        ${feats.map((p, i) => projectCard(p, (i % 2) * 110)).join("")}
      </div>
    </div>
  </section>`;

  const process = `
  <section class="section">
    <div class="container section-pad">
      ${secHead(
        "03",
        "Процесс",
        "Пять этапов до готового корпуса",
        `<a class="btn btn-ghost" href="#/process">Как это устроено</a>`
      )}
      <div class="stage-rows">
        ${PROCESS_STAGES.map(
          (s, i) => `
          <a class="stage-row reveal" style="--d:${i * 60}ms" href="#/process">
            <span class="stage-num">${s.num}</span>
            <span class="stage-title">${s.title}</span>
            <span class="stage-lead">${s.lead}</span>
            <span class="stage-metric">${s.metric}</span>
            <span class="stage-arrow">${IC.arrow}</span>
          </a>`
        ).join("")}
      </div>
    </div>
  </section>`;

  const cta = `
  <section class="section cta-section">
    <span class="cta-ghost" aria-hidden="true">1/1</span>
    <div class="container section-pad">
      <div class="cta-inner">
        <p class="mono-tag reveal"><span class="acc">[ 04 ]</span> Свободная очередь — 2 слота</p>
        <h2 class="cta-title reveal" style="--d:.08s">Есть идея? <span class="a-e">Превратим</span> в корпус.</h2>
        <p class="cta-text reveal" style="--d:.16s">
          Расскажите о персонаже, стиле или отсылке — лаборатория соберёт эскиз под ваш корпус
          и посчитает сроки. Первый ответ обычно в течение дня.
        </p>
        <div class="cta-actions reveal" style="--d:.24s">
          <a class="btn btn-ember" href="${TG_MAIN}" target="_blank" rel="noopener noreferrer">${IC.tg} Написать в Telegram</a>
          <a class="btn btn-ghost" href="#/order">Заполнить бриф</a>
        </div>
      </div>
    </div>
  </section>`;

  return (
    hero +
    marquee([
      "Ручная работа",
      "Тираж 1/1",
      "Маркеры · кисть · аэрограф",
      "Автомобильный лак",
      "Кастомные корпуса",
      "svn-lab.ru",
    ]) +
    about +
    featured +
    process +
    cta
  );
}

/* ============================================================
   СТРАНИЦА: ПОРТФОЛИО
   ============================================================ */

function pagePortfolio() {
  document.title = "Портфолио — SVN-LAB | svn-lab.ru";

  const head = `
  <section class="page-head">
    <div class="grid-fade" aria-hidden="true"></div>
    <div class="container page-head-inner">
      <p class="mono-tag reveal"><span class="acc">[ 02 ]</span> Архив объектов / 2024—2026</p>
      <h1 class="page-title" data-scramble>ПОРТФОЛИО</h1>
      <p class="page-lead reveal" style="--d:.15s">
        Каждый корпус — единственный экземпляр с собственным номером. Статусы:
        <span class="a-v">готов</span> — в коллекции лаборатории,
        <span class="a-e">в продаже</span> — можно забрать,
        <strong>в работе</strong> — прямо сейчас на верстаке.
      </p>
    </div>
  </section>`;

  const counts = countsByStatus();
  const filters = `
  <div class="filters-bar">
    <div class="container filters-row" role="group" aria-label="Фильтр проектов по статусу">
      <span class="filters-label">Фильтр:</span>
      ${FILTERS.map(
        (f, i) => `
        <button class="f-btn${i === 0 ? " active" : ""}" data-filter="${f.id}" aria-pressed="${i === 0}">
          ${f.label}<b>${counts[f.id]}</b>
        </button>`
      ).join("")}
      <span class="filters-count" id="filters-count">показано: ${PROJECTS.length} / ${PROJECTS.length}</span>
    </div>
  </div>`;

  const grid = `
  <section>
    <div class="container portfolio-pad">
      <div class="cards-grid cols-3" id="portfolio-grid">
        ${PROJECTS.map((p, i) => projectCard(p, (i % 3) * 90)).join("")}
      </div>
    </div>
  </section>`;

  const bottom = `
  <section class="pf-bottom">
    <div class="container pf-bottom-grid">
      <div class="reveal">
        <div class="pf-panel">
          ${corners("c-volt")}
          <p class="mono-tag">[ Запрос ]</p>
          <h2>Нужен корпус в похожем стиле?</h2>
          <p>
            Любой проект из архива можно развить в индивидуальную версию: другая база, палитра,
            персонаж или отсылка. Опишите идею — вернёмся с эскизом и сметой.
          </p>
        </div>
      </div>
      <div class="pf-actions reveal" style="--d:.12s">
        <div class="btns">
          <a class="btn btn-ember" href="#/order">Заказать индивидуальный</a>
          <a class="btn btn-ghost" href="#/process">Как создаются корпуса</a>
        </div>
        <div class="pf-note">
          ${badge("forsale")}
          <span>— значит можно забрать сегодня</span>
        </div>
      </div>
    </div>
  </section>`;

  return head + filters + grid + bottom;
}

function bindPortfolio() {
  const grid = $("#portfolio-grid");
  const countEl = $("#filters-count");
  if (!grid) return;

  $$(".f-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const status = btn.dataset.filter;
      $$(".f-btn").forEach((b) => {
        const on = b === btn;
        b.classList.toggle("active", on);
        b.setAttribute("aria-pressed", String(on));
      });
      const list = applyFilter(status);
      grid.innerHTML = list.map((p, i) => projectCard(p, (i % 3) * 70)).join("");
      countEl.textContent = `показано: ${list.length} / ${PROJECTS.length}`;
      initReveals(grid);
    });
  });
}

/* ============================================================
   СТРАНИЦА: ПРОЕКТ (детальная)
   ============================================================ */

const GALLERY_EXTRA = {
  "cougar-dust-2-knight": [IMG.paint],
  "cougar-dust-2-oni": [IMG.sketch],
  "deepcool-matrexx-circuit": [IMG.paint],
  "fractal-define-blueprint": [IMG.sketch],
  "zalman-s3-nebula": [IMG.sketch],
  "thermaltake-versa-flame": [IMG.paint],
};

function pageProject(slug) {
  const p = getBySlug(slug);
  if (!p) return pageNotFound(slug);

  document.title = `${p.name} — SVN-LAB | svn-lab.ru`;

  const gallery = [p.cover, ...(GALLERY_EXTRA[p.slug] || [])];
  const idx = PROJECTS.indexOf(p);
  const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const media = `
  <div class="project-media-col">
    <div class="gallery-frame reveal">
      ${corners()}
      <div class="gallery-main">
        <img id="gallery-img" src="${gallery[0]}" alt="${esc(p.name)} — фото 1" />
        <div class="scanline" aria-hidden="true"></div>
        <span class="gallery-counter" id="gallery-counter">01 / ${String(gallery.length).padStart(2, "0")}</span>
        <div class="gallery-mode" role="group" aria-label="Режим просмотра">
          <button class="mode-btn active" data-mode="cover">VIEW</button>
          <button class="mode-btn" data-mode="contain">DETAIL</button>
        </div>
      </div>
    </div>
    <div class="gallery-thumbs">
      ${gallery
        .map(
          (src, i) => `
          <button class="thumb${i === 0 ? " active" : ""}" data-src="${src}" data-i="${i}" aria-label="Фото ${i + 1}">
            <img src="${src}" alt="" loading="lazy" />
          </button>`
        )
        .join("")}
    </div>

    <div class="detail-block reveal">
      <h2>Концепция</h2>
      <p class="detail-text">${esc(p.concept)}</p>
    </div>

    <div class="detail-block reveal">
      <h2>Материалы и техника</h2>
      <ul class="mat-list">
        ${p.materials.map((m) => `<li>${esc(m)}</li>`).join("")}
      </ul>
    </div>

    <div class="detail-block reveal">
      <h2>Теги объекта</h2>
      <div class="tag-row">
        ${p.tags.map((t) => `<span class="tag">#${esc(t)}</span>`).join("")}
      </div>
    </div>
  </div>`;

  const priceRow =
    p.status === "forsale" && p.price
      ? `<dl class="info-price"><dt>Цена объекта</dt><dd>${formatPrice(p.price)}</dd></dl>`
      : "";

  const progressRow =
    p.status === "inprogress"
      ? `<div class="spec-row"><dt>Готовность</dt><dd>${p.progress || 0}% — стадия эскиза</dd></div>`
      : "";

  const info = `
  <div class="project-info-col">
    <div class="info-sticky">
      <div class="info-panel reveal r-right">
        ${corners("c-dim")}
        ${badge(p.status, p.progress)}
        <h1 class="info-title">${esc(p.name)}</h1>
        <p class="info-desc">${esc(p.description)}</p>
        ${priceRow}
        <dl class="spec-table">
          <div class="spec-row"><dt>База</dt><dd>${esc(p.base)}</dd></div>
          <div class="spec-row"><dt>Формат</dt><dd>${esc(p.format)}</dd></div>
          <div class="spec-row"><dt>Номер</dt><dd>UNIT_${projectIndex(p)} · 1/1</dd></div>
          <div class="spec-row"><dt>Роспись</dt><dd>${p.hours} часов вручную</dd></div>
          <div class="spec-row"><dt>Финиш</dt><dd>Автолак + полировка</dd></div>
          <div class="spec-row"><dt>Дата</dt><dd>${formatDate(p.createdAt)}</dd></div>
          ${progressRow}
        </dl>
        <div class="info-actions">
          ${
            p.status === "forsale"
              ? `<a class="btn btn-ember" href="${TG_MAIN}" target="_blank" rel="noopener noreferrer">${IC.tg} Забрать за ${formatPrice(p.price)}</a>`
              : p.status === "inprogress"
              ? `<a class="btn btn-volt" href="${TG_CHANNEL}" target="_blank" rel="noopener noreferrer">${IC.tg} Следить в канале</a>`
              : `<a class="btn btn-volt" href="#/order">${IC.arrow} Заказать похожий</a>`
          }
          <a class="btn btn-ghost" href="#/order">Индивидуальный проект</a>
        </div>
      </div>
    </div>
  </div>`;

  const pn = `
  <nav class="pn-nav" aria-label="Соседние проекты">
    <a class="pn-link" href="#/portfolio/${prev.slug}">
      <span class="pn-hint">← Предыдущий объект</span>
      <span class="pn-name">${esc(prev.name)}</span>
    </a>
    <a class="pn-link" href="#/portfolio/${next.slug}">
      <span class="pn-hint">Следующий объект →</span>
      <span class="pn-name">${esc(next.name)}</span>
    </a>
  </nav>`;

  return `
  <div class="container">
    <p class="crumbs">
      <a href="#/portfolio">Портфолио</a><span class="sep">/</span>
      <span>${esc(p.name)}</span>
    </p>
  </div>
  <div class="container project-grid">${media}${info}</div>
  ${pn}`;
}

function bindProject() {
  const img = $("#gallery-img");
  if (!img) return;
  const counter = $("#gallery-counter");

  $$(".thumb").forEach((t) => {
    t.addEventListener("click", () => {
      $$(".thumb").forEach((x) => x.classList.toggle("active", x === t));
      img.style.opacity = "0";
      setTimeout(() => {
        img.src = t.dataset.src;
        img.alt = `${img.alt.split(" — ")[0]} — фото ${Number(t.dataset.i) + 1}`;
        img.style.opacity = "1";
        counter.textContent = `${String(Number(t.dataset.i) + 1).padStart(2, "0")} / ${String($$(".thumb").length).padStart(2, "0")}`;
      }, prefersReduced() ? 0 : 180);
    });
  });

  $$(".mode-btn").forEach((b) => {
    b.addEventListener("click", () => {
      $$(".mode-btn").forEach((x) => x.classList.toggle("active", x === b));
      img.classList.toggle("contain", b.dataset.mode === "contain");
    });
  });
}

function pageNotFound(slug) {
  document.title = "Объект не найден — SVN-LAB";
  return `
  <section class="page-head">
    <div class="container page-head-inner">
      <p class="mono-tag"><span class="acc">[ 404 ]</span> Объект «${esc(slug)}» не найден</p>
      <h1 class="page-title">ПУСТОЙ ВЕРСТАК</h1>
      <p class="page-lead" style="margin-bottom:26px">Такого корпуса в архиве нет — возможно, ссылка устарела.</p>
      <a class="btn btn-ember" href="#/portfolio">В портфолио ${IC.arrow}</a>
    </div>
  </section>`;
}

/* ============================================================
   СТРАНИЦА: ПРОЦЕСС
   ============================================================ */

function pageProcess() {
  document.title = "Процесс — SVN-LAB | svn-lab.ru";

  const head = `
  <section class="page-head">
    <div class="grid-fade" aria-hidden="true"></div>
    <div class="container page-head-inner">
      <p class="mono-tag reveal"><span class="acc">[ 03 ]</span> Технология лаборатории</p>
      <h1 class="page-title" data-scramble>ПРОЦЕСС</h1>
      <p class="page-lead reveal" style="--d:.15s">
        От серийной коробки до единственного экземпляра — пять обязательных этапов. Пропустить
        нельзя ни один: подготовка и лак отвечают за долговечность, эскиз и роспись — за характер.
        Суммарно корпус проводит в лаборатории от двух недель до полутора месяцев.
      </p>
    </div>
  </section>`;

  const body = `
  <section>
    <div class="container section-pad" style="padding-top:56px">
      <div class="process-grid">
        <aside class="rail" aria-hidden="true">
          <div class="rail-inner">
            <p class="rail-label">Этап</p>
            <p class="rail-num"><span id="rail-idx">01</span><span class="of">/05</span></p>
            <p class="rail-title" id="rail-title">${PROCESS_STAGES[0].title}</p>
            <div class="rail-track">
              <div class="rail-fill" id="rail-fill" style="height:20%"></div>
              <div class="rail-dot" id="rail-dot" style="top:calc(20% - 4px)"></div>
            </div>
            <p class="rail-outro">итог: единственный<br/>экземпляр <span class="a-v">1/1</span></p>
          </div>
        </aside>

        <div class="stages-col">
          ${PROCESS_STAGES.map(
            (s, i) => `
            <article class="stage-card reveal${s.img ? " with-img" : ""}${i === 0 ? " active" : ""}" data-stage="${i}">
              ${corners(i === 0 ? "" : "c-dim")}
              <div class="stage-body">
                <div class="stage-head">
                  <span class="stage-num">${s.num}</span>
                  <h2>${s.title}</h2>
                </div>
                <p class="stage-sub">${s.lead}</p>
                <p class="stage-text">${s.text}</p>
                <div class="stage-tools">${s.tools.map((t) => `<span>${esc(t)}</span>`).join("")}</div>
                <p class="stage-dur">${IC.plus} длительность: <b>${s.metric}</b></p>
              </div>
              ${
                s.img
                  ? `<figure class="stage-img">
                      <img src="${s.img.src}" alt="${esc(s.img.alt)}" loading="lazy" />
                      <figcaption>${s.img.label}</figcaption>
                      ${s.id === "paint" ? '<div class="scanline" aria-hidden="true"></div>' : ""}
                    </figure>`
                  : ""
              }
            </article>`
          ).join("")}

          <div class="timeline-grid reveal">
            ${PROCESS_STAGES.map(
              (s, i) => `
              <div class="timeline-cell">
                <p class="n">${s.num}</p>
                <p class="t">${s.title}</p>
                <p class="m">${s.metric}</p>
                ${i < PROCESS_STAGES.length - 1 ? '<p class="arr" aria-hidden="true">→</p>' : ""}
              </div>`
            ).join("")}
          </div>

          <div class="process-cta reveal">
            <p>
              Хотите наблюдать за своим корпусом в реальном времени? Этапы 03—05 фотографируются
              и публикуются в канале — заказчик видит эскиз до начала росписи и согласовывает каждый шаг.
            </p>
            <div class="btns">
              <a class="btn btn-ember" href="#/order">Заказать корпус</a>
              <a class="btn btn-ghost" href="#/portfolio">Смотреть результаты</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>`;

  return head + body;
}

function bindProcess() {
  const cards = $$(".stage-card");
  const railIdx = $("#rail-idx");
  if (!railIdx) return;
  const railTitle = $("#rail-title");
  const railFill = $("#rail-fill");
  const railDot = $("#rail-dot");

  const setActive = (i) => {
    railIdx.textContent = PROCESS_STAGES[i].num;
    railTitle.textContent = PROCESS_STAGES[i].title;
    const pct = ((i + 1) / PROCESS_STAGES.length) * 100;
    railFill.style.height = pct + "%";
    railDot.style.top = `calc(${pct}% - 4px)`;
    cards.forEach((c, j) => {
      c.classList.toggle("active", j === i);
      const cn = $(".corners", c);
      if (cn) cn.className = `corners ${j === i ? "" : "c-dim"}`;
    });
  };

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(Number(e.target.dataset.stage));
      });
    },
    { rootMargin: "-42% 0px -42% 0px", threshold: 0 }
  );
  cards.forEach((c) => io.observe(c));
  processObservers.push(io);
}

/* ============================================================
   СТРАНИЦА: ЗАКАЗАТЬ
   ============================================================ */

const formState = { name: "", telegram: "", email: "", idea: "", budget: BUDGETS[1] };

function pageOrder() {
  document.title = "Заказать корпус — SVN-LAB | svn-lab.ru";

  const head = `
  <section class="page-head">
    <div class="grid-fade" aria-hidden="true"></div>
    <div class="container page-head-inner">
      <p class="mono-tag reveal"><span class="acc">[ 04 ]</span> Индивидуальные проекты</p>
      <h1 class="page-title" data-scramble>ЗАКАЗАТЬ</h1>
      <p class="page-lead reveal" style="--d:.15s">
        Заполните бриф — вернёмся с эскизом, сметой и местом в очереди. Самый быстрый способ —
        написать напрямую в Telegram, бриф подойдёт для сложных идей.
      </p>
      <p style="margin-top:18px">
        <span class="queue-chip"><span class="pulse-dot" aria-hidden="true"></span> очередь: 2 слота</span>
      </p>
    </div>
  </section>`;

  const formCol = `
  <div class="order-form-col" id="order-form-col">
    <form class="order-form reveal" id="order-form" novalidate>
      ${corners()}
      <p class="mono-tag"><span class="acc">[ Бриф на корпус ]</span></p>
      <h2>Что рисуем?</h2>

      <div class="form-grid">
        <div class="form-field">
          <label for="f-name">Имя</label>
          <input class="field" id="f-name" name="name" type="text" autocomplete="name"
                 placeholder="Как к вам обращаться" value="${esc(formState.name)}" />
        </div>
        <div class="form-field">
          <label for="f-tg">Telegram <span class="req">*</span></label>
          <input class="field" id="f-tg" name="telegram" type="text"
                 placeholder="@username" value="${esc(formState.telegram)}"
                 aria-describedby="e-tg" />
          <p class="field-error" id="e-tg" hidden></p>
        </div>
        <div class="form-field">
          <label for="f-email">Email <span class="opt">(опционально)</span></label>
          <input class="field" id="f-email" name="email" type="email" autocomplete="email"
                 placeholder="you@mail.ru" value="${esc(formState.email)}" />
        </div>
        <div class="form-field">
          <label for="f-budget">Бюджет</label>
          <select class="field" id="f-budget" name="budget">
            ${BUDGETS.map((b) => `<option value="${esc(b)}"${b === formState.budget ? " selected" : ""}>${esc(b)}</option>`).join("")}
          </select>
        </div>
        <div class="form-field span-2">
          <label for="f-idea">Описание идеи <span class="req">*</span></label>
          <textarea class="field" id="f-idea" name="idea" rows="6" aria-describedby="e-idea"
                    placeholder="Персонаж, игра, фильм, стиль… Чем подробнее — тем точнее эскиз. Референсы можно прислать позже в Telegram.">${esc(formState.idea)}</textarea>
          <p class="field-error" id="e-idea" hidden></p>
        </div>
      </div>

      <div class="form-foot">
        <button class="btn btn-ember" type="submit">Сформировать заявку <span class="btn-arrow">${IC.arrow}</span></button>
        <span class="form-note">без спама — заявка уходит напрямую в лабораторию</span>
      </div>
    </form>
  </div>`;

  const aside = `
  <aside class="order-aside-col">
    <div class="aside-stack aside-sticky">
      <div class="aside-card reveal r-right">
        ${corners("c-volt")}
        <p class="aside-title"><span class="acc">[ Быстрая связь ]</span></p>
        <div class="aside-btns">
          <a class="btn btn-ember" href="${TG_MAIN}" target="_blank" rel="noopener noreferrer">${IC.tg} @se7ka_svn — прямой чат</a>
          <a class="btn btn-volt" href="${TG_CHANNEL}" target="_blank" rel="noopener noreferrer">${IC.tg} @svnintg — канал лаборатории</a>
          <a class="btn btn-ghost" href="mailto:${EMAIL}">${IC.mail} ${EMAIL}</a>
        </div>
        <p class="aside-note">ответ: в течение дня · мск<br/>эскиз и смета: бесплатно до брони слота</p>
      </div>

      <div class="aside-card plain reveal r-right" style="--d:.1s">
        <p class="aside-title">[ Как это работает ]</p>
        <ol class="steps-list">
          ${[
            ["01", "Бриф или сообщение", "описываете идею, базу и бюджет"],
            ["02", "Эскиз и смета", "черновик композиции + точная цена"],
            ["03", "Бронь слота", "предоплата 30%, корпус встаёт в очередь"],
            ["04", "Процесс онлайн", "фото этапов в канале, правки до росписи"],
          ]
            .map(
              ([n, t, d]) => `
              <li><span class="n">${n}</span><span><span class="t">${t}</span><span class="d">${d}</span></span></li>`
            )
            .join("")}
        </ol>
      </div>

      <div class="aside-card plain reveal r-right" style="--d:.2s">
        <p class="aside-title">[ Лаборатория в сети ]</p>
        <div class="aside-socials">
          ${SOCIALS.map(
            (s) => `
            <a href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)}">
              ${s.id.startsWith("tg") ? IC.tg : socialSvg(s.id)}
              ${esc(s.handle)}
            </a>`
          ).join("")}
        </div>
      </div>
    </div>
  </aside>`;

  return head + `<div class="container order-grid">${formCol}${aside}</div>`;
}

function socialSvg(id) {
  switch (id) {
    case "instagram":
      return '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>';
    case "x":
      return '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><path d="M4 4l16 16M20 4 4 20"/></svg>';
    case "youtube":
      return '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2.8" y="5.5" width="18.4" height="13" rx="3.4"/><path d="M10.2 9.4v5.2l4.6-2.6z" fill="currentColor" stroke="none"/></svg>';
    case "tiktok":
      return '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M14 4v9.6a3.7 3.7 0 1 1-3.7-3.7"/><path d="M14 4c.4 2.6 2 4.2 4.6 4.5"/></svg>';
    case "reddit":
      return '<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="13.5" r="6.5"/><path d="M12 7V4.2M12 4.2h3.4M18.5 6.8a1.3 1.3 0 1 0 0-2.6 1.3 1.3 0 0 0 0 2.6ZM9.3 12.7h.01M14.7 12.7h.01M9.6 16c1.5 1.1 3.3 1.1 4.8 0"/></svg>';
    default:
      return IC.tg;
  }
}

function buildMessage() {
  return [
    "Заявка с сайта svn-lab.ru",
    `Имя: ${formState.name.trim() || "—"}`,
    `Telegram: ${formState.telegram.trim()}`,
    formState.email.trim() ? `Email: ${formState.email.trim()}` : "",
    `Бюджет: ${formState.budget}`,
    "",
    "Идея:",
    formState.idea.trim(),
  ]
    .filter((l) => l !== "")
    .join("\n");
}

function bindOrder() {
  const form = $("#order-form");
  if (!form) return;

  form.addEventListener("input", (e) => {
    const el = e.target;
    if (el.name && el.name in formState) formState[el.name] = el.value;
    el.classList.remove("err");
    const errEl = el.name === "telegram" ? $("#e-tg") : el.name === "idea" ? $("#e-idea") : null;
    if (errEl) errEl.hidden = true;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    const tg = formState.telegram.trim();
    const eTg = $("#e-tg");
    const tgInput = $("#f-tg");
    if (!tg) {
      eTg.textContent = "// Telegram обязателен — это основной канал связи";
      eTg.hidden = false;
      tgInput.classList.add("err");
      ok = false;
    } else if (!/^@?[a-zA-Z0-9_]{4,}$/.test(tg.replace(/^@/, ""))) {
      eTg.textContent = "// Похоже на некорректный ник: пример @username";
      eTg.hidden = false;
      tgInput.classList.add("err");
      ok = false;
    }

    const eIdea = $("#e-idea");
    const ideaInput = $("#f-idea");
    if (formState.idea.trim().length < 10) {
      eIdea.textContent = "// Расскажите чуть подробнее — хотя бы 10 символов";
      eIdea.hidden = false;
      ideaInput.classList.add("err");
      ok = false;
    }

    if (!ok) return;

    const message = buildMessage();
    const shareUrl = `https://t.me/share/url?url=${encodeURIComponent("https://svn-lab.ru")}&text=${encodeURIComponent(message)}`;

    $("#order-form-col").innerHTML = `
      <div class="order-success reveal is-in">
        ${corners("c-volt")}
        <p class="mono-tag"><span class="acc-v">[ Заявка сформирована ]</span></p>
        <h2>Остался один шаг — отправить</h2>
        <p class="lead">
          Сайт статический, поэтому заявка собрана в готовое сообщение: отправьте его в Telegram
          одним нажатием — лаборатория получит всё сразу.
        </p>
        <pre class="msg-preview" aria-label="Текст заявки">${esc(message)}</pre>
        <div class="success-actions">
          <a class="btn btn-ember" href="${shareUrl}" target="_blank" rel="noopener noreferrer">${IC.tg} Отправить в Telegram</a>
          <button class="btn btn-volt" id="copy-msg" type="button">Скопировать текст</button>
          <a class="btn btn-ghost" href="${TG_MAIN}" target="_blank" rel="noopener noreferrer">Открыть чат @se7ka_svn</a>
        </div>
        <button class="reset-link" id="reset-form" type="button">← заполнить новый бриф</button>
      </div>`;

    $("#copy-msg").addEventListener("click", async (ev) => {
      try {
        await navigator.clipboard.writeText(message);
        ev.currentTarget.textContent = "✓ Скопировано";
        setTimeout(() => { ev.currentTarget.textContent = "Скопировать текст"; }, 2000);
      } catch {
        ev.currentTarget.textContent = "Выделите текст вручную";
      }
    });

    $("#reset-form").addEventListener("click", () => {
      Object.assign(formState, { name: "", telegram: "", email: "", idea: "", budget: BUDGETS[1] });
      render();
    });

    smoothScrollTop();
  });
}

/* ============================================================
   ЭФФЕКТЫ
   ============================================================ */

/* --- интерактивная сетка на canvas --- */

function initCanvasGrid() {
  const canvas = $("#grid-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const reduced = prefersReduced();
  let w = 0, h = 0, raf = 0;
  const mouse = { x: -9999, y: -9999 };
  const CELL = 56, RADIUS = 170;
  let nodes = [];

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round((w * h) / 90000);
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      s: 2 + Math.random() * 3,
      c: Math.random() > 0.5 ? "255,62,0" : "0,217,255",
    }));
    if (reduced) draw(0);
  };

  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = "rgba(255,255,255,0.045)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let x = 0; x <= w; x += CELL) { ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, h); }
    for (let y = 0; y <= h; y += CELL) { ctx.moveTo(0, y + 0.5); ctx.lineTo(w, y + 0.5); }
    ctx.stroke();

    nodes.forEach((n) => {
      if (!reduced) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
      const pulse = reduced ? 0.5 : 0.4 + 0.3 * Math.sin(t / 900 + n.x);
      ctx.fillStyle = `rgba(${n.c},${pulse * 0.5})`;
      ctx.fillRect(n.x, n.y, n.s, n.s);
    });

    if (!reduced && mouse.x > -9000) {
      const gx0 = Math.max(0, Math.floor((mouse.x - RADIUS) / CELL));
      const gx1 = Math.min(Math.ceil(w / CELL), Math.ceil((mouse.x + RADIUS) / CELL));
      const gy0 = Math.max(0, Math.floor((mouse.y - RADIUS) / CELL));
      const gy1 = Math.min(Math.ceil(h / CELL), Math.ceil((mouse.y + RADIUS) / CELL));
      for (let gx = gx0; gx <= gx1; gx++) {
        for (let gy = gy0; gy <= gy1; gy++) {
          const px = gx * CELL, py = gy * CELL;
          const d = Math.hypot(px - mouse.x, py - mouse.y);
          if (d < RADIUS) {
            const k = 1 - d / RADIUS;
            const col = (gx + gy) % 2 === 0 ? "255,62,0" : "0,217,255";
            ctx.strokeStyle = `rgba(${col},${k * 0.5})`;
            ctx.beginPath();
            ctx.moveTo(px - 4, py); ctx.lineTo(px + 4, py);
            ctx.moveTo(px, py - 4); ctx.lineTo(px, py + 4);
            ctx.stroke();
          }
        }
      }
    }
  };

  const loop = (t) => { draw(t); raf = requestAnimationFrame(loop); };
  const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
  const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

  resize();
  window.addEventListener("resize", resize);
  if (!reduced) {
    window.addEventListener("mousemove", onMove, { passive: true });
    /* курсор покидает окно целиком — не путать с mouseout на дочерних элементах */
    document.documentElement.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(loop);
  }
}

/* --- появление при скролле --- */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
);

function initReveals(root = document) {
  $$(".reveal:not(.is-in)", root).forEach((el) => revealObserver.observe(el));
}

/* --- scramble-декодирование заголовков --- */

const SCRAMBLE_CHARS = "█▓▒░<>/\\#%&@01";

function scrambleEl(el) {
  const target = el.dataset.text || el.textContent.trim();
  el.dataset.text = target;
  if (prefersReduced()) { el.textContent = target; return; }

  const delay = Number(el.dataset.delay || 0);
  const duration = 850;
  let start = null;

  const tick = (now) => {
    if (start === null) start = now + delay;
    if (now < start) { requestAnimationFrame(tick); return; }
    const p = Math.min(1, (now - start) / duration);
    const settled = Math.floor(p * target.length);
    let out = "";
    for (let i = 0; i < target.length; i++) {
      const ch = target[i];
      if (i < settled || ch === " " || ch === "—") out += ch;
      else out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
    }
    el.textContent = out;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = target;
  };
  requestAnimationFrame(tick);
}

function initScrambles(root = document) {
  $$("[data-scramble]", root).forEach(scrambleEl);
}

/* --- счётчики --- */

function initCounters(root = document) {
  $$("[data-count]", root).forEach((el) => {
    const target = Number(el.dataset.count);
    if (prefersReduced()) { el.textContent = target; return; }
    const dur = 1100;
    let start = null;
    const tick = (now) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ============================================================
   РОУТЕР
   ============================================================ */

const app = $("#app");
const processObservers = [];

function parseRoute() {
  const hash = location.hash.replace(/^#/, "") || "/";
  const projectMatch = hash.match(/^\/portfolio\/([\w-]+)\/?$/);
  if (projectMatch) return { name: "project", slug: projectMatch[1] };
  if (hash === "/" || hash === "") return { name: "home" };
  if (hash.startsWith("/portfolio")) return { name: "portfolio" };
  if (hash.startsWith("/process")) return { name: "process" };
  if (hash.startsWith("/order")) return { name: "order" };
  return { name: "home" };
}

function updateNav(route) {
  const path =
    route.name === "project" ? "/portfolio" : "/" + (route.name === "home" ? "" : route.name);
  const current = path === "/" ? "/" : path;
  $$(".nav-link[data-route], .mobile-link[data-route]").forEach((a) => {
    a.classList.toggle("active", a.dataset.route === current);
  });
}

function render() {
  processObservers.forEach((io) => io.disconnect());
  processObservers.length = 0;

  const route = parseRoute();
  let html = "";
  switch (route.name) {
    case "home": html = pageHome(); break;
    case "portfolio": html = pagePortfolio(); break;
    case "project": html = pageProject(route.slug); break;
    case "process": html = pageProcess(); break;
    case "order": html = pageOrder(); break;
    default: html = pageHome();
  }

  app.innerHTML = html;
  updateNav(route);

  initReveals(app);
  initScrambles(app);
  initCounters(app);

  if (route.name === "portfolio") bindPortfolio();
  if (route.name === "project") bindProject();
  if (route.name === "process") bindProcess();
  if (route.name === "order") bindOrder();

  window.scrollTo(0, 0);
}

/* ---------- оболочка: меню, «наверх» ---------- */

function initShell() {
  const burger = $("#burger");
  const menu = $("#mobile-menu");

  const closeMenu = () => {
    menu.hidden = true;
    burger.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
    document.body.style.overflow = "";
  };

  burger.addEventListener("click", () => {
    const open = menu.hidden;
    menu.hidden = !open;
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
    document.body.style.overflow = open ? "hidden" : "";
  });

  $$(".mobile-link", menu).forEach((a) => a.addEventListener("click", closeMenu));

  $("#to-top").addEventListener("click", smoothScrollTop);
}

/* ---------- старт ---------- */

initShell();
initCanvasGrid();
render();
window.addEventListener("hashchange", render);
