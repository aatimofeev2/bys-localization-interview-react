# BYS Localization — Interview Task

## Setup

```bash
docker compose up --build
```

| Service     | URL                        |
|-------------|----------------------------|
| React Admin | http://localhost:3000       |
| Python API  | http://localhost:8000       |
| API Docs    | http://localhost:8000/docs  |

---

## Task

BYS needs to show the admin interface to users in their language.

The system has two components:

- **Python API** (`/api`) — business logic, store settings
- **React Admin** (`/react-admin`) — store management panel

Implement localization across both.
