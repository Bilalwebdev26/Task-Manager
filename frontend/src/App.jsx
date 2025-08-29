import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardUser from "./pages/User/Dashboard";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import DashboardAdmin from "./pages/Admin/Dashboard";
import PrivateRoutes from "./routes/PrivateRoutes";
import ManageTask from "./pages/Admin/ManageTask";
import CreateTask from "./pages/Admin/CreateTask";
import ManageUser from "./pages/Admin/ManageUser";
import MyTask from "./pages/User/MyTask";
import ViewTaskDetails from "./pages/User/ViewTaskDetails";
const App = () => {
  return (
    <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Admin Routes */}
        <Route element={<PrivateRoutes role={["admin"]} />}>
          <Route path="/admin/dashboard" element={<DashboardAdmin />} />
          <Route path="/admin/tasks" element={<ManageTask />} />
          <Route path="/admin/create-task" element={<CreateTask />} />
          <Route path="/admin/manage-users" element={<ManageUser />} />
        </Route>
        {/* User Routes */}
        <Route element={<PrivateRoutes role={["member"]} />}>
          <Route path="/user/dashboard" element={<DashboardUser />} />
          <Route path="/user/my-tasks" element={<MyTask />} />
          <Route path="/user/view-task-details/:id" element={<ViewTaskDetails />} />
          <Route path="/user/manage-users" element={<ManageUser />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
