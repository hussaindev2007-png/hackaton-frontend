import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Building2 } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/signup', formData);
            toast.success('Account created! Please login.');
            navigate('/login');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup Failed');
        }
    };

    return (
        <div className="flex min-h-screen bg-[#0f172a] text-white">
            <div className="flex flex-col justify-center w-full max-w-md p-8 lg:w-1/2">
                <div className="mb-8">
                    <img src="/logo.svg" alt="Logo" className="w-12 h-12 mb-4" />
                    <h2 className="text-3xl font-bold">Sign up</h2>
                    <p className="text-gray-400">Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign in</Link></p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Full Name*</label>
                        <div className="relative">
                            <User className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input 
                                type="text" required
                                className="w-full bg-[#1e293b] border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>
                    </div>

                    

                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Email address*</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input 
                                type="email" required
                                className="w-full bg-[#1e293b] border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-1 text-sm text-gray-300">Password*</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-2.5 text-gray-500 w-5 h-5" />
                            <input 
                                type={showPassword ? "text" : "password"} required
                                className="w-full bg-[#1e293b] border border-gray-700 rounded-md py-2 pl-10 pr-10 focus:outline-none focus:border-blue-500"
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                            />
                            <button 
                                type="button" 
                                className="absolute right-3 top-2.5 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 py-2">
                        <input type="checkbox" required className="w-4 h-4 rounded border-gray-700 bg-[#1e293b]" />
                        <span className="text-sm text-gray-400">I agree to the Terms and Privacy Policy</span>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-2.5 rounded-md font-semibold transition shadow-lg shadow-blue-500/20">
                        Create my account
                    </button>
                </form>
            </div>

            <div className="hidden lg:flex lg:w-1/2 bg-[#1e293b] items-center justify-center p-12">
                <div className="max-w-lg">
                    <h1 className="text-4xl font-bold mb-4">Welcome to our community</h1>
                    <p className="text-gray-400 text-lg leading-relaxed">
              Everything you need, all in one place.
Create your account to get started.          
                    </p>
              
                </div>
            </div>
        </div>
    );
};

export default Signup;