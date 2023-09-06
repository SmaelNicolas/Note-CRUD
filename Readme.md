# Notes App

App to create notes. Once created, notes can be edited, archived or deleted.

## Author

[Smael Nicolas](https://github.com/SmaelNicolas)

## Table of Contents

-   [Frontend Technologies](#frontend-technologies)
-   [Backend Technologies](#backend-technologies)
-   [Docker Configuration](#docker-configuration)
-   [Installation](#installation)

## Frontend Technologies

-   **Frontend Framework:** React (^18.2.0)
-   **React DOM:** React DOM (^18.2.0)
-   **React Icons:** React Icons (^4.10.1)
-   **React Router DOM:** React Router DOM (^6.15.0)

## Backend Technologies

-   **Prisma:** Prisma (^5.2.0)
-   **ts-node:** ts-node (^10.9.1)
-   **TypeScript:** TypeScript (^5.2.2)
-   **Prisma Client:** Prisma Client (^5.2.0)
-   **CORS:** CORS (^2.8.5)
-   **Express:** Express (^4.18.2)

## Docker Configuration

Docker configuration used in the project:

```yaml
version: "3.8"
services:
    postgres:
        image: postgres:14.1-alpine
        restart: always
        environment:
            - POSTGRES_USER=root
            - POSTGRES_PASSWORD=root
        volumes:
            - postgres:/var/lib/postgresql/data
        ports:
            - "5432:5432"
volumes:
    postgres:
```

## Installation

```bash
# clone this proyect
git clone https://github.com/SmaelNicolas/Note-CRUD.git
```

```bash
# Enter to /backend folder
githubSmaelNicolas-ensolvers-challenge\backend
```

```bash
Create .env file
```

```bash
 # Add DATABASE_URL to use the hosted backend
 DATABASE_URL="postgres://postgres:inHUVlAwB2GEdDcn@db.xfbldnmrrttkdgqnshbp.supabase.co:6543/postgres"
```

```bash
 # In case Supabase don't work, can use this one
DATABASE_URL="postgres://smaelnico:GfHjY0XfCgSYr4F3JwjUthxPP9vaQ3HB@dpg-cjofa83gl9oc73fjlnug-a.oregon-postgres.render.com/notes_crud"
```

```bash
# Go back to root folder
```

```bash
# USe to install dependencies on root
npm install
```

```bash
 #use to install dependencies in /backend and initialize it and install dependencies in /frontend and initialize it
npm run app
```

```bash
Open url
```
