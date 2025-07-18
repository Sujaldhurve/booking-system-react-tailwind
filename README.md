
# 🗓️ Multi-Service Booking System

A full-stack web application to manage online bookings for various service providers like clinics, salons, etc. as part of an internship with Info Bharat Interns.

"This application allows customers to book appointments online through a simple and user-friendly interface. Admins can manage the complete booking system including services, time slots, customer appointments, and generate detailed reports with visual analytics."

---

## ✨ Features

- Customer registration & login
- Business registration & login
- Admin login with credentials
- Role-based dashboards (Customer, Business, Admin)
- Service selection and real-time slot availability
- Appointment booking, cancellation, and tracking
- Admin reporting and time slot management
- 📅 Filter bookings by **Weekly** or **Monthly** 
- 📊 Pie chart visualization

---

## 🛠️ Tech Stack

### Frontend
- React.js
- TailwindCSS
- React Router

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Authentication 
- JWT (Token-Based)

### Others
- Render / Railway (for deployment)

---

## 🧩 Folder Structure

```
booking-system/
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── .env
│   ├── db.js
│   └── index.js
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
│
└── README.md
```

---

## 🔧 Setup Instructions (Local)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/booking-system.git
cd booking-system
```

### 2. Install Dependencies

**Backend:**

```bash
cd backend
npm install
```

**Frontend:**

```bash
cd frontend
npm install
```

### 3. Configure Database

- PostgreSQL setup required
- Create a `.env` file in the `backend/` folder:

```
 PORT=5000
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_NAME=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    JWT_SECRET=your_jwt_secret
```

- Run schema manually or use SQL files to create `booking`, `users`, `services`, and `slots` tables.

### 4. Run the Project

**Backend:**

```bash
cd backend
node index.js
```

**Frontend:**

```bash
cd frontend
npm start
```

---

## 📚 API Endpoints (Sample)

- `GET /api/menu` - Get all menu items
- `POST /api/booking` - Create booking
- `PUT /api/bookings/:id/status` - Update booking status
- `GET /api/slots?serviceId` - Get available slots for a service
- `DELETE /api/bookings/:id` - Cancel booking
- `GET /api/bookings/my` - Get user's bookings
- `GET /api/bookings/summary` - Get booking summary
- `Get /api/admin/bookings` - Get all bookings
- `GET /api/business/dashboard` - Get business dashboard data
- `GET /api/admin/services` - Get all services
- `GET /api/admin/slots` - Get all slots

---

## 🔐 Admin Login Credentials

> Replace this with your real admin if you have registration

- **mail**: `admin@gmail.com`
- **Password**: `admin123`

---

## 🖼️ Screenshots

### 1. Booking Flow
![Booking Flow](./screenshots/booking-step.png)

### 2. Admin Panel
![Admin Dashboard](./screenshots/admin-dashboard.png)

### 3. Business Dashboard
![Business Dashboard](./screenshots/business-dashboard.png)

### 4. Customer Dashboard
![Customer Dashboard](./screenshots/customer-dashboard.png)

---


## 🙌 Acknowledgements

This project was developed as part of an internship with **Info Bharat Interns**.

---


