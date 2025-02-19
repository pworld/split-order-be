# split-order-be


## Getting Started
This application need: https://github.com/pworld/split-order-fe As a Frontend.

## Instalations

### 1.Clone the Repository

```bash
    git clone https://github.com/pworld/split-order-be.git
    cd split-order-be
```

### 2. Install dependencies

```bash
    npm install
    # or
    yarn install
```

### 3.Set up environment variables:
Create a .env file in the root directory and add the following:

```bash
    HOST=http://localhost
    HOST_PORT=3001
    API_TOKEN=

    DB_HOST=localhost
    DB_PORT=3306
    DB_USERNAME=root
    DB_PASSWORD=
    DB_NAME=split-order-db
```

### 4. Database Migrations

Command run migrations
```
npx typeorm-ts-node-commonjs -d src/config/ormconfig.ts migration:run
```

Command run Seed
```
npm run seed
```

### 5.Start the server:

```bash
    npm run dev
```

## Project Structure

```bash
 split-order-be/
 ├── src/
 │   ├── controllers/    # Handles HTTP requests
 │   ├── services/       # Business logic layer
 │   ├── repositories/   # Database queries (repository pattern)
 │   ├── middleware/     # Authentication & other middleware
 │   ├── routes/         # API routes
 │   ├── database/       # Database connection and migrations
 │   ├── utils/          # Utility functions
 │   ├── app.ts          # Express app configuration
 │   ├── server.ts       # Server startup
 ├── tests/              # Unit and integration tests
 ├── .env                # Environment variables
 ├── package.json        # Project dependencies
 ├── README.md           # Documentation
```

## Testing

Run unit tests using Jest:
```bash
    npm run test
```

test coverage using Jest:
```bash
    npm run test:coverage
```

## Authentication Middleware

This application using simple Bearer Token that sent from FE Application through header requests.
The token is stored in .env both BE and FE application.