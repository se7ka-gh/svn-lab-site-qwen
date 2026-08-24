# SVN-LAB — сайт лаборатории кастомных корпусов

Статический сайт на чистом **HTML / CSS / vanilla JavaScript**. Без React, без сборщиков:
файлы работают на GitHub Pages сразу после загрузки в репозиторий.

**Домен:** [svn-lab.ru](https://svn-lab.ru)

## Структура

```
├── .github/workflows/deploy.yml   # автодеплой на GitHub Pages
├── admin/                         # Decap CMS (управление проектами)
│   ├── index.html
│   └── config.yml
├── css/
│   └── style.css                  # вся дизайн-система сайта
├── data/
│   └── projects.json              # проекты: загружаются fetch ДО первого рендера
├── js/
│   ├── filters.js                 # загрузка JSON, статусы, соцсети, фильтры
│   └── main.js                    # роутер, рендер страниц, эффекты
├── images/projects/               # фотографии корпусов (добавляются через CMS)
├── projects/                      # *.md файлы проектов (создаёт Decap CMS)
├── public/                        # зеркала js/* и data/* для dist-сборки (vite)
├── index.html                     # единая точка входа
├── CNAME                          # svn-lab.ru
└── README.md
```

## Страницы (hash-роутинг)

| URL | Раздел |
| --- | --- |
| `#/` | Главная |
| `#/portfolio` | Портфолио с фильтрами «Все / Готов / В продаже / В работе» |
| `#/portfolio/<slug>` | Детальная страница проекта |
| `#/process` | 5 этапов: Дефектовка → Подготовка → Эскиз → Воплощение → Сборка и финиш |
| `#/order` | Бриф на индивидуальный корпус |

## Запуск локально

Сборка не нужна, достаточно любого статического сервера:

```bash
npx serve .
# или
python3 -m http.server 8080
```

> **Важно:** открывать `index.html` двойным кликом (`file://`) больше нельзя —
> проекты грузятся через `fetch`, а браузер запрещает его для `file://`.
> Только через HTTP-сервер (команды выше) или на GitHub Pages.

## Данные проектов (data/projects.json)

Проекты лежат в `data/projects.json` (массив объектов) и загружаются
асинхронно в `js/filters.js` → `loadProjects()` **до первого рендера**
(`await` в `init()` в `js/main.js`). Путь относительный —
`data/projects.json` без `/` в начале, поэтому работает и на
`svn-lab.ru`, и на `username.github.io/repo`.

Поля объекта: `slug`, `name`, `base`, `format`, `status`
(`ready` / `forsale` / `inprogress`), `price` (для forsale),
`progress` (для inprogress), `description`, `concept`, `materials[]`,
`hours`, `cover` (URL или путь `/images/projects/...`), `createdAt`,
`featured`, `tags[]`. Также принимаются ключи Decap CMS:
`cover_image`, `created_at`.

**Если проекты не отображаются — чек-лист:**

1. Вкладка Network → перезагрузка: `data/projects.json` должен вернуться с кодом **200**.
   Код 404 — файл не загружен в репозиторий или лежит не в корне.
2. Вкладка Console: ошибки парсинга — JSON невалиден (лишняя запятая,
   одинарные кавычки, комментарии). Проверьте на `jsonlint.com`.
3. `CORS policy: No 'Access-Control-Allow-Origin'` — сайт открыт через
   `file://`; запустите `npx serve .`.
4. После правок на GitHub Pages: кэш CDN обновляется до 10 минут —
   проверьте в режиме инкогнито.
5. Правите данные локально — не забудьте синхронизировать зеркало
   `public/data/projects.json` (нужно только для dist-сборки).

## CMS (Decap)

`/admin/` — веб-интерфейс для добавления и правки проектов:
название, статус, цена, описание, галерея (drag-and-drop), дата, «избранное».
Каждое сохранение — автоматический коммит в репозиторий.
Для авторизации через GitHub подключите Netlify Identity + git-gateway
(backend уже настроен в `admin/config.yml`).

## Деплой

1. Загрузите файлы в репозиторий GitHub.
2. Settings → Pages → Source: **GitHub Actions** (workflow уже в `.github/workflows/`).
3. Укажите `CNAME` в настройках Pages (`svn-lab.ru`).

## Контакты и аналитика

- Telegram (ЛС): [@se7ka_svn](https://t.me/se7ka_svn)
- Telegram-канал: [@svnintg](https://t.me/svnintg)
- Подключите Plausible/Umami, добавив один `<script>` в `<head>` файла `index.html`.
