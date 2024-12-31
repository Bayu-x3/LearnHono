
# Bun + Hono API Starter

A minimal setup for building APIs with **Bun**, **Hono**, and **Prisma ORM**.

---

# CONCLUSION

## Getting Started

### Install Dependencies
```sh
bun install
```

### Run the Development Server
```sh
bun run dev
```

### Open in Browser
Visit [http://localhost:3000](http://localhost:3000) to view your API.

---

## Features

### 1. Initial Setup
- **Initialize Hono**:
  ```sh
  bun create hono bun-hono-api
  ```

### 2. Database Setup (Prisma ORM)
- **Install Prisma**:
  ```sh
  bun add prisma@latest --save-dev
  bunx prisma init
  ```
- **Configure Database**:
  Update your `.env` file with the database URL.

- **Migrate Schema**:
  ```sh
  bunx prisma migrate dev --name {schema_name}
  ```

- **Generate Prisma Client**:
  ```sh
  bun prisma generate
  ```

- **Seeder Setup**:
  ```sh
  bun add prisma @prisma/client
  ```
  Use Prisma Client to seed initial data.

### 3. API Endpoints

#### **Get Posts API**
- Setup:
  - Create routes and controllers.
  - Use Prisma Client (`prisma/client/index.ts`).

#### **Create Post API**
- Setup:
  - Create routes and controllers.
  - Add validation using Zod:
    ```sh
    bun add zod
    ```

---

## Conclusion
This project demonstrates how to quickly scaffold and build a RESTful API using **Hono**, **Bun**, and **Prisma ORM**. With built-in tools for schema migrations, seeding, and validation, this setup provides a solid foundation for scalable API development.

---
