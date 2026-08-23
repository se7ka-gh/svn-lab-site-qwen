# Файлы проектов

Каждый проект — отдельный Markdown-файл с front matter (создаётся через Decap CMS):

```markdown
---
name: "COUGAR DUST 2: Knight"
slug: cougar-dust-2-knight
status: forsale
price: 16500
description: "Кастомный корпус с ручной росписью в стиле средневекового рыцаря"
concept: "Вдохновлён эстетикой средневековых доспехов..."
materials:
  - "Перманентные маркеры"
  - "Автомобильный лак"
hours: 46
cover: /images/projects/cougar-cover.jpg
gallery:
  - /images/projects/cougar-1.jpg
tags:
  - рыцарь
created_at: 2026-03-15
featured: true
---
```

Сейчас данные проектов лежат в `js/filters.js` — при подключении CMS
достаточно заменить массив `PROJECTS` на чтение из этих файлов.
