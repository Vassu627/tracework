# Full-Stack Authentication System

A secure, full-stack authentication system built with **Next.js, NestJS, PostgreSQL, and Docker**, implementing custom authentication logic, secure cookie-based sessions, and table-driven unit testing.

This project focuses on **security, manual implementation, and production-style architecture** without relying on third-party authentication libraries.

---

## Tech Stack

### Frontend

- Next.js (App Router)
- TypeScript
- Tailwind CSS

### Backend

- NestJS
- TypeScript
- PostgreSQL
- TypeORM

### Infrastructure

- Docker
- Docker Compose

---

## Key Features

### Secure Authentication

- Custom password hashing using Node.js crypto (PBKDF2)
- Custom access token generation (HMAC-SHA256)
- Refresh token rotation
- No external authentication libraries

### Secure Token Management

- Tokens stored in HttpOnly cookies
- No localStorage or sessionStorage
- Automatic access token refresh

### Custom Validation

- Hand-written validation logic
- Email and password strength checks
- No third-party validation libraries

### Modern UI/UX

- Responsive authentication pages
- Glassmorphism-style design
- Protected dashboard with auto-redirect

### Quality Assurance

- Table-driven unit tests
- Validation and token tests

### Full Containerization

- Backend, frontend, and database in Docker
- Single command to start the system

---

## Authentication Flow

### Signup

POST /auth/signup

- Validates input
- Hashes password
- Stores user

### Signin

POST /auth/signin

- Verifies credentials
- Creates access and refresh tokens
- Stores hashed refresh token
- Sends tokens as HttpOnly cookies

### Access Protected Route

GET /auth/me

- Verifies access token
- Returns user info

### Refresh Token

POST /auth/refresh

- Verifies refresh token
- Rotates refresh token
- Issues new access token

### Logout

POST /auth/logout

- Deletes refresh token
- Clears cookies

---

## Project Structure

auth-system/
├── docker-compose.yml
├── backend/
└── frontend/

---

## Running the Project

### Prerequisites

- Docker
- Docker Compose

### Start the system

\`\`\`bash
docker-compose up --build
\`\`\`

### Access

Frontend: http://localhost:3001  
Backend: http://localhost:3000

---

## Running Tests

\`\`\`bash
cd backend
npm install
npm run test
\`\`\`

---

## API Endpoints

| Method | Endpoint | Description |
| ------ | -------- | ----------- |
