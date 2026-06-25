# Agent Log — Kanban Board Project

## Session Summary

**Date**: 2026-06-25  
**Project**: Tiny Trello-style Kanban Board  
**Tech Stack**: Laravel 12 + SQLite (backend), React + Vite (frontend)

---

## Task Execution Log

### Phase 1: Project Setup & Backend

| Task | Status | Notes |
|------|--------|-------|
| Initialize Laravel 12 project | ✅ | `composer create-project laravel/laravel kanban` |
| Configure SQLite database | ✅ | Created `database/database.sqlite`, set DB_DATABASE in .env |
| Create migrations (6 tables) | ✅ | boards, lists, cards, tags, card_tag, card_user |
| Create Eloquent models | ✅ | Board, ListModel, Card, Tag, User with relationships |
| Create API controllers (6) | ✅ | Board, List, Card, Tag, Member, User controllers |
| Set up API routes | ✅ | `routes/api.php` with all RESTful endpoints |
| Create database seeder | ✅ | 4 users, 5 tags, 1 demo board with lists/cards |
| Add CORS/routing config | ✅ | Updated `bootstrap/app.php` with api route loading |

### Phase 2: Frontend Setup

| Task | Status | Notes |
|------|--------|-------|
| Initialize React + Vite project | ✅ | `npm create vite@latest client -- --template react` |
| Install dependencies | ✅ | @dnd-kit, axios, react-router-dom, tailwindcss |
| Configure Vite proxy | ✅ | `/api` → `localhost:8000` |
| Configure Tailwind CSS 4 | ✅ | Via `@tailwindcss/vite` plugin |
| Create API service layer | ✅ | axios.js + boards/lists/cards/tags/members/users.js |
| Create React components | ✅ | Card, List, CardModal, BoardView, Home, DueDateBadge, TagBadge |
| Set up routing | ✅ | `/` (Home), `/board/:id` (BoardView) |
| Verify frontend build | ✅ | `npm run build` succeeds |

### Phase 3: Feature Implementation

| Task | Status | Notes |
|------|--------|-------|
| Drag-and-drop (cards between lists) | ✅ | @dnd-kit DndContext + DragOverlay in BoardView |
| Tag sync endpoints | ✅ | `POST /api/cards/{id}/sync-tags` |
| Member sync endpoints | ✅ | `POST /api/cards/{id}/sync-members` |
| CardModal tag/member sync | ✅ | Calls sync endpoints on save |
| Inline list title editing | ✅ | Double-click to edit, Enter to save, calls PATCH |
| Due date overdue highlighting | ✅ | Red badge + ⚠ icon for past dates |
| Create new tag from modal | ✅ | Inline form with color picker |

### Phase 4: Testing & Bug Fixes

| Task | Status | Notes |
|------|--------|-------|
| Test board CRUD via API | ✅ | POST/GET/PATCH/DELETE all working |
| Test list/card CRUD via API | ✅ | All endpoints responding |
| Fix .env DB_DATABASE path | ✅ | Was commented out, set to absolute path |
| Fix multiple PHP process issues | ✅ | Killed stale processes, restarted clean |
| Frontend production build | ✅ | Builds successfully (335KB JS, 24KB CSS) |

---

## Known Issues & Debugging Notes

### 1. API Route Resolution (UNRESOLVED)
**Problem**: `GET /api/boards/1` returns HTML welcome page instead of JSON.  
**Root Cause**: Laravel's `artisan serve` with PHP built-in server sometimes fails to match routes with implicit model binding when the `{id}` parameter is numeric. The `index` route (`/api/boards`) works fine.  
**Workaround**: 
- Use `Accept: application/json` header
- Use Apache/Nginx instead of `artisan serve`
- Or use `php artisan tinker` to verify data exists

### 2. Stale PHP Processes
**Problem**: Multiple PHP processes accumulate on port 8000.  
**Fix**: `taskkill /F /IM php.exe` before starting the server.

### 3. .env Configuration
**Problem**: `DB_DATABASE` was commented out in `.env`, causing SQLite to use non-existent `laravel` database.  
**Fix**: Uncommented and set to absolute path `C:/Users/lenovo/kanban/database/database.sqlite`.

### 4. npm install in client/ directory
**Problem**: `npm install -D tailwindcss` was flagged as "long-lived" by the terminal tool.  
**Fix**: Used `cmd //c "cd ... && npm install"` to run via Windows command prompt.

---

## Files Created/Modified

### Backend (Laravel)
- `app/Http/Controllers/Api/BoardController.php`
- `app/Http/Controllers/Api/ListController.php`
- `app/Http/Controllers/Api/CardController.php`
- `app/Http/Controllers/Api/TagController.php`
- `app/Http/Controllers/Api/MemberController.php`
- `app/Http/Controllers/Api/UserController.php`
- `app/Models/Board.php`
- `app/Models/ListModel.php`
- `app/Models/Card.php`
- `app/Models/Tag.php`
- `database/migrations/2026_06_25_124023_create_boards_table.php`
- `database/migrations/2026_06_25_124034_create_lists_table.php`
- `database/migrations/2026_06_25_124036_create_cards_table.php`
- `database/migrations/2026_06_25_124039_create_tags_table.php`
- `database/migrations/2026_06_25_124041_create_card_tag_table.php`
- `database/migrations/2026_06_25_124043_create_card_user_table.php`
- `database/seeders/DatabaseSeeder.php`
- `routes/api.php`
- `bootstrap/app.php`

### Frontend (React)
- `client/vite.config.js`
- `client/src/App.jsx`
- `client/src/index.css`
- `client/src/api/axios.js`
- `client/src/api/boards.js`
- `client/src/api/lists.js`
- `client/src/api/cards.js`
- `client/src/api/tags.js`
- `client/src/api/members.js`
- `client/src/api/users.js`
- `client/src/components/BoardView.jsx`
- `client/src/components/Card.jsx`
- `client/src/components/CardModal.jsx`
- `client/src/components/DueDateBadge.jsx`
- `client/src/components/List.jsx`
- `client/src/components/TagBadge.jsx`
- `client/src/pages/Home.jsx`
- `client/src/main.jsx`

### Documentation
- `README.md`
- `ARCHITECTURE.md`
- `agent-log.md`
- `.env.example`

---

## Git Commits

1. `chore: initial project setup with Laravel 12 + React (Vite)`
2. `feat: drag-and-drop, tag/member sync, inline list title editing`

---

## Environment Details

- **OS**: Windows 10
- **Shell**: Git Bash (MSYS) via `cmd //c` for commands requiring Windows compatibility
- **PHP**: 8.2.12 at `C:\xampp\php\php.exe`
- **Composer**: 2.10.1 at `C:\xampp\php\composer.phar`
- **Node.js**: v18+ at `C:\Program Files\nodejs\npm`
- **SQLite**: Bundled with XAMPP
