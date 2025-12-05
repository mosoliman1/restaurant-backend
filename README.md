# Restaurant Reservation Backend — Milestone 4

This backend was developed as part of **Milestone 4** for the course project.  
It implements **authentication, user management, restaurants, reservations, and admin features** using **Node.js, Express, and SQLite**.

The backend follows the same folder structure used in the instructor’s template repository.

---

## 📁 Project Structure

controllers/ → Handles request logic for each module
middleware/ → Authentication middleware (JWT cookie validation)
models/ → Database query functions (SQLite)
routes/ → API route definitions
db.js → SQLite setup and tables creation
server.js → Express server entry point
restaurant.db → SQLite database (auto-generated)
.env.example → Environment variable example
.gitignore → Excludes node_modules and .env from Git
package.json → Dependencies and scripts

yaml
Copy code

---

## 🛠 Installation & Setup

### 1. Install Dependencies
npm install

go
Copy code

### 2. Create `.env` File
Create your own `.env` based on `.env.example`:

PORT=3000
JWT_SECRET=your_secret_here

shell
Copy code

### 3. Start the Server
npm start

arduino
Copy code

The server will run at:
http://localhost:3000

yaml
Copy code

---

## 🔑 Authentication Endpoints

POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout

yaml
Copy code

- Uses JWT tokens stored in **HttpOnly cookies**  
- Passwords are hashed using **bcrypt**  
- All authentication attempts are logged (IP, timestamp, user agent)

---

## 👤 User Endpoints

GET /api/users/profile → Get logged-in user info (protected)

yaml
Copy code

---

## 🍽 Restaurant Endpoints

GET /api/restaurants → List all restaurants
GET /api/restaurants/:id → Get restaurant details

yaml
Copy code

---

## 📅 Reservation Endpoints

POST /api/reservations → Create reservation
PUT /api/reservations/:id → Modify reservation
DELETE /api/reservations/:id → Cancel reservation

yaml
Copy code

Reservations include:
- restaurantId  
- userId  
- date  
- time  
- number of guests  

---

## 🛠 Admin Endpoints (Protected)

GET /api/admin/reservations → View all reservations
POST /api/admin/reservations/:id → Accept/Reject reservation
PUT /api/admin/tables → Manage tables
PUT /api/admin/schedule → Manage schedules

yaml
Copy code

Admin routes require admin authorization.

---

## 🗄 Database (SQLite)

Tables included:
- users  
- restaurants  
- reservations  
- tables  
- schedules  
- auth_logs  

Database file: `restaurant.db`

---

## ✔ Milestone 4 Requirements Covered

- Authentication logic (Node.js)
- Password hashing (bcrypt)
- Token-based login with HttpOnly + SameSite cookies
- Secure data validation & sanitization
- Authentication event logging
- Full use-case implementation
- Authorization & role checking
- API routes separated into controllers/models/routes

---

