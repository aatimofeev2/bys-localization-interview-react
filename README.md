# BYS Localization — Interview Task

## Setup

```bash
docker compose up --build
```

| Service      | URL                        |
|--------------|----------------------------|
| Storefront   | http://localhost:3001       |
| Admin Panel  | http://localhost:3000       |
| Python API   | http://localhost:8000       |
| API Docs     | http://localhost:8000/docs  |

---

## Task

BYS needs to show the store interface to users in their language.

The system has three components:

- **Python API** (`/api`) — business logic, store settings
- **Admin Panel** (`/react-admin`) — store management, locale configuration
- **Storefront** (`/storefront`) — customer-facing store

Implement localization across all three.
