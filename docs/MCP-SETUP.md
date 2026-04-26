# MCP-SETUP

> Памятка по MCP-серверам для проекта BASE Premier. Что уже подключено, что опционально, как добавить.

---

## Уже подключено

### Project scope (`.mcp.json` в корне репо)

Подтягиваются автоматически при запуске `claude` в этой папке. Источник правды — `.mcp.json`.

| Сервер | Назначение | Требует env |
|---|---|---|
| `context7` | Свежая документация Next.js 15, React 19, Tailwind v4, GSAP, R3F, Framer Motion, Sanity | — |
| `playwright` | E2E-тесты, скриншоты, визуальная регрессия (headless Chromium) | — |
| `sanity` | Управление CMS-контентом (блог, биографии мастеров, услуги) | `SANITY_PROJECT_ID`, `SANITY_DATASET`, `SANITY_AUTH_TOKEN` |

### User scope (глобально, у `islamsabirzyanov@gmail.com`)

Активны во всех проектах. Управляются через `~/.claude.json`.

| Сервер | Назначение |
|---|---|
| `magic` (21st.dev) | Поиск UI-компонентов, генерация по описанию, лого |
| `Google Drive` | Доступ к файлам в Google Drive |
| `ide` | Диагностика и выполнение кода в VS Code |

---

## Опциональные (добавить при необходимости)

Команды для `claude mcp add`. Запускать в терминале **вне** Claude Code.

### Obsidian / локальный vault

```bash
claude mcp add obsidian-fs -s user -- npx -y @modelcontextprotocol/server-filesystem /полный/путь/к/vault
```

Когда нужен: если ведёте базу знаний в Obsidian и хотите, чтобы Claude читал/писал заметки. Путь должен быть абсолютным.

### GitHub

```bash
claude mcp add github -s user -- npx -y @modelcontextprotocol/server-github
```

Требует `GITHUB_PERSONAL_ACCESS_TOKEN` в окружении. Когда нужен: если перейдёте с `docs/ROADMAP.md` на GitHub Issues, или для управления PR/релизами.

### Memory (долгосрочная)

```bash
claude mcp add memory -s user -- npx -y @modelcontextprotocol/server-memory
```

Когда нужен: для долгосрочного knowledge graph между сессиями. **Не дублирует** встроенный auto-memory в `~/.claude/projects/.../memory/` — это другой механизм с graph-структурой. Подключать только если нужны связи между сущностями.

### Lighthouse

```bash
claude mcp add lighthouse -s user -- npx -y lighthouse-mcp-server
```

Когда нужен: вместо ручного `pnpm dlx lighthouse` в команде `/audit-perf`. Сейчас не критично — встроенная команда работает.

### Figma

В `.mcp.json` есть закомментированный конфиг (SSE на `127.0.0.1:3845`). Подключать когда появятся макеты в Figma. Сейчас дизайн идёт напрямую из кода → `docs/BRAND.md` и `docs/DESIGN-BRIEF.md`.

---

## НЕ подключать (уже есть аналог)

| Команда из исходного списка | Почему не нужна |
|---|---|
| `claude mcp add context7 ...` | Уже в `.mcp.json` (project scope) |
| `claude mcp add playwright ...` | Уже в `.mcp.json` (project scope) |
| `claude mcp add 21st-dev ...` | Уже подключён глобально как `magic` |

---

## Команды для управления

```bash
claude mcp list                    # список всех подключённых серверов
claude mcp get <name>              # детали конкретного сервера
claude mcp remove <name> -s user   # удалить (укажи scope: user/project/local)
claude mcp add-from-claude-desktop # импорт из Claude Desktop, если уже настроен там
```

Scope:
- `-s local` — только эта машина (по умолчанию)
- `-s user` — для всех проектов текущего юзера
- `-s project` — пишется в `.mcp.json`, шарится через git

---

## Проверка после подключения

1. Перезапустить Claude Code (`exit` → `claude`).
2. В новой сессии: `claude mcp list` или спросить «какие MCP-серверы активны».
3. Для `context7`: «дай свежие доки по Next.js 15 App Router» — должен ответить через `mcp__plugin_context7_context7__query-docs`.
4. Для `sanity`: убедись что `SANITY_*` переменные в `.env.local` и экспортированы (`source .env.local` или `direnv`).

---

## История изменений

| Дата | Что |
|---|---|
| 2026-04-26 | Создан файл. Зафиксирован статус серверов на момент старта проекта. |
