# 📚 Course Management System

A full-stack web application for managing courses. Instructors can create, view, update, and delete courses after authentication.

---

## 🛠 Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **Backend:** Node.js + Express + MongoDB + Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB Atlas / Local MongoDB
- **Styling:** Tailwind CSS

---

## 📁 Project Structure

```

Module7\_Assignment/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── server.ts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── types/
│   │   └── App.tsx
│   └── index.html

````

---

## ⚙️ Backend Setup

1. **Install dependencies**

```bash
cd backend
npm install
````




2. **Build TypeScript and start server**

```bash
npx tsc
node dist/server.js
```

---

## 💻 Frontend Setup

1. **Install frontend dependencies**

```bash
cd frontend
npm install
```

2. **Start the Vite development server**

```bash
npm run dev
```

---

## 🔐 Authentication Routes

| Route                | Method | Description                 |
| -------------------- | ------ | --------------------------- |
| `/api/auth/register` | POST   | Register a new user         |
| `/api/auth/login`    | POST   | Login and receive JWT token |

```json
// Register Payload
{
  "name": "Amrutha",
  "email": "amrutha@example.com",
  "password": "secure123",
  "role": "instructor"
}
```

```json
// Login Payload
{
  "email": "amrutha@example.com",
  "password": "secure123"
}
```

---

## 📘 Course API

| Route              | Method | Access     | Description         |
| ------------------ | ------ | ---------- | ------------------- |
| `/api/courses`     | GET    | Public     | Fetch all courses   |
| `/api/courses`     | POST   | Instructor | Create a new course |
| `/api/courses/:id` | PUT    | Instructor | Edit a course       |
| `/api/courses/:id` | DELETE | Instructor | Delete a course     |

---

## 🔑 How It Works

* Instructors login and receive a **JWT token**
* Token is saved in `localStorage`
* API requests include token in the `Authorization` header
* `authMiddleware` validates token and sets `req.user`

---

## ✅ Features

* Instructor Login & JWT-based authentication
* Create, View, Edit, and Delete courses
* Protected routes using roles
* Clean, responsive Tailwind CSS UI

---

## 📸 UI Preview

| Login Page                      | Dashboard View                          |
| ------------------------------- | --------------------------------------- |
| ![Login](screenshots/login.png) | ![Dashboard](screenshots/dashboard.png) |

---

## ✨ Future Improvements

* Add Student role
* Course Enrollment system
* Pagination & Search
* Profile management

---

## 🧪 Test Credentials

```bash
Email:    amrutha@example.com
Password: secure123
```