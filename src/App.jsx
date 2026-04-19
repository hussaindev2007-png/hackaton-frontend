import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

// Components
import ProtectedRoute from './components/ProtectedRoute';

const queryClient = new QueryClient();

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    {/* Public Routes */}
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

                    {/* Protected Routes */}
                    <Route 
                        path="/dashboard" 
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        } 
                    />

                    {/* Default Redirect */}
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    
                    {/* 404 Route */}
                    <Route path="*" element={<div className="h-screen flex items-center justify-center text-white bg-[#0f172a]">404 - Page Not Found</div>} />
                </Routes>

                <ToastContainer 
                    theme="dark" 
                    position="top-right" 
                    autoClose={2000} 
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