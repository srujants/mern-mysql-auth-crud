# MERN Stack Authentication System with MySQL Database & Dashboard CRUD

## Project Description

This project is a full stack web application where users can register, login, and manage their tasks. After logging in, users can add new items, update them, change their status, and delete them.

The main purpose of this project is to understand how frontend, backend, and database work together in a real-world application.

---

## Technologies Used

* Frontend: React, Tailwind CSS
* Backend: Node.js, Express.js
* Database: MySQL
* Authentication: JWT

---

## MySQL Database Setup

1. Open MySQL and create a database:

```sql
CREATE DATABASE mern_auth_db;
USE mern_auth_db;
```

2. Create required tables:

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100)
);

CREATE TABLE items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  status VARCHAR(20) DEFAULT 'active',
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

---

## Backend Setup

1. Go to backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and add:

```env
PORT=5050
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root123
DB_NAME=mern_auth_db
JWT_SECRET=7d
```

4. Start backend server:

```bash
npm run dev
```

---

## Frontend Setup

1. Go to frontend folder:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend:

```bash
npm run dev
```

---

## How to Run the Project

1. Start backend first
2. Then start frontend
3. Open browser and go to:

```
http://localhost:5173
```

---

## API Endpoints

### Authentication

* POST /api/auth/register → Register new user
* POST /api/auth/login → Login user
* POST /api/auth/reset-password → Reset password

### Items

* GET /api/items → Get all items
* POST /api/items → Add item
* PUT /api/items/:id → Update item
* DELETE /api/items/:id → Delete item

---

## Screenshots

(Add screenshots here)

* Login Page
* Register Page
* Forgot Password Page
* Reset Password Page
* Dashboard Page

---

## Features

* User registration and login
* JWT based authentication
* Add, update, delete items
* Status update (active, pending, completed)
* Simple and clean UI using Tailwind CSS
* Dashboard with tabular format

---

## Author

Srujan T S

---

## Status

Project completed and working properly.
