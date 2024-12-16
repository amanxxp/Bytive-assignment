
# Project Name

## Description
This is a full stack project assignment for Bytive Technologies Private Limited for the role of Software Development Engineering (Web) Internship

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

   or, if you're using yarn:
   ```bash
   yarn install
   ```

---

## Setup Database with Prisma

1. Set up your `.env` file:
   - In the root of your project, create a `.env` file (or update it if it already exists).
   - Add your database connection string (example for PostgreSQL):
     ```bash
     DATABASE_URL="postgresql://user:password@localhost:5432/mydb?schema=public"
     ```
   - Adjust the connection string based on the database you're using.

2. Generate Prisma client:
   ```bash
   npx prisma generate
   ```

3. Run migrations to set up your database schema:
   ```bash
   npx prisma migrate deploy
   ```

   If you need to create a new migration:
   ```bash
   npx prisma migrate dev --name <migration_name>
   ```

---

## Running the Project

1. Run the application:
   ```bash
   npm run dev
   ```

   or with yarn:
   ```bash
   yarn dev
   ```

2. Open your browser and go to `http://localhost:3000` to see the app running.

---

## Additional Commands

- To generate Prisma client after changes:
  ```bash
  npx prisma generate
  ```

- To create a migration:
  ```bash
  npx prisma migrate dev --name <migration_name>
  ```

- To reset the database:
  ```bash
  npx prisma migrate reset
  ```

---


**End of README**
