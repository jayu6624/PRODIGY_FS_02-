# Employee Management System

A full-stack web application for managing employee records with authentication and CRUD operations.

## Features

- 🔐 User Authentication (Register/Login)
- 👥 Employee Management
  - Create new employees
  - View employee list
  - Update employee details
  - Delete employees
- 📊 Department-wise organization
- 🔍 Search and filter capabilities
- 📱 Responsive design

## Tech Stack

### Frontend
- React 19.1.0
- React Router DOM for navigation
- Axios for API requests
- Tailwind CSS for styling
- React Toastify for notifications
- Vite for build tooling

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing
- Cookie Parser for handling cookies
- CORS for cross-origin resource sharing

## Prerequisites

- Node.js (LTS version recommended)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Employee_Management_System
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Set up environment variables:
Create a `.env` file in the backend directory with:
```env
MONGODB_URL=<your-mongodb-url>
PORT=5000
JWT_SECRET=<your-secret-key>
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The server will start on `http://localhost:5000`

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```
The frontend will be available on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - User login
- `GET /api/user/profile` - Get user profile (protected)

### Employee Management
- `POST /api/employee` - Create new employee (protected)
- `GET /api/employee` - Get all employees (protected)
- `PUT /api/employee/:id` - Update employee (protected)
- `DELETE /api/employee/:id` - Delete employee (protected)

## Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected routes
- HTTP-only cookies
- CORS configuration
- Input validation and sanitization

## Error Handling

The application includes comprehensive error handling for:
- Network errors
- Authentication failures
- Database errors
- Input validation errors
- Custom error messages for better user experience

## Frontend Features

- Modern UI with Tailwind CSS
- Responsive design for all devices
- Real-time form validation
- Toast notifications for feedback
- Protected routes with authentication
- Search and filter functionality
- Department-wise categorization

## Project Structure

```
Employee_Management_System/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   └── services/
    ├── public/
    └── index.html
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- React.js team for the amazing frontend library
- Node.js community for the robust backend runtime
- MongoDB team for the flexible database solution
- All contributors and users of this system
