/* ============================================================
   SVN-LAB — данные лаборатории и логика фильтров портфолио
   Классический скрипт: константы видны в js/main.js.

   Проекты хранятся в data/projects.json и загружаются
   асинхронно через loadProjects() ДО первого рендера.
   ============================================================ */

const IMG = {
  hero: "https://image.qwenlm.ai/generated-images/db473847-5e8b-4ca4-83a8-b4532c8b5f75/_result.png",
  oni: "https://image.qwenlm.ai/generated-images/d29ca867-068c-4136-9665-5f2190381f5b/_result.png",
  circuit: "https://image.qwenlm.ai/generated-images/b5527909-02a0-4873-affa-ab69d0402faf/_result.png",
  blueprint: "https://image.qwenlm.ai/generated-images/1fade3c0-1484-4912-802b-1b70a869cc61/_result.png",
  nebula: "https://image.qwenlm.ai/generated-images/e89a2c04-7d67-4ee8-9024-54724a7fa707/_result.png",
  flame: "https://image.qwenlm.ai/generated-images/383016a2-a0e4-4758-808a-791f59fffcb6/_result.png",
  paint: "https://image.qwenlm.ai/generated-images/cf9ecf0c-22f4-4632-99e7-b0b33f0a1846/_result.png",
  sketch: "https://image.qwenlm.ai/generated-images/24d29cee-4fef-4b1c-a92c-bf5765400167/_result.png",
};

/* статусы: ready = «Готов», forsale = «В продаже», inprogress = «В работе» */
const STATUS_META = {
  forsale: { label: "В продаже", cls: "badge-forsale" },
  ready: { label: "Готов", cls: "badge-ready" },
  inprogress: { label: "В работе", cls: "badge-inprogress" },
};

/* Массив заполняется в loadProjects(); let — чтобы его можно было
   переприсвоить после загрузки. */
let PROJECTS = [];

/* Сюда попадает ошибка загрузки — main.js показывает её на странице. */
let dataError = null;

/* Приводит «сырой» объект из JSON к форме, которую ожидает сайт.
   Прощает отсутствующие необязательные поля и альтернативные ключи
   (cover_image / created_at — из Decap CMS). */
function normalizeProject(raw, i) {
  const status = STATUS_META[raw.status] ? raw.status : "ready";
  return {
    slug: raw.slug || "project-" + (i + 1),
    name: raw.name || "Без названия",
    base: raw.base || "—",
    format: raw.format || "—",
    status: status,
    price: typeof raw.price === "number" ? raw.price : null,
    progress: typeof raw.progress === "number" ? raw.progress : 0,
    description: raw.description || "",
    concept: raw.concept || raw.description || "",
    materials: Array.isArray(raw.materials) ? raw.materials : [],
    hours: typeof raw.hours === "number" ? raw.hours : 0,
    cover: raw.cover || raw.cover_image || "",
    createdAt: raw.createdAt || raw.created_at || new Date().toISOString(),
    featured: !!raw.featured,
    tags: Array.isArray(raw.tags) ? raw.tags : [],
  };
}

/* Асинхронная загрузка: fetch → парсинг JSON → PROJECTS.
   Вызывается в main.js ДО первого рендера (await loadProjects()).
   Таймаут 6 секунд: если сеть легла, сайт всё равно отрисуется
   с блоком ошибки, а не зависнет белым экраном. */
const LOAD_TIMEOUT_MS = 6000;

async function loadProjects() {
  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timer = controller ? setTimeout(function () { controller.abort(); }, LOAD_TIMEOUT_MS) : null;
  try {
    const res = await fetch(PROJECTS_URL, {
      cache: "no-cache",
      signal: controller ? controller.signal : undefined,
    });
    if (!res.ok) throw new Error("HTTP " + res.status + " (" + PROJECTS_URL + ")");

    const data = await res.json();
    /* Принимаем и «голый» массив, и объект вида { "projects": [...] } */
    const list = Array.isArray(data) ? data : data && data.projects;
    if (!Array.isArray(list)) {
      throw new Error("неверная структура JSON: ожидается массив проектов");
    }

    PROJECTS = list.map(normalizeProject);
  } catch (err) {
    if (err && err.name === "AbortError") {
      err = new Error("таймаут загрузки (" + LOAD_TIMEOUT_MS / 1000 + " с)");
    }
    dataError = err;
    PROJECTS = [];
    console.error("[SVN-LAB] Не удалось загрузить " + PROJECTS_URL + ":", err);
    if (location.protocol === "file:") {
      console.info(
        "[SVN-LAB] Сайт открыт через file:// — fetch здесь запрещён браузером. " +
        "Запустите локальный сервер: npx serve . (или python3 -m http.server) " +
        "и откройте http://localhost:3000"
      );
    } else {
      console.info(
        "[SVN-LAB] Проверьте, что файл data/projects.json существует, " +
        "отдан с кодом 200 и содержит валидный JSON."
      );
    }
  } finally {
    if (timer) clearTimeout(timer);
  }
}

const PROCESS_STAGES = [
  {
    id: "defect",
    num: "01",
    title: "Дефектовка",
    lead: "Корпус разбирается до винта.",
    text: "Полная разборка, ревизия каждого элемента: царапины, вмятины, следы коррозии и усталости пластика фиксируются в чек-лист. Снимаются все комплектующие, оценивается геометрия панелей. На этом же этапе определяется, какие техники применимы к конкретному корпусу — роспись, винилография, гравировка или физическая модификация.",
    tools: ["Чек-лист на 40+ пунктов", "Разборка до каркаса", "Фотофиксация", "Оценка применимых техник"],
    metric: "≈ 2 часа",
    img: null,
  },
  {
    id: "prepare",
    num: "02",
    title: "Подготовка",
    lead: "Поверхность готовится к работе.",
    text: "Шлифовка в несколько градаций абразива, обеспыливание и обезжиривание, затем грунт по металлу. Для винилографии поверхность доводится до идеальной гладкости, для росписи — создаётся адгезионный слой, для гравировки — размечаются зоны реза. Подготовка — 60% долговечности результата, поэтому на неё не экономим время.",
    tools: ["Абразивы P400–P1200", "Обезжириватель", "Автомобильный грунт", "Разметка зон под разные техники"],
    metric: "≈ 1 день",
    img: null,
  },
  {
    id: "sketch",
    num: "03",
    title: "Эскиз",
    lead: "Идея превращается в чертёж.",
    text: "Авторский эскиз создаётся с учётом выбранной техники: для росписи — рисунок в масштабе реальных панелей, для винилографии — векторный макет с контурами реза, для декоративных элементов — 3D-модель или технический чертёж. Всё согласовывается с заказчиком до первого физического вмешательства в корпус.",
    tools: ["Карандаш, лайнеры, графический планшет", "Векторные макеты (для винила)", "Масштаб 1:1", "Согласование с заказчиком"],
    metric: "1–3 дня",
    img: { src: IMG.sketch, alt: "Эскизы кастомного корпуса карандашом на бумаге", label: "эскизы в масштабе 1:1" },
  },
  {
    id: "embodiment",
    num: "04",
    title: "Воплощение",
    lead: "Основная работа по корпусу.",
    text: "Техника подбирается под задачу: ручная роспись маркерами и аэрографом, наклейка виниловой графики с точной подгонкой, гравировка роторным инструментом, установка кастомных декоративных элементов. Каждый слой сохнет между проходами; работа идёт по секциям, от общего к частному. Это самая длинная стадия — от 20 до 80 часов чистой работы.",
    tools: ["Маркеры Molotow / Posca, аэрограф", "Виниловая плёнка, плоттерная резка", "Гравёр, насадки, гибкий вал", "Декоративные элементы ручной работы"],
    metric: "20–80 часов",
    img: { src: IMG.paint, alt: "Ручная роспись панели корпуса маркером", label: "роспись: лайнер 0.3 мм" },
  },
  {
    id: "assembly",
    num: "05",
    title: "Сборка и финиш",
    lead: "Финал, который переживёт годы.",
    text: "Защитное покрытие (автомобильный лак для росписи, ламинирование для винила), шлифовка и полировка до нужной степени глянца. Установка всех декоративных элементов, финальная сборка корпуса, проверка креплений и геометрии. Корпус готов к транспортировке и использованию.",
    tools: ["Автомобильный лак 2K / ламинат", "Шлифовка P2000, полировка", "Финальная сборка", "Контроль качества"],
    metric: "≈ 2 дня",
    img: null,
  },
];

const SOCIALS = [
  { id: "tg-channel", label: "Telegram-канал", handle: "@svnintg", url: "https://t.me/svnintg" },
  { id: "tg-dm", label: "Telegram (ЛС)", handle: "@se7ka_svn", url: "https://t.me/se7ka_svn" },
  { id: "instagram", label: "Instagram", handle: "@svn_lab", url: "https://instagram.com/svn_lab" },
  { id: "x", label: "X / Twitter", handle: "@labsvn", url: "https://x.com/labsvn" },
  { id: "youtube", label: "YouTube", handle: "@svn-lab", url: "https://youtube.com/@svn-lab" },
  { id: "tiktok", label: "TikTok", handle: "@se7ka_", url: "https://tiktok.com/@se7ka_" },
  { id: "reddit", label: "Reddit", handle: "u/Firm-Chain-5041", url: "https://reddit.com/user/Firm-Chain-5041" },
];

const EMAIL = "lab@svn-lab.ru";
const TG_MAIN = "https://t.me/se7ka_svn";
const TG_CHANNEL = "https://t.me/svnintg";

const BUDGETS = ["до 10 000 ₽", "10 000 — 20 000 ₽", "20 000 — 30 000 ₽", "30 000 ₽ +"];

/* ---------- хелперы ---------- */

function formatPrice(value) {
  return value.toLocaleString("ru-RU") + " ₽";
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("ru-RU", { year: "numeric", month: "long" });
}

function getBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

function projectIndex(p) {
  return String(PROJECTS.indexOf(p) + 1).padStart(2, "0");
}

/* ---------- фильтры портфолио ---------- */

const FILTERS = [
  { id: "all", label: "Все" },
  { id: "ready", label: "Готов" },
  { id: "forsale", label: "В продаже" },
  { id: "inprogress", label: "В работе" },
];

function countsByStatus() {
  const counts = { all: PROJECTS.length, ready: 0, forsale: 0, inprogress: 0 };
  PROJECTS.forEach((p) => { counts[p.status] += 1; });
  return counts;
}

function applyFilter(status) {
  if (status === "all") return PROJECTS;
  return PROJECTS.filter((p) => p.status === status);
}
