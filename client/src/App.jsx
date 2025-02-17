import React, { lazy, Suspense, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BlackScreen from "./components/BlackScreen";
import Protected from "./components/Protected";
import AdminProtected from "./components/AdminProtected";
import ErrorBoundary from "./components/ErrorBoundary";
import AdminLayout from "./layout/AdminLayout";
import Loader from "./components/Loader";
import NewLoader from "./components/NewLoader";
import axios from "axios";
import toast from "react-hot-toast";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Register = lazy(() => import("./pages/Register"));
const Groups = lazy(() => import("./pages/Groups"));
const AdminDashboard = lazy(() => import("./pages/admin/DashBord"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Users = lazy(() => import("./pages/admin/UsersManagement")); // Admin Users Page
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement")); // Admin Chat Page
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement")); // Admin Message Page

const ProtectedRoute = ({ element }) => (
  <Protected status="ok" user="true">
    {element}
  </Protected>
);

const App = () => {   
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/isLogin", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute element={<Home />} />} />
            <Route
              path="/chat/:_id"
              element={<ProtectedRoute element={<Chat />} />}
            />
            <Route
              path="/groups"
              element={<ProtectedRoute element={<Groups />} />}
            />

            {/* Admin Routes (Ensuring Sidebar Persists) */}
            <Route
              path="/admin/*"
              element={
                <AdminProtected>
                  <Suspense fallback={<NewLoader />}>
                    <AdminLayout>
                      <Routes>
                        <Route
                          path=""
                          element={
                            <div className="h-screen items-center flex justify-center">
                              <span>admin page</span>
                            </div>
                          }
                        />
                        <Route path="dashboard" element={<AdminDashboard />} />
                        <Route path="users" element={<Users />} />
                        <Route path="chats" element={<ChatManagement />} />
                        <Route
                          path="messages"
                          element={<MessageManagement />}
                        />
                      </Routes>
                    </AdminLayout>
                  </Suspense>
                </AdminProtected>
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
