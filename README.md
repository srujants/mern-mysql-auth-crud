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

* Login Page
<img width="1710" height="1112" alt="login" src="https://github.com/user-attachments/assets/fbc28aa2-866d-4f6a-84fc-d2f4e326a169" />

* Register Page
<img width="1710" height="1112" alt="register" src="https://github.com/user-attachments/assets/b17dae6b-daed-45dd-a5f5-09dea8647e0c" />


* Forgot Password Page
<img width="1710" height="1112" alt="Screenshot 2026-04-07 at 7 41 19 PM" src="https://github.com/user-attachments/assets/c6a34b53-c1fa-4257-bf40-bfc7856c8abe" />

* Reset Password Page
<img width="1710" height="1112" alt="Screenshot 2026-04-07 at 7 41 37 PM" src="https://github.com/user-attachments/assets/7c3a38bd-42fd-4905-a854-902a5af4fab6" />

* Dashboard Page
<img width="1710" height="1112" alt="dashboard" src="https://github.com/user-attachments/assets/c94d95ac-6263-4508-aba0-cfd8eab2067c" />

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
