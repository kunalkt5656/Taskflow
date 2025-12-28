# 📋 TaskFlow - Task Management Application

<div align="center">

![TaskFlow Banner](https://img.shields.io/badge/TaskFlow-Task%20Manager-9400D3?style=for-the-badge&logo=task&logoColor=white)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react&logoColor=black)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**A modern, full-stack task management application for teams**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [API](#-api-endpoints)

</div>

---

## ✨ Features

### 👤 User Management
- 🔐 Secure authentication with JWT
- 👥 Role-based access (Admin & Member)
- 📸 Profile photo upload
- 🔄 Session management

### 📋 Task Management
- ➕ Create, edit, and delete tasks
- 👥 Assign tasks to multiple team members
- 📊 Track task progress with checklists
- 🏷️ Priority levels (Low, Medium, High)
- 📈 Status tracking (Pending, In Progress, Completed)
- 📎 File attachments support
- 📅 Due date management

### 📊 Dashboard
- 📈 Visual statistics and charts
- 🔄 Real-time task updates
- 👀 Quick overview of all tasks
- 🎯 Task distribution analysis

### 🎨 User Interface
- 🌙 Modern, clean design
- 📱 Fully responsive (Mobile, Tablet, Desktop)
- ⚡ Smooth animations and transitions
- 🎯 Intuitive navigation

---

## 🖼️ Screenshots

### Admin Dashboard
```
📊 Dashboard with statistics, task distribution charts, recent tasks, and team overview
```

### Task Management
```
📋 Grid view of tasks with status filtering, search, and quick actions
```

### User Dashboard
```
👤 Personal dashboard showing assigned tasks and progress tracking
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| React Router | Navigation |
| Tailwind CSS | Styling |
| Axios | HTTP Client |
| Vite | Build Tool |
| Recharts | Charts & Graphs |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM |
| JWT | Authentication |
| Bcrypt.js | Password Hashing |
| Multer | File Uploads |

---

## 📁 Project Structure

```
TaskManager/
├── 📁 backend/
│   ├── 📁 config/          # Database configuration
│   ├── 📁 controllers/     # Route controllers
│   ├── 📁 middleware/      # Auth & upload middleware
│   ├── 📁 models/          # Mongoose schemas
│   ├── 📁 routes/          # API routes
│   ├── 📁 uploads/         # Uploaded files
│   └── 📄 server.js        # Entry point
│
└── 📁 frontend/Task-manager/
    ├── 📁 src/
    │   ├── 📁 component/   # Reusable components
    │   ├── 📁 context/     # React context
    │   ├── 📁 hooks/       # Custom hooks
    │   ├── 📁 pages/       # Page components
    │   ├── 📁 routes/      # Route guards
    │   ├── 📁 utils/       # Utility functions
    │   ├── 📄 App.jsx      # Main app
    │   └── 📄 main.jsx     # Entry point
    └── 📄 index.html
```

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- npm or yarn

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/taskflow.git
cd taskflow
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure your .env file
# MONGO_URL=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
# PORT=8000

# Start the server
npm run dev
```

### 3️⃣ Frontend Setup

```bash
# Navigate to frontend
cd frontend/Task-manager

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4️⃣ Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000

---

## 🔑 Environment Variables

### Backend `.env`

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
JWT_SECRET=your_super_secret_jwt_key
ADMIN_INVITE_TOKEN=your_admin_invite_token
PORT=8000
CLIENT_URL=http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update profile |

### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create new task |
| GET | `/api/tasks/:id` | Get task by ID |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |
| GET | `/api/tasks/dashboard` | Get dashboard data |

### Users (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/user` | Get all users |
| GET | `/api/user/:id` | Get user by ID |
| DELETE | `/api/user/:id` | Delete user |

---

## 👥 User Roles

| Role | Permissions |
|------|-------------|
| **Admin** | Create tasks, assign to members, manage users, view all tasks |
| **Member** | View assigned tasks, update task progress, complete checklists |

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)

```bash
# Build for production
npm run build

# Deploy the 'dist' folder
```

### Backend (Railway/Render/Heroku)

```bash
# Set environment variables on your platform
# Deploy from GitHub repository
```

---

## 📝 Available Scripts

### Backend

```bash
npm start      # Start production server
npm run dev    # Start development server with nodemon
```

### Frontend

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
npm run lint   # Run ESLint
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kunal**

- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- React.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB for the flexible database solution

---

<div align="center">

**⭐ Star this repo if you found it helpful! ⭐**

Made with ❤️ by Kunal

</div>
