

# Doctor Appointment Booking System

A full-stack web application for booking doctor appointments, featuring user and admin dashboards, secure authentication, and real-time scheduling. Built with React.js, Node.js, Express, and MongoDB.

## Features

- **User Registration & Login**: Secure authentication using JWT and bcrypt.
- **Browse Doctors**: Filter doctors by specialty and view detailed profiles.
- **Book Appointments**: Select date and time slots, with real-time conflict prevention.
- **User Dashboard**: Manage profile and view appointment history.
- **Admin Panel**: Manage doctors, view all appointments, and update statuses.
- **Role-Based Access Control**: Protected routes for users and admins.
- **Responsive Design**: Mobile-friendly UI with Tailwind CSS.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS, React Router DOM, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Other Tools**: ESLint, PostCSS, Autoprefixer

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/doctor-appointment.git
   cd doctor-appointment/doctor-appointment
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../
   npm install
   ```

4. **Set up environment variables:**

   Create a `.env` file in `backend/` with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

5. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server:**
   ```bash
   cd ..
   npm run dev
   ```

7. **Access the app:**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## Folder Structure

```
doctor-appointment/
  backend/
    models/
    routes/
    middleware/
    server.js
    ...
  src/
    components/
    pages/
    context/
    App.jsx
    ...
  public/
  ...
```

## Screenshots

*(Add screenshots of the UI here if available)*

## License

This project is licensed under the MIT License.

---

**Feel free to customize the repository URL, add screenshots, or expand on any section as needed!**
