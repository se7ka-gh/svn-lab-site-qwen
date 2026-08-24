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
├── js/
│   ├── filters.js                 # данные: проекты, статусы, соцсети + фильтры
│   └── main.js                    # роутер, рендер страниц, эффекты
├── images/projects/               # фотографии корпусов (добавляются через CMS)
├── projects/                      # *.md файлы проектов (создаёт Decap CMS)
├── public/js/                     # зеркала корневых js/* для dist-сборки (vite)
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
| `#/process` | 5 этапов: Дефектовка → Подготовка → Эскиз → Роспись → Лак |
| `#/order` | Бриф на индивидуальный корпус |

## Запуск локально

Сборка не нужна, достаточно любого статического сервера:

```bash
npx serve .
# или
python3 -m http.server 8080
```

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
