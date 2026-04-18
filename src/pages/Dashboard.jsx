import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import { LogOut, LayoutDashboard, User, AlertCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dashboard = () => {
    const navigate = useNavigate();
    
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['dashboardStats'],
        queryFn: async () => {
            const res = await api.get('/dashboard/stats');
            return res.data;
        },
        retry: 1,
        onError: (err) => {
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                navigate('/login');
                toast.error("Session expired. Please login again.");
            }
        }
    });

    const logout = () => {
        localStorage.removeItem('token');
        toast.info("Logged out successfully");
        navigate('/login');
    };

    if (isLoading) {
        return (
            <div className="h-screen flex flex-col items-center justify-center bg-[#0f172a] text-white">
                <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-4" />
                <p className="text-gray-400 animate-pulse">Fetching your data...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#0f172a] p-4">
                <div className="bg-[#1e293b] p-8 rounded-2xl border border-red-500/50 text-center max-w-sm">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-white mb-2">Failed to load data</h2>
                    <p className="text-gray-400 mb-6">{error?.response?.data?.message || "Server connection error"}</p>
                    <button 
                        onClick={() => refetch()} 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            <nav className="border-b border-gray-800 bg-[#1e293b]/50 backdrop-blur-md sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <LayoutDashboard className="text-blue-500" />
                        <span className="text-xl font-bold tracking-tight">FUSE <span className="text-blue-500 text-sm">PRO</span></span>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                            <User size={16} />
                            <span>Authenticated User</span>
                        </div>
                        <button 
                            onClick={logout} 
                            className="flex items-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-lg transition-all text-sm font-medium"
                        >
                            <LogOut size={18}/> Logout
                        </button>
                    </div>
                </div>
            </nav>
            
            <main className="max-w-7xl mx-auto p-6 md:p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold mb-2">Welcome Back!</h1>
                    <p className="text-gray-400">Here is what's happening with your projects today.</p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-colors shadow-xl">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Status</p>
                        <h3 className="text-2xl font-semibold text-blue-400">
                            {data?.welcomeMessage || "System Active"}
                        </h3>
                    </div>

                    <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 shadow-xl">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Connected To</p>
                        <h3 className="text-2xl font-semibold text-green-400">Production API</h3>
                    </div>

                    <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 shadow-xl">
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-1">Current Session</p>
                        <h3 className="text-2xl font-semibold text-purple-400">Active</h3>
                    </div>
                </div>

                <div className="mt-8 bg-[#1e293b] rounded-2xl border border-gray-700 p-8 h-64 flex items-center justify-center border-dashed">
                    <p className="text-gray-500 italic">Waiting for Hackathon Docs to populate modules...</p>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;