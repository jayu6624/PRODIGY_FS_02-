# Employee Management System

A modern full-stack web application for managing employee records with authentication and CRUD operations.

## Features

- 🔐 User Authentication System

  - Secure Register/Login with JWT
  - Protected Routes
  - User-specific data access
  - Session management
  - Password encryption

- 👥 Employee Management

  - Create new employees with unique Employee ID
  - View comprehensive employee list
  - Edit employee information
  - Delete employees
  - Employee data validation

- 🎯 Advanced Features

  - Real-time search functionality
  - Department-wise filtering
  - Sortable employee list
  - Date formatting
  - Salary management

- 📊 User Interface
  - Modern, responsive design
  - Dark theme
  - Gradient accents
  - Toast notifications
  - Loading states
  - Form validation
  - Mobile-friendly layout

## Tech Stack

### Frontend

- React 19.1.0 with Vite
- React Router DOM v7.6.0 for routing
- Axios for API communication
- TailwindCSS for modern UI styling
- React Toastify for notifications
- Context API for state management
- Protected Route implementation
- Form handling and validation

### Backend

- Node.js & Express.js 5.1.0
- MongoDB with Mongoose 8.15.0
- JWT (jsonwebtoken) for authentication
- Bcrypt for password encryption
- Cookie Parser for session handling
- CORS for secure cross-origin requests
- Express Async Handler for error management
- Express Validator for input validation
- Environment variables with dotenv

## Prerequisites

- Node.js (LTS version recommended)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn package manager
- Git

### Installation

1. Clone the repository:

```bash
# Clone the repository
git clone <repository-url>
cd Employee_Management_System
```

2. Backend Setup:

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create and configure environment variables
echo "MONGODB_URL=<your-mongodb-url>
PORT=5000
JWT_SECRET=<your-secret-key>
NODE_ENV=development" > .env
```

3. Frontend Setup:

```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install
```

## Running the Application

### Development Mode

1. Start the Backend:

```powershell
# Navigate to backend directory
Set-Location -Path .\backend

# Run the development server
npm run dev
```

Server will start on `http://localhost:5000`

2. Start the Frontend:

```powershell
# Navigate to frontend directory
Set-Location -Path .\frontend

# Run the development server
npm run dev
```

Frontend will be available on `http://localhost:5173`

### Production Mode

1. Build the Frontend:

```powershell
# Navigate to frontend directory
Set-Location -Path .\frontend

# Create production build
npm run build
```

2. Start the Production Server:

```powershell
# Navigate to backend directory
Set-Location -Path .\backend

# Start server in production mode
$env:NODE_ENV="production"; npm start
```

## Testing the Application

1. User Authentication:

   - Register a new account
   - Login with credentials
   - Try accessing protected routes

2. Employee Management:

   - Create a new employee with unique ID
   - View employee list
   - Edit employee information
   - Delete employee
   - Search and filter employees

3. Error Handling:
   - Try submitting forms with invalid data
   - Test authentication error scenarios
   - Check network error handling

## API Endpoints

### Authentication Endpoints

```http
POST /api/user/register    # Register new user
POST /api/user/login       # User login
GET /api/user/profile     # Get user profile (protected)
```

### Employee Management Endpoints

```http
POST   /api/employee       # Create new employee
GET    /api/employee       # List all employees
GET    /api/employee/:id   # Get single employee
PUT    /api/employee/:id   # Update employee
DELETE /api/employee/:id   # Delete employee
```

All employee endpoints are protected and require JWT authentication.

## Security Features

### Authentication & Authorization

- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes with React Router
- HTTP-only cookies for token storage
- Session management
- Role-based access control

### Data Security

- CORS configuration for API security
- Input validation and sanitization
- XSS protection
- MongoDB injection prevention
- Secure password policies
- Rate limiting support

### Error Handling

- Global error handling middleware
- Async/await error handling
- Input validation errors
- Authentication errors
- Database operation errors
- Network request errors
- Custom error messages
- Client-side validation
- Toast notifications for user feedback

### Data Validation

- Required field validation
- Email format validation
- Phone number format checking
- Salary range validation
- Date format validation
- Unique employee ID verification
- Department validation

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
│   │   ├── employee.controller.js    # Employee CRUD operations
│   │   └── user.controller.js        # User authentication
│   ├── middleware/
│   │   ├── auth.js                   # JWT authentication
│   │   └── error.js                  # Error handling
│   ├── models/
│   │   ├── employee.model.js         # Employee schema
│   │   └── user.model.js            # User schema
│   ├── routes/
│   │   ├── employee.route.js         # Employee routes
│   │   └── routes.js                # User routes
│   ├── services/
│   │   └── user.services.js         # User business logic
│   └── server.js                    # Express app setup
└── frontend/
    ├── src/
    │   ├── components/
    │   │   └── ProtectedRoute.jsx   # Auth protection
    │   ├── context/
    │   │   └── AuthContext.jsx      # Auth state management
    │   ├── pages/
    │   │   ├── CreateEmployee.jsx   # Employee creation
    │   │   ├── EditEmployee.jsx     # Employee editing
    │   │   ├── EmployeeList.jsx     # Employee listing
    │   │   ├── Home.jsx            # Dashboard
    │   │   ├── Login.jsx           # User login
    │   │   └── Register.jsx        # User registration
    │   ├── services/
    │   │   ├── api.js              # Axios setup
    │   │   └── employee.js         # Employee API calls
    │   └── App.jsx                 # Main app component
    ├── public/
    └── index.html
```

## Development Guidelines

### Code Style

- Follow React best practices and hooks guidelines
- Use ES6+ features appropriately
- Maintain consistent code formatting
- Write meaningful comments and documentation
- Follow the established project structure

### Git Workflow

1. Create feature branch from `main`:

```powershell
git checkout -b feature/your-feature-name
```

2. Make changes and commit:

```powershell
git add .
git commit -m "feat: your detailed commit message"
```

3. Push changes:

```powershell
git push origin feature/your-feature-name
```

4. Create Pull Request on GitHub

### Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes following conventional commits
4. Push to your fork
5. Open a Pull Request

## Troubleshooting

### Common Issues

1. MongoDB Connection:

   - Check MongoDB URL in .env
   - Verify MongoDB service is running
   - Check network connectivity

2. Authentication Issues:

   - Verify JWT secret in .env
   - Check token expiration
   - Clear browser cookies/storage

3. Build Issues:
   - Clear node_modules and reinstall
   - Check for version conflicts
   - Verify all dependencies are installed

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- React ecosystem and community
- Node.js and Express.js teams
- MongoDB and Mongoose teams
- TailwindCSS for styling utilities
- All contributors and users

## Contact

For any queries or support, please open an issue in the repository.
