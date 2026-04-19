// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import api from '../api/axios';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const validate = () => {
//         let tempErrors = {};
//         if (!formData.email) tempErrors.email = "Email is required";
//         else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Invalid email format";
//         if (!formData.password) tempErrors.password = "Password is required";
//         setErrors(tempErrors);
//         return Object.keys(tempErrors).length === 0;
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validate()) return;

//         setLoading(true);
//         try {
//             const res = await api.post('/auth/login', formData);
//             localStorage.setItem('token', res.data.token);
//             toast.success('Login Successful!');
//             navigate('/dashboard');
//         } catch (err) {
//             const msg = err.response?.data?.message || 'Invalid Credentials';
//             toast.error(msg);
//             setErrors({ server: msg });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex min-h-screen bg-[#0f172a] text-white">
//             <div className="flex flex-col justify-center w-full max-w-md p-8 lg:w-1/2 mx-auto">
//                 <div className="mb-8">
//                     <h2 className="text-3xl font-bold">Sign in</h2>
//                     <p className="text-gray-400 mt-2">New here? <Link to="/signup" className="text-blue-500 font-medium hover:underline">Create account</Link></p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-1.5">Email*</label>
//                         <div className="relative">
//                             <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
//                             <input 
//                                 type="email"
//                                 className={`w-full bg-[#1e293b] border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition`}
//                                 placeholder="name@company.com"
//                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                             />
//                         </div>
//                         {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                     </div>

//                     <div>
//                         <div className="flex justify-between mb-1.5">
//                             <label className="text-sm font-medium text-gray-300">Password*</label>
//                             <Link to="/forgot-password" size="sm" className="text-blue-500 text-xs hover:underline">Forgot password?</Link>
//                         </div>
//                         <div className="relative">
//                             <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
//                             <input 
//                                 type={showPassword ? "text" : "password"}
//                                 className={`w-full bg-[#1e293b] border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2.5 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 outline-none transition`}
//                                 placeholder="••••••••"
//                                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                             />
//                             <button 
//                                 type="button"
//                                 className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
//                             </button>
//                         </div>
//                         {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//                     </div>

//                     <button 
//                         disabled={loading}
//                         className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-3 rounded-lg font-bold flex justify-center items-center transition-all shadow-lg"
//                     >
//                         {loading ? <Loader2 className="animate-spin" /> : "Sign in"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;






















































































































// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
// import { toast } from 'react-toastify';
// import api from '../api/axios';

// const Login = () => {
//     const [formData, setFormData] = useState({ email: '', password: '' });
//     const [errors, setErrors] = useState({});
//     const [showPassword, setShowPassword] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     const validate = () => {
//         let tempErrors = {};
//         if (!formData.email) {
//             tempErrors.email = "Email is required";
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             tempErrors.email = "Invalid email format";
//         }
//         if (!formData.password) {
//             tempErrors.password = "Password is required";
//         }
//         setErrors(tempErrors);
//         return Object.keys(tempErrors).length === 0;
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     if (!validate()) return;

//     //     setLoading(true);
//     //     try {
//     //         // Backend route: /api/auth/login (api prefix axios config mein handle ho raha hoga)
//     //         const res = await api.post('/auth/login', formData);
            
//     //         // Backend se token aur user data mil raha hai
//     //         const { token, user } = res.data;

//     //         // LocalStorage mein save karein
//     //         localStorage.setItem('token', token);
//     //         localStorage.setItem('user', JSON.stringify(user));

//     //         toast.success(`Welcome back, ${user.name}!`);
//     //         navigate('/dashboard');
//     //     } catch (err) {
//     //         // Backend error message handle karein
//     //         const errorMsg = err.response?.data?.message || err.response?.data?.error || 'Invalid Credentials';
//     //         toast.error(errorMsg);
//     //         setErrors({ server: errorMsg });
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // };

//     const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const res = await api.post('/auth/login', formData);
//         localStorage.setItem('token', res.data.token);
        
//         // YE LINE ZAROORI HAI: Pura user data save karein (jis mein role ho)
//         localStorage.setItem('user', JSON.stringify(res.data.user)); 
        
//         toast.success('Welcome Back!');
//         navigate('/dashboard');
//     } catch (err) {
//         toast.error(err.response?.data?.message || 'Login Failed');
//     }
// };

//     return (
//         <div className="flex min-h-screen bg-[#0f172a] text-white">
//             <div className="flex flex-col justify-center w-full max-w-md p-8 lg:w-1/2 mx-auto">
//                 <div className="mb-8">
//                     <h2 className="text-3xl font-bold">Sign in</h2>
//                     <p className="text-gray-400 mt-2">
//                         New here? <Link to="/signup" className="text-blue-500 font-medium hover:underline">Create account</Link>
//                     </p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     {/* Server side error alert */}
//                     {errors.server && (
//                         <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg text-sm">
//                             {errors.server}
//                         </div>
//                     )}

//                     <div>
//                         <label className="block text-sm font-medium text-gray-300 mb-1.5">Email Address*</label>
//                         <div className="relative">
//                             <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
//                             <input 
//                                 type="email"
//                                 className={`w-full bg-[#1e293b] border ${errors.email ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none transition`}
//                                 placeholder="name@company.com"
//                                 value={formData.email}
//                                 onChange={(e) => {
//                                     setFormData({...formData, email: e.target.value});
//                                     if(errors.email) setErrors({...errors, email: null});
//                                 }}
//                             />
//                         </div>
//                         {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
//                     </div>

//                     <div>
//                         <div className="flex justify-between mb-1.5">
//                             <label className="text-sm font-medium text-gray-300">Password*</label>
//                             <Link to="/forgot-password" size="sm" className="text-blue-500 text-xs hover:underline">Forgot password?</Link>
//                         </div>
//                         <div className="relative">
//                             <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
//                             <input 
//                                 type={showPassword ? "text" : "password"}
//                                 className={`w-full bg-[#1e293b] border ${errors.password ? 'border-red-500' : 'border-gray-700'} rounded-lg py-2.5 pl-10 pr-10 focus:ring-2 focus:ring-blue-500 outline-none transition`}
//                                 placeholder="••••••••"
//                                 value={formData.password}
//                                 onChange={(e) => {
//                                     setFormData({...formData, password: e.target.value});
//                                     if(errors.password) setErrors({...errors, password: null});
//                                 }}
//                             />
//                             <button 
//                                 type="button"
//                                 className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
//                             </button>
//                         </div>
//                         {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
//                     </div>

//                     <button 
//                         type="submit"
//                         disabled={loading}
//                         className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 py-3 rounded-lg font-bold flex justify-center items-center transition-all shadow-lg"
//                     >
//                         {loading ? (
//                             <>
//                                 <Loader2 className="animate-spin mr-2" size={20} />
//                                 Signing in...
//                             </>
//                         ) : "Sign in"}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Login;















import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Loader2, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await api.post('/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user)); 
            
            toast.success('Welcome Back!');
            navigate('/dashboard');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-[#fcf6f0] text-[#0a2520] font-sans">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-center justify-center p-6 gap-8">
                
                {/* Left Side: Branding Card (Dark Green) */}
                <div className="w-full lg:w-1/2 bg-[#0a2520] text-white p-12 rounded-[40px] shadow-2xl min-h-[500px] flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-[#10b981] p-2 rounded-lg">
                            <ShieldCheck size={24} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">HelpHub AI</span>
                    </div>
                    
                    <h4 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-4">Welcome Back</h4>
                    <h1 className="text-5xl font-bold leading-tight mb-6">Reconnect with your community.</h1>
                    
                    <p className="text-gray-300 text-lg leading-relaxed">
                        Sign in to track your tasks, update your skills, and continue providing or receiving help through our AI-powered network.
                    </p>
                </div>

                {/* Right Side: Login Form (White Card) */}
                <div className="w-full lg:w-1/2 bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 min-h-[500px] flex flex-col justify-center">
                    <div className="mb-10">
                        <h4 className="text-[#10b981] uppercase tracking-widest text-xs font-bold mb-2">Login / Sign In</h4>
                        <h2 className="text-4xl font-bold text-[#0a2520]">Authenticate your community profile</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <input 
                                    type="email" required
                                    placeholder="community@helphub.ai"
                                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all text-gray-800"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="text-sm font-semibold text-gray-700">Password</label>
                                <Link to="/forgot-password" size="sm" className="text-[#10b981] text-xs font-bold hover:underline">Forgot password?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <input 
                                    type={showPassword ? "text" : "password"} required
                                    placeholder="••••••••"
                                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl py-3.5 pl-12 pr-12 focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all text-gray-800"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                />
                                <button 
                                    type="button" 
                                    className="absolute right-4 top-3.5 text-gray-400"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 mt-4 active:scale-95 disabled:opacity-70 flex justify-center items-center"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Continue to dashboard"}
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            New to the network? <Link to="/signup" className="text-[#10b981] hover:underline font-bold">Create account</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;