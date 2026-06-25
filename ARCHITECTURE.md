# Architecture Document

## Overview

Tiny Trello-style Kanban Board is a full-stack web application following a client-server architecture with a RESTful API.

## System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend                        │
│                   (Vite + Tailwind)                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │  Home    │ │ BoardView│ │  List    │ │ CardModal │  │
│  │  Page    │ │(DndContext)│ │Component│ │ Component │  │
│  └──────────┘ └──────────┘ └──────────┘ └───────────┘  │
│                          │                               │
│                     Axios HTTP Client                     │
│                          │                               │
└──────────────────────────┼───────────────────────────────┘
                           │ /api/* (JSON)
┌──────────────────────────┼───────────────────────────────┐
│                    Laravel 12 API                         │
│                   (PHP 8.2 + SQLite)                      │
│  ┌──────────────────────────────────────────────────┐    │
│  │              Routes (api.php)                     │    │
│  ├──────────────────────────────────────────────────┤    │
│  │  BoardController  │  ListController  │ CardController│  │
│  │  TagController    │  MemberController│ UserController│  │
│  ├──────────────────────────────────────────────────┤    │
│  │              Eloquent Models                      │    │
│  │  Board → ListModel → Card (with Tag/User pivots) │    │
│  ├──────────────────────────────────────────────────┤    │
│  │              SQLite Database                      │    │
│  └──────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

## Data Model

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   Board     │       │   List      │       │    Card     │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │──┐    │ id          │──┐    │ id          │
│ title       │  └───>│ board_id    │  └───>│ list_id     │
│ slug        │       │ title       │       │ title       │
│ color       │       │ position    │       │ description │
│ created_at  │       │ created_at  │       │ position    │
│ updated_at  │       │ updated_at  │       │ due_date    │
└─────────────┘       └─────────────┘       │ created_at  │
                                            │ updated_at  │
                                            └──────┬──────┘
                                                   │
                    ┌─────────────┐       ┌────────┴────────┐
                    │    Tag      │       │   card_user     │
                    ├─────────────┤       │   (pivot)       │
                    │ id          │       ├─────────────────┤
                    │ name        │       │ card_id         │
                    │ color       │       │ user_id         │
                    │ created_at  │       └────────┬────────┘
                    └──────┬──────┘                │
                           │              ┌────────┴────────┐
                    ┌──────┴──────┐       │     User        │
                    │  card_tag   │       ├─────────────────┤
                    │  (pivot)    │       │ id              │
                    ├─────────────┤       │ name            │
                    │ card_id     │       │ email           │
                    │ tag_id      │       │ password        │
                    └─────────────┘       └─────────────────┘
```

## Key Design Decisions

1. **SQLite for simplicity** — No external database server required. The database file is at `database/database.sqlite`.

2. **API-only architecture** — Laravel serves only as a JSON API. All UI logic is in React.

3. **Implicit model binding** — Routes like `/api/boards/{board}` automatically resolve to the Board model by ID.

4. **Pivot tables for many-to-many** — `card_tag` and `card_user` pivot tables link cards to tags and users.

5. **Position-based ordering** — Lists and cards have a `position` integer field for ordering. New items get `max(position) + 1`.

6. **CORS handling** — The Vite dev server proxies `/api` requests to `localhost:8000`, avoiding CORS issues in development.

## Component Hierarchy

```
App (BrowserRouter)
├── Home (pages/Home.jsx)
│   └── BoardList (inline in Home)
│       └── BoardCard (inline in Home)
└── BoardView (components/BoardView.jsx)
    ├── DndContext (@dnd-kit/core)
    │   └── SortableContext
    │       └── List (components/List.jsx)
    │           └── Card (components/Card.jsx)
    └── CardModal (components/CardModal.jsx)
        ├── DueDateBadge
        ├── TagBadge
        └── MemberSelector
```

## API Request Flow

```
React Component
    ↓
API Service (axios.js)
    ↓  GET/POST/PATCH/DELETE /api/...
Vite Proxy (dev only)
    ↓  /api/* → localhost:8000/api/*
Laravel Router (api.php)
    ↓
Controller Method
    ↓
Eloquent Model + Database
    ↓
JSON Response → React State Update → Re-render
```

## Environment

- **OS**: Windows 10
- **PHP**: 8.2.12 (via XAMPP at `C:\xampp\php\`)
- **Composer**: 2.10.1
- **Node.js**: 18+ (at `C:\Program Files\nodejs\`)
- **Database**: SQLite 3
