import React, { lazy, Suspense, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, setLoading } from "./redux/reducers/auth";
import { API_BASE_URL } from "./config";
import ErrorBoundary from "./components/ErrorBoundary";
import Loader from "./components/Loader";
import NewLoader from "./components/NewLoader";
import AdminProtected from "./components/AdminProtected";
import AdminLayout from "./layout/AdminLayout";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Register = lazy(() => import("./pages/Register"));
const Groups = lazy(() => import("./pages/Groups"));
const AdminDashboard = lazy(() => import("./pages/admin/DashBord"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Users = lazy(() => import("./pages/admin/UsersManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) return <NewLoader />;
  return user ? children : <Navigate to="/login" />;
};

const App = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const currentUser = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${API_BASE_URL}/auth/me`, {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        });
        dispatch(login(res.data));
      } catch (error) {
        console.error(error);
      } finally {
        dispatch(setLoading(false));
        setAuthChecked(true);
      }
    };

    currentUser();
  }, [dispatch]);

  if (!authChecked) return <Loader />;

  return (
    <ErrorBoundary>
      <Router>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-login" element={<AdminLogin />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<NewLoader />}>
                  <Home />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chat/:_id"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<NewLoader />}>
                  <Chat />
                  </Suspense>
                </ProtectedRoute>
              }
            />
            <Route
              path="/groups"
              element={
                <ProtectedRoute>
                  <Suspense fallback={<NewLoader />}>
                  <Groups />
                  </Suspense>
                </ProtectedRoute>
              }
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
