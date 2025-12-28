import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Dashboard from './pages/Admin/Dashboard';
import ManageTask from './pages/Admin/ManageTask';
import CreateTask from './pages/Admin/CreateTask';
import ManageUser from './pages/Admin/ManageUser';
import UserDashboard from './pages/User/UserDashboard';
import MyTask from './pages/User/MyTask';
import ViewTaskDetail from './pages/User/ViewTaskDetail';
import PrivateRoute from './routes/PrivateRoute';
import UserContextProvider, { UserContext } from './context/Usercontext';

const App = () => {
  return (
    <UserContextProvider>
      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/tasks" element={<ManageTask />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/user" element={<ManageUser />} />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["user", "member"]} />}>
              <Route path="/user/userdashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<MyTask />} />
              <Route path="/user/task-details/:id" element={<ViewTaskDetail />} />
            </Route>
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
    </UserContextProvider>
  );
};

export default App;

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading)
    return <Outlet />

  if (!user) {
    return <Navigate to="/login" />
  }
  return user.role === "admin" ? <Outlet /> : <Navigate to="/user/userdashboard" />;
};