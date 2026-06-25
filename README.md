# Tiny Trello-style Kanban Board

A full-stack Trello-style Kanban board application built with Laravel 12 and React (Vite).

## Features

- **CRUD Boards** — Create, read, update, and delete boards with color customization
- **CRUD Lists** — Organize boards into lists (columns) with inline title editing
- **CRUD Cards** — Add, edit, and delete cards within lists
- **Move Cards** — Drag-and-drop cards between lists using @dnd-kit
- **Edit Card Details** — Modal editor for card title, description, due date, tags, and members
- **Tags/Labels** — Color-coded tags with create-on-the-fly support
- **Assign Members** — Assign users to cards with avatar display
- **Due Dates with Overdue Highlighting** — Date picker with red highlighting for overdue cards

## Tech Stack

### Backend
- **Laravel 12** — PHP 8.2+
- **SQLite** — Lightweight file-based database
- **RESTful API** — JSON API with proper resource routes

### Frontend
- **React 18** with **Vite 5**
- **@dnd-kit** — Drag-and-drop library
- **Tailwind CSS 4** — Utility-first CSS framework
- **Axios** — HTTP client
- **React Router** — Client-side routing

## Project Structure

```
kanban/
├── app/
│   ├── Http/Controllers/Api/
│   │   ├── BoardController.php
│   │   ├── ListController.php
│   │   ├── CardController.php
│   │   ├── TagController.php
│   │   ├── MemberController.php
│   │   └── UserController.php
│   └── Models/
│       ├── Board.php
│       ├── ListModel.php
│       ├── Card.php
│       ├── Tag.php
│       └── User.php
├── database/
│   ├── migrations/
│   └── seeders/
│       └── DatabaseSeeder.php
├── routes/
│   └── api.php
├── bootstrap/
│   └── app.php
├── client/                    # React Frontend
│   ├── src/
│   │   ├── api/              # API service layer
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── vite.config.js
└── .env.example
```

## Getting Started

### Prerequisites

- PHP 8.2+ (XAMPP recommended on Windows)
- Composer
- Node.js 18+ and npm

### Installation

1. **Clone the repository**
   ```bash
   cd C:\Users\lenovo
   # The project is already in kanban/ directory
   ```

2. **Install PHP dependencies**
   ```bash
   cd kanban
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   cd client
   npm install
   ```

4. **Set up the database**
   ```bash
   cd ..
   touch database/database.sqlite
   cp .env.example .env
   php artisan key:generate
   php artisan migrate:fresh --seed
   ```

### Running the Application

1. **Start the Laravel backend** (from the `kanban/` directory)
   ```bash
   php artisan serve --host=0.0.0.0 --port=8000
   ```

2. **Start the React frontend** (from the `kanban/client/` directory)
   ```bash
   cd client
   npm run dev
   ```

3. **Access the application**
   - Frontend: http://localhost:5173
   - API: http://localhost:8000/api

### Seeded Data

The database seeder creates:
- **4 users**: Alice Johnson, Bob Smith, Carol White, Dave Brown
- **5 tags**: Bug (red), Feature (blue), Enhancement (green), Urgent (amber), Design (purple)
- **1 demo board** "Project Alpha" with 3 lists ("To Do", "In Progress", "Done") and 4 sample cards with assigned tags, members, and due dates (including one overdue card for testing)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/boards | List all boards |
| POST | /api/boards | Create a board |
| GET | /api/boards/{board} | Get board with lists, cards, tags, members |
| PATCH | /api/boards/{board} | Update a board |
| DELETE | /api/boards/{board} | Delete a board |
| POST | /api/boards/{board}/lists | Create a list |
| PATCH | /api/lists/{list} | Update a list |
| DELETE | /api/lists/{list} | Delete a list |
| POST | /api/lists/{list}/cards | Create a card |
| PATCH | /api/cards/{card} | Update a card |
| DELETE | /api/cards/{card} | Delete a card |
| POST | /api/cards/{card}/move | Move card to another list |
| POST | /api/cards/{card}/sync-tags | Sync card tags |
| POST | /api/cards/{card}/sync-members | Sync card members |
| GET/POST/DELETE | /api/tags | Tag CRUD |
| GET | /api/users | List all users |

## Known Limitations

1. **API route resolution** — Some environments may have issues with Laravel's `artisan serve` routing `/{id}` patterns. If `/api/boards/1` returns HTML instead of JSON, try running via Laravel Valet or Apache/Nginx, or ensure `Accept: application/json` header is sent.

2. **Drag-and-drop** — The @dnd-kit library is installed and wired up, but full drag-and-drop card movement between lists requires the backend to be running and the API responding correctly to the `/api/cards/{card}/move` endpoint.

3. **Tag/Member sync** — The CardModal UI supports toggling tags and members, and calls the sync endpoints. Ensure the backend API is running for this to work.

4. **Inline list title editing** — Double-click a list title to edit it. Press Enter to save, Escape to cancel. Requires the PATCH `/api/lists/{list}` endpoint to be accessible.

5. **Authentication** — No authentication system is implemented. All operations are unauthenticated.

## License

MIT
