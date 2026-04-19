// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Eye, EyeOff, Mail, Lock, User, ChevronDown, ShieldCheck } from 'lucide-react';
// import { toast } from 'react-toastify';
// import api from '../api/axios';

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         role: 'seeker' // Default value yahan set hai
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Backend ko formData (name, email, password, role) bhej raha hai
//             await api.post('/auth/signup', formData);
//             toast.success('Account created! Please login.');
//             navigate('/login');
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Signup Failed');
//         }
//     };
//     console.log(formData);
    

//     return (
//         <div className="flex min-h-screen bg-[#0f172a] text-white">
//             <div className="flex flex-col justify-center w-full max-w-md p-8 lg:w-1/2">
//                 <div className="mb-8">
//                     <h2 className="text-3xl font-bold italic">FUSE PRO</h2>
//                     <p className="text-gray-400 mt-2 text-sm">Join our community and start your journey.</p>
//                 </div>

//                 <form onSubmit={handleSubmit} className="space-y-5">
//                     {/* Full Name */}
//                     <div>
//                         <label className="block mb-1 text-sm text-gray-400">Full Name</label>
//                         <div className="relative">
//                             <User className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
//                             <input 
//                                 type="text" required
//                                 placeholder="Enter your name"
//                                 className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                                 onChange={(e) => setFormData({...formData, name: e.target.value})}
//                             />
//                         </div>
//                     </div>

//                     {/* Email */}
//                     <div>
//                         <label className="block mb-1 text-sm text-gray-400">Email Address</label>
//                         <div className="relative">
//                             <Mail className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
//                             <input 
//                                 type="email" required
//                                 placeholder="name@company.com"
//                                 className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
//                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
//                             />
//                         </div>
//                     </div>

//                     {/* Dropdown for Role - Logic Start */}
//                     <div>
//                         <label className="block mb-1 text-sm text-gray-400">I want to...</label>
//                         <div className="relative">
//                             <ShieldCheck className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
//                             <select 
//                                 value={formData.role}
//                                 onChange={(e) => setFormData({...formData, role: e.target.value})}
//                                 className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl py-3 pl-10 pr-10 appearance-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all cursor-pointer"
//                             >
//                                 <option value="seeker" className="bg-[#1e293b]">Get Help (Seeker)</option>
//                                 <option value="helper" className="bg-[#1e293b]">Provide Help (Helper)</option>
//                             </select>
//                             <ChevronDown className="absolute right-3 top-3.5 text-gray-500 w-4 h-4 pointer-events-none" />
//                         </div>
//                     </div>
//                     {/* Dropdown Logic End */}

//                     {/* Password */}
//                     <div>
//                         <label className="block mb-1 text-sm text-gray-400">Password</label>
//                         <div className="relative">
//                             <Lock className="absolute left-3 top-3 text-gray-500 w-5 h-5" />
//                             <input 
//                                 type={showPassword ? "text" : "password"} required
//                                 placeholder="••••••••"
//                                 className="w-full bg-[#1e293b]/50 border border-gray-700 rounded-xl py-3 pl-10 pr-10 focus:outline-none focus:border-blue-500 transition-all"
//                                 onChange={(e) => setFormData({...formData, password: e.target.value})}
//                             />
//                             <button 
//                                 type="button" 
//                                 className="absolute right-3 top-3 text-gray-500 hover:text-white"
//                                 onClick={() => setShowPassword(!showPassword)}
//                             >
//                                 {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
//                             </button>
//                         </div>
//                     </div>

//                     <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 mt-4 active:scale-95">
//                         Create {formData.role.charAt(0).toUpperCase() + formData.role.slice(1)} Account
//                     </button>

//                     <p className="text-center text-sm text-gray-400 mt-4">
//                         Already have an account? <Link to="/login" className="text-blue-500 hover:underline font-medium">Sign in</Link>
//                     </p>
//                 </form>
//             </div>

//             {/* Right Side - Branding remains same */}
//             <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#1e293b] to-[#0f172a] items-center justify-center p-12 border-l border-gray-800">
//                 <div className="max-w-lg text-center">
//                     <h1 className="text-5xl font-black mb-6 tracking-tighter italic">CONNECT WITH PURPOSE</h1>
//                     <p className="text-gray-400 text-lg leading-relaxed">
//                         Join the platform where developers help each other grow. 
//                         Simple. Professional. Fast.
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Signup;












import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ChevronDown, ShieldCheck } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../api/axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'both' // Default set to 'Both' like the screenshot
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
        <div className="flex min-h-screen bg-[#fcf6f0] text-[#0a2520] font-sans selection:bg-[#10b981]/30">
            <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto items-center justify-center p-6 gap-8">
                
                {/* Left Side: Information Card (Dark Green) */}
                <div className="w-full lg:w-1/2 bg-[#0a2520] text-white p-12 rounded-[40px] shadow-2xl min-h-[550px] flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="bg-[#10b981] p-2 rounded-lg">
                            <ShieldCheck size={24} className="text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">HelpHub AI</span>
                    </div>
                    
                    <h4 className="text-gray-400 uppercase tracking-widest text-xs font-bold mb-4">Community Access</h4>
                    <h1 className="text-5xl font-bold leading-tight mb-6">Enter the support network.</h1>
                    
                    <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                        Choose a demo identity, set your role, and jump into a multi-page product flow designed for asking, offering, and tracking help with a premium interface.
                    </p>

                    <ul className="space-y-4">
                        {['Role-based entry for Need Help, Can Help, or Both', 'Direct path into dashboard, requests, AI Center, and community feed', 'Persistent demo session powered by LocalStorage'].map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-gray-300">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-500 flex-shrink-0" />
                                <span className="text-sm">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right Side: Signup Form (White Card) */}
                <div className="w-full lg:w-1/2 bg-white p-12 rounded-[40px] shadow-sm border border-gray-100 min-h-[550px] flex flex-col justify-center">
                    <div className="mb-10">
                        <h4 className="text-[#10b981] uppercase tracking-widest text-xs font-bold mb-2">Login / Signup</h4>
                        <h2 className="text-4xl font-bold text-[#0a2520]">Authenticate your community profile</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
                                <input 
                                    type="text" required
                                    placeholder="Enter your name"
                                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-[#10b981] focus:ring-1 focus:ring-[#10b981] transition-all text-gray-800"
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
                                <input 
                                    type="email" required
                                    placeholder="community@helphub.ai"
                                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl py-3.5 px-4 focus:outline-none focus:border-[#10b981] transition-all text-gray-800 text-sm"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-semibold text-gray-700">Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} required
                                        placeholder="••••••••"
                                        className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl py-3.5 px-4 focus:outline-none focus:border-[#10b981] transition-all text-gray-800"
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
                        </div>

                        {/* Role Selection Dropdown */}
                        <div>
                            <label className="block mb-2 text-sm font-semibold text-gray-700">Role selection</label>
                            <div className="relative">
                                <select 
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full bg-[#f8fafc] border border-gray-200 rounded-2xl py-3.5 px-4 appearance-none focus:outline-none focus:border-[#10b981] transition-all cursor-pointer text-gray-800"
                                >
                                    <option value="seeker">Need Help (Seeker)</option>
                                    <option value="helper">Can Help (Helper)</option>
                                    <option value="both">Both</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-4 text-gray-400 w-5 h-5 pointer-events-none" />
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-[#10b981] hover:bg-[#059669] text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-emerald-500/20 mt-4 active:scale-95"
                        >
                            Continue to dashboard
                        </button>

                        <p className="text-center text-sm text-gray-500 mt-4">
                            Already part of the network? <Link to="/login" className="text-[#10b981] hover:underline font-bold">Sign in</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;