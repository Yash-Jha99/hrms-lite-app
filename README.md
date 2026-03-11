# HRMS Lite

A lightweight Human Resource Management System for managing employees and attendance.

## Project Overview

HRMS Lite is a full-stack application that lets you:

- **Login** — Token-based admin authentication
- **Dashboard** — Quick links to Employees and Attendance
- **Manage employees** — Add, view, and delete employees with name, email, and department (Marketing, Technology, Finance, Operations).
- **Track attendance** — View and mark daily attendance (present/absent) per employee, with filtering by date.

The app is split into a **Django REST** backend (API + admin) and a **React** frontend with file-based routing and type-safe API integration.

## Tech Stack

### Backend

| Technology                | Purpose                             |
| ------------------------- | ----------------------------------- |
| **Python 3.14**           | Runtime                             |
| **Django 6**              | Web framework                       |
| **Django REST Framework** | REST API                            |
| **PostgreSQL**            | Database (via `dj-database-url`)    |
| **Pipenv**                | Dependency & environment management |

### Frontend

| Technology            | Purpose                      |
| --------------------- | ---------------------------- |
| **React 19**          | UI library                   |
| **TypeScript**        | Type safety                  |
| **Vite 7**            | Build tool & dev server      |
| **TanStack Router**   | File-based routing           |
| **TanStack Query**    | Server state & data fetching |
| **Tailwind CSS 4**    | Styling                      |
| **Radix UI / shadcn** | Accessible components        |

## Prerequisites

- **Node.js** (v18+) and **pnpm**
- **Python 3.14** and **Pipenv**
- **PostgreSQL** (running locally or remote)

## Steps to Run Locally

### 1. Clone and enter the project

```bash
cd hrms-lite
```

### 2. Backend setup

```bash
cd backend
```

Create a `.env` file :

```env
DATABASE_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE_NAME
```

Example for local PostgreSQL:

```env
DATABASE_URL=postgres://postgres:password@127.0.0.1:5432/hrms_lite
```

Install dependencies and run migrations:

```bash
pipenv install
pipenv run migrate
```

Start the Django server (default: http://localhost:8000):

```bash
pipenv run dev
```

Keep this terminal running. The API is available at `http://localhost:8000/` .

### 3. Frontend setup

Open a new terminal and go to the frontend:

```bash
cd frontend
```

Create a `.env` file with the backend API URL:

```env
VITE_API_URL=http://localhost:8000
```

Install dependencies and start the dev server:

```bash
pnpm install
pnpm dev
```

The app will be at **http://localhost:3000**.

### 4. Use the app

- Open http://localhost:3000 in your browser.
- Use **Employees** to add, view, and delete employees.
- Click an employee name to view and mark attendance for a chosen month.

## Project structure

```
hrms-lite/
├── backend/           # Django API
│   ├── employee/      # Employee & attendance app
│   ├── hrms_lite/     # Project settings & URLs
│   └── utils/         # Shared utilities (e.g. exception handler)
├── frontend/          # React + Vite app
│   └── src/
│       ├── components/
│       ├── lib/       # API client, constants
│       ├── routes/    # TanStack Router file-based routes
│       └── services/  # API calls
└── README.md
```

## APIs

| Method | Endpoint                             | Description              |
| ------ | ------------------------------------ | ------------------------ |
| POST   | /auth-token/                         | Get authentication token |
| GET    | /employee/                           | List employees           |
| POST   | employee/                            | Create employee          |
| DELETE | /employee/{id}/                      | Delete employee          |
| GET    | /attendance/?date=YYYY-MM-DD         | Date-wise attendance     |
| GET    | /attendance/?employee_id=EMPLOYEE_ID | Employee-wise attendance |
| POST   | /attendance/                         | Bulk mark attendance     |
