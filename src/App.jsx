import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './pages/ResetPassword';

const queryClient = new QueryClient();

// PublicRoute Component: Jo login user ko login page dekhne se rokta hai
const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {/* Public Routes - Login user yahan nahi aa sakta */}
                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    
                    <Route path="/signup" element={
                        <PublicRoute>
                            <Signup />
                        </PublicRoute>
                    } />

                    <Route path="/forgot-password" element={
                        <PublicRoute>
                            <ForgotPassword />
                        </PublicRoute>
                    } />

                    {/* Protected Routes - Sirf login user ke liye */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Default Redirects */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="*" element={<div className="h-screen flex items-center justify-center text-white bg-[#0f172a]">404 - Page Not Found</div>} />
               <Route path="/reset-password/:token" element={<ResetPassword />} />
                </Routes>

                <ToastContainer 
                    theme="dark" 
                    position="top-right" 
                    autoClose={300}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </Router>
        </QueryClientProvider>
    );
}

export default App;