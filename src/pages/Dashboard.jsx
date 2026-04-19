// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../api/axios';
// import { LayoutDashboard, Send, CheckCircle, Loader2, User as UserIcon } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     // 1. Safe User Fetching
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
    
//     // Redirect if not logged in
//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     // 2. Fetch Requests
//     const { data: requests, isLoading, isError } = useQuery({
//         queryKey: ['requests'],
//         queryFn: async () => {
//             const res = await api.get('/requests'); 
//             return res.data;
//         },
//         enabled: !!user // Sirf tab chalega jab user login hoga
//     });

//     // 3. Create Request Mutation (Seeker)
//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', newReq),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("Request posted successfully!");
//         },
//         onError: () => toast.error("Failed to post request")
//     });

//     // 4. Accept Request Mutation (Helper)
//     const acceptMutation = useMutation({
//         mutationFn: (id) => api.put(`/requests/accept/${id}`),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             toast.success("Task accepted!");
//         },
//         onError: () => toast.error("Failed to accept task")
//     });

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         toast.info("Logged out");
//         navigate('/login');
//     };

//     // Loading State
//     if (isLoading) {
//         return (
//             <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white">
//                 <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
//             </div>
//         );
//     }

//     // Error or No User State
//     if (!user) return null;

//     // Clean Role Logic
//     const userRole = user.role?.toLowerCase() || 'guest';
//     const isSeeker = userRole === 'seeker';
//     const isHelper = userRole === 'helper';

//     console.log(isSeeker);
    

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-white font-sans">
//             {/* Navbar */}
//             <nav className="border-b border-gray-800 bg-[#1e293b]/50 p-4 sticky top-0 z-10 backdrop-blur-md">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <LayoutDashboard className="text-blue-500" />
//                         <span className="text-xl font-black italic tracking-tighter">FUSE PRO</span>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
//                             <UserIcon size={14} className="text-blue-400" />
//                             <span className="text-[10px] font-bold uppercase tracking-widest">{userRole}</span>
//                         </div>
//                         <button onClick={logout} className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-medium">
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto p-6">
//                 <header className="mb-10">
//                     <h1 className="text-4xl font-black uppercase italic">Welcome, {user.name?.split(' ')[0] || 'User'}!</h1>
//                     <p className="text-gray-400 mt-2">
//                         {isSeeker ? "Need a hand? Create a request below." : "Ready to earn? Help someone today."}
//                     </p>
//                 </header>

//                 <div className="grid grid-cols-1 gap-10">
                    
//                     {/* SEEKER SECTION */}
//                     {isSeeker && (
//                         <div className="max-w-2xl bg-[#1e293b] p-8 rounded-2xl border border-gray-700 shadow-2xl">
//                             <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
//                                 <Send size={20} /> New Support Request
//                             </h2>
//                             <div className="space-y-4">
//                                 <input 
//                                     type="text" 
//                                     placeholder="What do you need help with?" 
//                                     className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 outline-none focus:border-blue-500 transition-all"
//                                     value={requestData.title}
//                                     onChange={(e) => setRequestData({...requestData, title: e.target.value})}
//                                 />
//                                 <textarea 
//                                     placeholder="Describe the issue in detail..." 
//                                     className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 h-40 outline-none focus:border-blue-500 transition-all resize-none"
//                                     value={requestData.description}
//                                     onChange={(e) => setRequestData({...requestData, description: e.target.value})}
//                                 />
//                                 <button 
//                                     onClick={() => createMutation.mutate(requestData)}
//                                     disabled={createMutation.isPending || !requestData.title}
//                                     className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20"
//                                 >
//                                     {createMutation.isPending ? "Posting..." : "Submit Request"}
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* HELPER SECTION */}
//                     {isHelper && (
//                         <div>
//                             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-400">
//                                 <CheckCircle size={24} /> Available Tasks
//                             </h2>
//                             {requests?.length === 0 ? (
//                                 <div className="bg-[#1e293b] p-12 rounded-2xl border border-dashed border-gray-700 text-center">
//                                     <p className="text-gray-500">No open requests at the moment. Refresh later!</p>
//                                 </div>
//                             ) : (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {requests?.map((req) => (
//                                         <div key={req._id} className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group shadow-lg">
//                                             <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{req.title}</h3>
//                                             <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{req.description}</p>
//                                             <button 
//                                                 onClick={() => acceptMutation.mutate(req._id)}
//                                                 disabled={acceptMutation.isPending}
//                                                 className="w-full bg-green-600/10 text-green-500 border border-green-500/30 py-3 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all"
//                                             >
//                                                 {acceptMutation.isPending ? "Processing..." : "I Can Help"}
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;






















// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../api/axios';
// import { LayoutDashboard, Send, CheckCircle, Loader2, User as UserIcon } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     // 1. Get User from LocalStorage
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
    
//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     // 2. Fetch All Requests (Helper Feed)
//     // Route: GET /api/requests
//     const { data: requests, isLoading } = useQuery({
//         queryKey: ['requests'],
//         queryFn: async () => {
//             const res = await api.get('/requests'); 
//             return res.data;
//         },
//         enabled: !!user && user.role === 'helper' // Sirf helper ko feed dikhao
//     });

//     // 3. Create Request (Seeker Action)
//     // Route: POST /api/requests
//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', {
//             ...newReq,
//             userId: user?.id // Backend model mein seeker ki ID save karne ke liye
//         }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("Request posted successfully!");
//         },
//         onError: (err) => {
//             toast.error(err.response?.data?.message || "Failed to post request");
//         }
//     });

//     // 4. Accept Request (Helper Action)
//     // Route: PUT /api/requests/accept/:requestId
//    // 4. Accept Request (Helper Action)
//     // Route: PUT /api/requests/accept/:requestId
//     // const acceptMutation = useMutation({
//     //     mutationFn: (requestId) => {
//     //         const token = localStorage.getItem('token'); // Middleware ke liye token
//     //         const helperId = user?._id || user?.id;      // Controller ke liye ID

//     //         return api.put(`/requests/accept/${requestId}`, 
//     //             { helperId: helperId }, // Ye req.body mein jayega
//     //             { 
//     //                 headers: { 
//     //                     Authorization: `Bearer ${token}` 
//     //                 } 
//     //             } // Ye req.headers mein jayega
//     //         );
//     //     },
//     //     onSuccess: () => {
//     //         queryClient.invalidateQueries(['requests']);
//     //         toast.success("Task accepted! Check your tasks.");
//     //     },
//     //     onError: (err) => {
//     //         // Agar error aaye toh console mein check karein
//     //         console.error("Accept Error:", err.response?.data);
//     //         toast.error(err.response?.data?.message || "Failed to accept task");
//     //     }
//     // });


//     const acceptMutation = useMutation({
//         mutationFn: (requestId) => {
//             const token = localStorage.getItem('token');
//             const helperId = user?._id || user?.id;

//             return api.put(`/requests/accept/${requestId}`, 
//                 { helperId: helperId }, 
//                 { 
//                     headers: { 
//                         Authorization: `Bearer ${token}` 
//                     } 
//                 }
//             );
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             toast.success("Task accepted! Check your tasks.");
//         },
//         onError: (err) => {
//             console.error("Accept Error:", err.response?.data);
//             toast.error(err.response?.data?.message || "Failed to accept task");
//         }
//     });

//     const logout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         toast.info("Logged out");
//         navigate('/login');
//     };

//     if (isLoading) {
//         return (
//             <div className="h-screen flex items-center justify-center bg-[#0f172a] text-white">
//                 <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
//             </div>
//         );
//     }

//     if (!user) return null;

//     const userRole = user.role?.toLowerCase() || 'guest';
//     const isSeeker = userRole === 'seeker';
//     const isHelper = userRole === 'helper';

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-white font-sans">
//             {/* Navbar */}
//             <nav className="border-b border-gray-800 bg-[#1e293b]/50 p-4 sticky top-0 z-10 backdrop-blur-md">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <LayoutDashboard className="text-blue-500" />
//                         <span className="text-xl font-black italic tracking-tighter">FUSE PRO</span>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <div className="flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
//                             <UserIcon size={14} className="text-blue-400" />
//                             <span className="text-[10px] font-bold uppercase tracking-widest">{userRole}</span>
//                         </div>
//                         <button onClick={logout} className="bg-red-500/10 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white transition-all text-sm font-medium">
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto p-6">
//                 <header className="mb-10">
//                     <h1 className="text-4xl font-black uppercase italic">Welcome, {user.name?.split(' ')[0]}!</h1>
//                     <p className="text-gray-400 mt-2">
//                         {isSeeker ? "Need help with a project? Post it below." : "Browse tasks and start helping."}
//                     </p>
//                 </header>

//                 <div className="grid grid-cols-1 gap-10">
//                     {/* SEEKER FORM */}
//                     {isSeeker && (
//                         <div className="max-w-2xl bg-[#1e293b] p-8 rounded-2xl border border-gray-700 shadow-2xl">
//                             <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-400">
//                                 <Send size={20} /> New Support Request
//                             </h2>
//                             <div className="space-y-4">
//                                 <input 
//                                     type="text" 
//                                     placeholder="Problem Title (e.g. React bug in Login)" 
//                                     className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 outline-none focus:border-blue-500 transition-all"
//                                     value={requestData.title}
//                                     onChange={(e) => setRequestData({...requestData, title: e.target.value})}
//                                 />
//                                 <textarea 
//                                     placeholder="Provide more details so helpers can understand..." 
//                                     className="w-full bg-[#0f172a] border border-gray-700 rounded-xl p-4 h-40 outline-none focus:border-blue-500 transition-all resize-none"
//                                     value={requestData.description}
//                                     onChange={(e) => setRequestData({...requestData, description: e.target.value})}
//                                 />
//                                 <button 
//                                     onClick={() => createMutation.mutate(requestData)}
//                                     disabled={createMutation.isPending || !requestData.title}
//                                     className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-blue-500/20"
//                                 >
//                                     {createMutation.isPending ? "Posting..." : "Submit Request"}
//                                 </button>
//                             </div>
//                         </div>
//                     )}

//                     {/* HELPER FEED */}
//                     {isHelper && (
//                         <div>
//                             <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-400">
//                                 <CheckCircle size={24} /> Open Tasks
//                             </h2>
//                             {!requests || requests.length === 0 ? (
//                                 <div className="bg-[#1e293b] p-12 rounded-2xl border border-dashed border-gray-700 text-center">
//                                     <p className="text-gray-500 italic">Everything looks clear. Check back later!</p>
//                                 </div>
//                             ) : (
//                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                                     {requests.map((req) => (
//                                         <div key={req._id} className="bg-[#1e293b] p-6 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all group shadow-lg flex flex-col justify-between">
//                                             <div>
//                                                 <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors line-clamp-1">{req.title}</h3>
//                                                 <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{req.description}</p>
//                                             </div>
//                                             <button 
//                                                 onClick={() => acceptMutation.mutate(req._id)}
//                                                 disabled={acceptMutation.isPending}
//                                                 className="w-full bg-green-600/10 text-green-500 border border-green-500/30 py-3 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-all"
//                                             >
//                                                 {acceptMutation.isPending ? "Accepting..." : "I Can Help"}
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;























// ai























// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../api/axios';
// import { 
//     LayoutDashboard, Send, CheckCircle, Loader2, 
//     User as UserIcon, Sparkles, Zap, Shield 
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
    
//     useEffect(() => {
//         if (!user) navigate('/login');
//     }, [user, navigate]);

//     // Fetch Requests
//     const { data: requests, isLoading } = useQuery({
//         queryKey: ['requests'],
//         queryFn: async () => {
//             const res = await api.get('/requests'); 
//             return res.data;
//         },
//         enabled: !!user
//     });

//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', { ...newReq, userId: user?.id || user?._id }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("AI analyzed and posted your request!");
//         }
//     });

//     const acceptMutation = useMutation({
//         mutationFn: (requestId) => {
//             const token = localStorage.getItem('token');
//             const helperId = user?._id || user?.id;
//             return api.put(`/requests/accept/${requestId}`, { helperId }, { 
//                 headers: { Authorization: `Bearer ${token}` } 
//             });
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             toast.success("Task accepted!");
//         }
//     });

//     const logout = () => {
//         localStorage.clear();
//         navigate('/login');
//     };

//     if (isLoading) return (
//         <div className="h-screen flex items-center justify-center bg-[#0f172a]">
//             <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
//         </div>
//     );

//     const isSeeker = user?.role?.toLowerCase() === 'seeker';
//     const isHelper = user?.role?.toLowerCase() === 'helper';

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
//             {/* Navbar */}
//             <nav className="border-b border-gray-800 bg-[#1e293b]/50 p-4 sticky top-0 z-50 backdrop-blur-md">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-2">
//                         <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
//                             <Zap size={20} fill="white" />
//                         </div>
//                         <span className="text-xl font-black tracking-tighter italic">HELPLYTICS <span className="text-blue-500">AI</span></span>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
//                             <Shield size={12} className="text-green-400" />
//                             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Trust Score: 98</span>
//                         </div>
//                         <button onClick={logout} className="text-gray-400 hover:text-red-400 text-sm font-medium transition-colors">Logout</button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto p-6">
//                 {/* 1. WELCOME & STATS SECTION (Requirement 4) */}
//                 <header className="mb-10">
//                     <h1 className="text-4xl font-black uppercase italic tracking-tight">VIBE CHECK, {user?.name?.split(' ')[0]}!</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//                         {/* AI Insight Card */}
//                         <div className="md:col-span-2 bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-blue-500/30 p-6 rounded-3xl relative overflow-hidden group">
//                             <Sparkles className="absolute top-4 right-4 text-blue-400 opacity-50 group-hover:rotate-12 transition-transform" />
//                             <h4 className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
//                                 <Sparkles size={14} /> AI Intelligence Center
//                             </h4>
//                             <p className="text-lg font-medium text-gray-100 max-w-md">
//                                 {isHelper 
//                                     ? `There are ${requests?.length || 0} open requests matching your "Full Stack" profile. Start helping now!` 
//                                     : "AI Tip: Requests with 'High Urgency' tags are usually resolved within 15 minutes."}
//                             </p>
//                         </div>
//                         {/* Stats Card */}
//                         <div className="bg-[#1e293b] border border-gray-700 p-6 rounded-3xl flex flex-col justify-center">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Total Contributions</p>
//                             <div className="flex items-end gap-2 mt-1">
//                                 <span className="text-4xl font-black text-white">12</span>
//                                 <span className="text-green-500 text-sm font-bold mb-1">+2 today</span>
//                             </div>
//                         </div>
//                     </div>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//                     {/* 2. CREATE REQUEST (Left Column) */}
//                     {isSeeker && (
//                         <div className="lg:col-span-5">
//                             <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-700 sticky top-24">
//                                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
//                                     <Send size={20} className="text-blue-500" /> Need Help?
//                                 </h2>
//                                 <div className="space-y-4">
//                                     <input 
//                                         type="text" 
//                                         placeholder="Title (e.g. React state not updating)" 
//                                         className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all text-sm"
//                                         value={requestData.title}
//                                         onChange={(e) => setRequestData({...requestData, title: e.target.value})}
//                                     />
//                                     <textarea 
//                                         placeholder="Describe your problem... AI will automatically categorize it!" 
//                                         className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl p-4 h-40 outline-none focus:border-blue-500 transition-all resize-none text-sm"
//                                         value={requestData.description}
//                                         onChange={(e) => setRequestData({...requestData, description: e.target.value})}
//                                     />
//                                     <button 
//                                         onClick={() => createMutation.mutate(requestData)}
//                                         disabled={createMutation.isPending || !requestData.title}
//                                         className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 group shadow-xl shadow-blue-900/20"
//                                     >
//                                         {createMutation.isPending ? <Loader2 className="animate-spin" /> : <><Sparkles size={18}/> Ask Helplytics AI</>}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* 3. FEED (Right Column) */}
//                     <div className={`${isSeeker ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
//                         <h2 className="text-2xl font-black mb-6 flex items-center gap-2 uppercase italic tracking-tight">
//                             {isHelper ? <><CheckCircle className="text-green-500" /> Available Tasks</> : "Your Community Activity"}
//                         </h2>
                        
//                         <div className="grid grid-cols-1 gap-4">
//                             {!requests || requests.length === 0 ? (
//                                 <div className="p-20 border-2 border-dashed border-gray-800 rounded-3xl text-center">
//                                     <p className="text-gray-500 italic">No tasks found. Relax!</p>
//                                 </div>
//                             ) : (
//                                 requests.map((req) => (
//                                     <div key={req._id} className="bg-[#1e293b] p-6 rounded-3xl border border-gray-700 hover:border-blue-500/50 transition-all group relative overflow-hidden">
//                                         {/* Urgency Badge from AI */}
//                                         <div className={`absolute top-0 right-0 px-4 py-1 text-[10px] font-black uppercase tracking-tighter rounded-bl-xl ${
//                                             req.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-blue-500/20 text-blue-400'
//                                         }`}>
//                                             {req.urgency || 'Medium'} Urgency
//                                         </div>

//                                         <div className="flex flex-col md:flex-row justify-between gap-6">
//                                             <div className="flex-1">
//                                                 <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">{req.category}</span>
//                                                 <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-blue-400 transition-colors">{req.title}</h3>
//                                                 <p className="text-gray-400 text-sm line-clamp-2 mb-4">{req.description}</p>
                                                
//                                                 {/* AI Tags Rendering */}
//                                                 <div className="flex flex-wrap gap-2">
//                                                     {req.tags?.map((tag, idx) => (
//                                                         <span key={idx} className="text-[10px] bg-gray-800 text-gray-400 px-2 py-1 rounded-md border border-gray-700">#{tag}</span>
//                                                     ))}
//                                                 </div>
//                                             </div>
                                            
//                                             {isHelper && (
//                                                 <div className="flex items-center">
//                                                     <button 
//                                                         onClick={() => acceptMutation.mutate(req._id)}
//                                                         disabled={acceptMutation.isPending && acceptMutation.variables === req._id}
//                                                         className="whitespace-nowrap bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-green-900/20"
//                                                     >
//                                                         {acceptMutation.isPending && acceptMutation.variables === req._id ? "Accepting..." : "I Can Help"}
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;









































// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../api/axios';
// import { 
//     LayoutDashboard, Send, CheckCircle, Loader2, 
//     User as UserIcon, Sparkles, Zap, Shield, BrainCircuit, Target
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
    
//     useEffect(() => {
//         if (!user) navigate('/login');
//     }, [user, navigate]);

//     // Fetch Requests with AI Matching (Passing helperId in query)
//     const { data: requests, isLoading } = useQuery({
//         queryKey: ['requests', user?._id],
//         queryFn: async () => {
//             const res = await api.get(`/requests`); 
//             return res.data;
//         },
//         enabled: !!user
//     });

//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', { ...newReq, userId: user?.id || user?._id }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("AI analyzed and posted your request!");
//         }
//     });

//     const acceptMutation = useMutation({
//         mutationFn: (requestId) => {
//             const helperId = user?._id || user?.id;
//             return api.put(`/requests/accept/${requestId}`, { helperId });
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             toast.success("Task accepted! You're a hero.");
//         }
//     });

//     if (isLoading) return (
//         <div className="h-screen flex items-center justify-center bg-[#0f172a]">
//             <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
//         </div>
//     );

//     const isSeeker = user?.role?.toLowerCase() === 'seeker' || user?.role?.toLowerCase() === 'both';
//     const isHelper = user?.role?.toLowerCase() === 'helper' || user?.role?.toLowerCase() === 'both';

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
//             {/* Navbar */}
//             <nav className="border-b border-gray-800 bg-[#1e293b]/50 p-4 sticky top-0 z-50 backdrop-blur-md">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//                         <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
//                             <Zap size={20} fill="white" />
//                         </div>
//                         <span className="text-xl font-black tracking-tighter italic uppercase">HELPLYTICS <span className="text-blue-500">AI</span></span>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
//                             <Shield size={12} className="text-green-400" />
//                             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Trust Score: {user?.trustScore || 85}</span>
//                         </div>
//                         <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="text-gray-400 hover:text-red-400 text-sm font-medium">Logout</button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto p-6">
//                 {/* 1. AI INSIGHTS & STATS */}
//                 <header className="mb-10">
//                     <h1 className="text-4xl font-black uppercase italic tracking-tight">WELCOME BACK, {user?.name?.split(' ')[0]}!</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//                         <div className="md:col-span-2 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-6 rounded-3xl relative overflow-hidden group">
//                             <BrainCircuit className="absolute -bottom-2 -right-2 text-blue-500 opacity-10 w-32 h-32" />
//                             <h4 className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
//                                 <Sparkles size={14} className="animate-pulse" /> AI Smart Matcher
//                             </h4>
//                             <p className="text-lg font-medium text-gray-100 max-w-xl">
//                                 {isHelper 
//                                     ? `Found ${requests?.filter(r => r.aiRecommended).length || 0} tasks that perfectly match your skills. Your expertise is in high demand today!` 
//                                     : "Our AI is currently monitoring the community. High-quality descriptions get help 40% faster."}
//                             </p>
//                         </div>
//                         <div className="bg-[#1e293b] border border-gray-700 p-6 rounded-3xl flex flex-col justify-center items-center text-center">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Global Ranking</p>
//                             <span className="text-4xl font-black text-white mt-1">#42</span>
//                             <span className="text-blue-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">Top 5% of Helpers</span>
//                         </div>
//                     </div>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//                     {/* 2. REQUEST CREATION (SEEKER) */}
//                     {isSeeker && (
//                         <div className="lg:col-span-5">
//                             <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-700 sticky top-24 shadow-2xl">
//                                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase italic tracking-tighter text-blue-400">
//                                     <Target size={20} /> Deploy Request
//                                 </h2>
//                                 <div className="space-y-4">
//                                     <input 
//                                         type="text" 
//                                         placeholder="Brief title of your struggle..." 
//                                         className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all text-sm font-medium"
//                                         value={requestData.title}
//                                         onChange={(e) => setRequestData({...requestData, title: e.target.value})}
//                                     />
//                                     <textarea 
//                                         placeholder="Describe the issue... (AI will extract tags and urgency automatically)" 
//                                         className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl p-4 h-40 outline-none focus:border-blue-500 transition-all resize-none text-sm leading-relaxed"
//                                         value={requestData.description}
//                                         onChange={(e) => setRequestData({...requestData, description: e.target.value})}
//                                     />
//                                     <button 
//                                         onClick={() => createMutation.mutate(requestData)}
//                                         disabled={createMutation.isPending || !requestData.title}
//                                         className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/40 active:scale-95"
//                                     >
//                                         {createMutation.isPending ? <Loader2 className="animate-spin" /> : <><Sparkles size={18}/> Analyze & Post</>}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* 3. FEED SECTION */}
//                     <div className={`${isSeeker ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-black flex items-center gap-2 uppercase italic tracking-tight">
//                                 <LayoutDashboard className="text-blue-500" /> Live Feed
//                             </h2>
//                             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Total: {requests?.length || 0} Requests</span>
//                         </div>
                        
//                         <div className="grid grid-cols-1 gap-5">
//                             {!requests || requests.length === 0 ? (
//                                 <div className="p-20 border-2 border-dashed border-gray-800 rounded-3xl text-center bg-gray-900/20">
//                                     <p className="text-gray-500 font-medium italic tracking-widest uppercase">The community is currently silent...</p>
//                                 </div>
//                             ) : (
//                                 requests.map((req) => (
//                                     <div key={req._id} className={`bg-[#1e293b] p-6 rounded-3xl border ${req.aiRecommended ? 'border-blue-500/50 shadow-lg shadow-blue-500/5' : 'border-gray-800'} hover:border-gray-600 transition-all group relative overflow-hidden`}>
                                        
//                                         {/* Urgency & Match Badges */}
//                                         <div className="absolute top-0 right-0 flex">
//                                             {req.aiRecommended && (
//                                                 <div className="bg-blue-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-tighter rounded-bl-xl flex items-center gap-1">
//                                                     <Sparkles size={10} /> AI Recommended
//                                                 </div>
//                                             )}
//                                             <div className={`px-4 py-1 text-[9px] font-black uppercase tracking-tighter ${
//                                                 req.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'
//                                             } ${!req.aiRecommended ? 'rounded-bl-xl' : ''}`}>
//                                                 {req.urgency || 'Medium'} Urgency
//                                             </div>
//                                         </div>

//                                         <div className="flex flex-col md:flex-row justify-between gap-6">
//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-2 mb-2">
//                                                     <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-full">{req.category}</span>
//                                                     <span className="text-[9px] font-bold text-gray-600">ID: #{req._id.slice(-4)}</span>
//                                                 </div>
//                                                 <h3 className="text-xl font-black uppercase italic tracking-tight group-hover:text-blue-400 transition-colors">{req.title}</h3>
                                                
//                                                 {/* AI TL;DR Section - Important for Hackathon */}
//                                                 <div className="my-3 p-3 bg-blue-500/5 border-l-2 border-blue-500 rounded-r-xl">
//                                                     <p className="text-xs text-blue-300 font-semibold mb-1 flex items-center gap-1">
//                                                         <BrainCircuit size={12} /> AI Summary:
//                                                     </p>
//                                                     <p className="text-xs text-gray-300 italic">{req.aiSummary || "No summary generated."}</p>
//                                                 </div>

//                                                 <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">{req.description}</p>
                                                
//                                                 <div className="flex flex-wrap gap-2">
//                                                     {req.tags?.map((tag, idx) => (
//                                                         <span key={idx} className="text-[9px] font-bold bg-[#0f172a] text-gray-400 px-3 py-1 rounded-full border border-gray-800">#{tag}</span>
//                                                     ))}
//                                                 </div>
//                                             </div>
                                            
//                                             {isHelper && (
//                                                 <div className="flex items-center">
//                                                     <button 
//                                                         onClick={() => acceptMutation.mutate(req._id)}
//                                                         disabled={acceptMutation.isPending}
//                                                         className="w-full md:w-auto whitespace-nowrap bg-white text-black hover:bg-blue-500 hover:text-white px-8 py-3 rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-xl active:scale-95"
//                                                     >
//                                                         {acceptMutation.isPending ? "Connecting..." : "Rescue Now"}
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;







































// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../api/axios';
// import { 
//     LayoutDashboard, Send, CheckCircle, Loader2, 
//     User as UserIcon, Sparkles, Zap, Shield, BrainCircuit, Target
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
    
//     useEffect(() => {
//         if (!user) navigate('/login');
//     }, [user, navigate]);

//     // Fetch Requests with AI Matching (Passing helperId in query)
//     const { data: requests, isLoading } = useQuery({
//         queryKey: ['requests', user?._id],
//         queryFn: async () => {
//             const res = await api.get(`/requests`); 
//             return res.data;
//         },
//         enabled: !!user
//     });

//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', { ...newReq, userId: user?.id || user?._id }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("AI analyzed and posted your request!");
//         }
//     });

//     const acceptMutation = useMutation({
//         mutationFn: (requestId) => {
//             const helperId = user?._id || user?.id;
//             return api.put(`/requests/accept/${requestId}`, { helperId });
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             toast.success("Task accepted! You're a hero.");
//         }
//     });

//     if (isLoading) return (
//         <div className="h-screen flex items-center justify-center bg-[#0f172a]">
//             <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
//         </div>
//     );

//     const isSeeker = user?.role?.toLowerCase() === 'seeker' || user?.role?.toLowerCase() === 'both';
//     const isHelper = user?.role?.toLowerCase() === 'helper' || user?.role?.toLowerCase() === 'both';

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
//             {/* Navbar */}
//             <nav className="border-b border-gray-800 bg-[#1e293b]/50 p-4 sticky top-0 z-50 backdrop-blur-md">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//                         <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
//                             <Zap size={20} fill="white" />
//                         </div>
//                         <span className="text-xl font-black tracking-tighter italic uppercase">HELPLYTICS <span className="text-blue-500">AI</span></span>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
//                             <Shield size={12} className="text-green-400" />
//                             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Trust Score: {user?.trustScore || 85}</span>
//                         </div>
//                         <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="text-gray-400 hover:text-red-400 text-sm font-medium">Logout</button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto p-6">
//                 {/* 1. AI INSIGHTS & STATS */}
//                 <header className="mb-10">
//                     <h1 className="text-4xl font-black uppercase italic tracking-tight">WELCOME BACK, {user?.name?.split(' ')[0]}!</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//                         <div className="md:col-span-2 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-6 rounded-3xl relative overflow-hidden group">
//                             <BrainCircuit className="absolute -bottom-2 -right-2 text-blue-500 opacity-10 w-32 h-32" />
//                             <h4 className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
//                                 <Sparkles size={14} className="animate-pulse" /> AI Smart Matcher
//                             </h4>
//                             <p className="text-lg font-medium text-gray-100 max-w-xl">
//                                 {isHelper 
//                                     ? `Found ${requests?.filter(r => r.aiRecommended).length || 0} tasks that perfectly match your skills. Your expertise is in high demand today!` 
//                                     : "Our AI is currently monitoring the community. High-quality descriptions get help 40% faster."}
//                             </p>
//                         </div>
//                         <div className="bg-[#1e293b] border border-gray-700 p-6 rounded-3xl flex flex-col justify-center items-center text-center">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Global Ranking</p>
//                             <span className="text-4xl font-black text-white mt-1">#42</span>
//                             <span className="text-blue-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">Top 5% of Helpers</span>
//                         </div>
//                     </div>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//                     {/* 2. REQUEST CREATION (SEEKER) */}
//                     {isSeeker && (
//                         <div className="lg:col-span-5">
//                             <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-700 sticky top-24 shadow-2xl">
//                                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase italic tracking-tighter text-blue-400">
//                                     <Target size={20} /> Deploy Request
//                                 </h2>
//                                 <div className="space-y-4">
//                                     <input 
//                                         type="text" 
//                                         placeholder="Brief title of your struggle..." 
//                                         className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500 transition-all text-sm font-medium"
//                                         value={requestData.title}
//                                         onChange={(e) => setRequestData({...requestData, title: e.target.value})}
//                                     />
//                                     <textarea 
//                                         placeholder="Describe the issue... (AI will extract tags and urgency automatically)" 
//                                         className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl p-4 h-40 outline-none focus:border-blue-500 transition-all resize-none text-sm leading-relaxed"
//                                         value={requestData.description}
//                                         onChange={(e) => setRequestData({...requestData, description: e.target.value})}
//                                     />
//                                     <button 
//                                         onClick={() => createMutation.mutate(requestData)}
//                                         disabled={createMutation.isPending || !requestData.title}
//                                         className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/40 active:scale-95"
//                                     >
//                                         {createMutation.isPending ? <Loader2 className="animate-spin" /> : <><Sparkles size={18}/> Analyze & Post</>}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* 3. FEED SECTION */}
//                     <div className={`${isSeeker ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-black flex items-center gap-2 uppercase italic tracking-tight">
//                                 <LayoutDashboard className="text-blue-500" /> Live Feed
//                             </h2>
//                             <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Total: {requests?.length || 0} Requests</span>
//                         </div>
                        
//                         <div className="grid grid-cols-1 gap-5">
//                             {!requests || requests.length === 0 ? (
//                                 <div className="p-20 border-2 border-dashed border-gray-800 rounded-3xl text-center bg-gray-900/20">
//                                     <p className="text-gray-500 font-medium italic tracking-widest uppercase">The community is currently silent...</p>
//                                 </div>
//                             ) : (
//                                 requests.map((req) => (
//                                     <div key={req._id} className={`bg-[#1e293b] p-6 rounded-3xl border ${req.aiRecommended ? 'border-blue-500/50 shadow-lg shadow-blue-500/5' : 'border-gray-800'} hover:border-gray-600 transition-all group relative overflow-hidden`}>
                                        
//                                         {/* Urgency & Match Badges */}
//                                         <div className="absolute top-0 right-0 flex">
//                                             {req.aiRecommended && (
//                                                 <div className="bg-blue-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-tighter rounded-bl-xl flex items-center gap-1">
//                                                     <Sparkles size={10} /> AI Recommended
//                                                 </div>
//                                             )}
//                                             <div className={`px-4 py-1 text-[9px] font-black uppercase tracking-tighter ${
//                                                 req.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'
//                                             } ${!req.aiRecommended ? 'rounded-bl-xl' : ''}`}>
//                                                 {req.urgency || 'Medium'} Urgency
//                                             </div>
//                                         </div>

//                                         <div className="flex flex-col md:flex-row justify-between gap-6">
//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-2 mb-2">
//                                                     <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-full">{req.category}</span>
//                                                     <span className="text-[9px] font-bold text-gray-600">ID: #{req._id.slice(-4)}</span>
//                                                 </div>
//                                                 <h3 className="text-xl font-black uppercase italic tracking-tight group-hover:text-blue-400 transition-colors">{req.title}</h3>
                                                
//                                                 {/* AI TL;DR Section - Important for Hackathon */}
//                                                 <div className="my-3 p-3 bg-blue-500/5 border-l-2 border-blue-500 rounded-r-xl">
//                                                     <p className="text-xs text-blue-300 font-semibold mb-1 flex items-center gap-1">
//                                                         <BrainCircuit size={12} /> AI Summary:
//                                                     </p>
//                                                     <p className="text-xs text-gray-300 italic">{req.aiSummary || "No summary generated."}</p>
//                                                 </div>

//                                                 <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">{req.description}</p>
                                                
//                                                 <div className="flex flex-wrap gap-2">
//                                                     {req.tags?.map((tag, idx) => (
//                                                         <span key={idx} className="text-[9px] font-bold bg-[#0f172a] text-gray-400 px-3 py-1 rounded-full border border-gray-800">#{tag}</span>
//                                                     ))}
//                                                 </div>
//                                             </div>
                                            
//                                             {isHelper && (
//                                                 <div className="flex items-center">
//                                                     <button 
//                                                         onClick={() => acceptMutation.mutate(req._id)}
//                                                         disabled={acceptMutation.isPending}
//                                                         className="w-full md:w-auto whitespace-nowrap bg-white text-black hover:bg-blue-500 hover:text-white px-8 py-3 rounded-2xl font-black uppercase italic tracking-widest transition-all shadow-xl active:scale-95"
//                                                     >
//                                                         {acceptMutation.isPending ? "Connecting..." : "Rescue Now"}
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };











// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../api/axios';
// import { 
//     LayoutDashboard, Send, CheckCircle, Loader2, 
//     User as UserIcon, Sparkles, Zap, Shield, BrainCircuit, Target
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     // Get fresh user data from localStorage
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
//     const userId = user?._id || user?.id;

//     useEffect(() => {
//         if (!user) navigate('/login');
//     }, [user, navigate]);

//     // 1. DYNAMIC FETCH: Query mein helperId bhej rahe hain matching ke liye
//     const { data: requests, isLoading } = useQuery({
//         queryKey: ['requests', userId],
//         queryFn: async () => {
//             const res = await api.get(`/requests?helperId=${userId}`); 
//             return res.data;
//         },
//         enabled: !!userId
//     });

//     // 2. CREATE REQUEST MUTATION
//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', { ...newReq, userId }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("AI analyzed and posted your request!");
//         }
//     });

//     // 3. ACCEPT REQUEST MUTATION (With Local Stats Update)
//     const acceptMutation = useMutation({
//         mutationFn: (requestId) => api.put(`/requests/accept/${requestId}`, { helperId: userId }),
//         onSuccess: (response) => {
//             queryClient.invalidateQueries(['requests']);
            
//             // Logic: Update local user stats for instant UI feedback
//             const updatedUser = { 
//                 ...user, 
//                 totalSolved: (user.totalSolved || 0) + 1,
//                 trustScore: (user.trustScore || 85) + 5 
//             };
//             localStorage.setItem('user', JSON.stringify(updatedUser));
            
//             toast.success("Task accepted! Your stats have improved.");
//         }
//     });

//     if (isLoading) return (
//         <div className="h-screen flex items-center justify-center bg-[#0f172a]">
//             <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
//         </div>
//     );

//     const isSeeker = user?.role?.toLowerCase() === 'seeker' || user?.role?.toLowerCase() === 'both';
//     const isHelper = user?.role?.toLowerCase() === 'helper' || user?.role?.toLowerCase() === 'both';

//     return (
//         <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
//             {/* Navbar */}
//             <nav className="border-b border-gray-800 bg-[#1e293b]/50 p-4 sticky top-0 z-50 backdrop-blur-md">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//                         <div className="bg-blue-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
//                             <Zap size={20} fill="white" />
//                         </div>
//                         <span className="text-xl font-black tracking-tighter italic uppercase">HELPLYTICS <span className="text-blue-500">AI</span></span>
//                     </div>
//                     <div className="flex items-center gap-4">
//                         <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gray-800 rounded-full border border-gray-700">
//                             <Shield size={12} className="text-green-400" />
//                             <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">
//                                 Trust Score: {user?.trustScore || 85}
//                             </span>
//                         </div>
//                         <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="text-gray-400 hover:text-red-400 text-sm font-medium">Logout</button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto p-6">
//                 {/* 1. AI INSIGHTS & STATS */}
//                 <header className="mb-10">
//                     <h1 className="text-4xl font-black uppercase italic tracking-tight">WELCOME BACK, {user?.name?.split(' ')[0]}!</h1>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//                         <div className="md:col-span-2 bg-gradient-to-br from-blue-900/40 to-purple-900/40 border border-blue-500/30 p-6 rounded-3xl relative overflow-hidden">
//                             <BrainCircuit className="absolute -bottom-2 -right-2 text-blue-500 opacity-10 w-32 h-32" />
//                             <h4 className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-[0.2em] mb-2">
//                                 <Sparkles size={14} className="animate-pulse" /> AI Smart Matcher
//                             </h4>
//                             <p className="text-lg font-medium text-gray-100 max-w-xl">
//                                 {isHelper 
//                                     ? `Found ${requests?.filter(r => r.aiRecommended).length || 0} tasks matching your skills: ${user?.skills?.slice(0,3).join(', ')}...` 
//                                     : "Our AI is analyzing community needs. Detailed requests get faster responses."}
//                             </p>
//                         </div>
//                         <div className="bg-[#1e293b] border border-gray-700 p-6 rounded-3xl flex flex-col justify-center items-center text-center">
//                             <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Tasks Solved</p>
//                             <span className="text-4xl font-black text-white mt-1">{user?.totalSolved || 0}</span>
//                             <span className="text-blue-500 text-[10px] font-bold mt-1 uppercase tracking-tighter">Global Rank: #{user?.ranking || '99+'}</span>
//                         </div>
//                     </div>
//                 </header>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//                     {/* 2. REQUEST CREATION (SEEKER) */}
//                     {isSeeker && (
//                         <div className="lg:col-span-5">
//                             <div className="bg-[#1e293b] p-8 rounded-3xl border border-gray-700 sticky top-24 shadow-2xl">
//                                 <h2 className="text-xl font-bold mb-6 flex items-center gap-2 uppercase italic tracking-tighter text-blue-400">
//                                     <Target size={20} /> Deploy Request
//                                 </h2>
//                                 <div className="space-y-4">
//                                     <input 
//                                         type="text" 
//                                         placeholder="Brief title..." 
//                                         className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl p-4 outline-none focus:border-blue-500 text-sm"
//                                         value={requestData.title}
//                                         onChange={(e) => setRequestData({...requestData, title: e.target.value})}
//                                     />
//                                     <textarea 
//                                         placeholder="Describe the issue... AI will handle categorization." 
//                                         className="w-full bg-[#0f172a] border border-gray-700 rounded-2xl p-4 h-40 outline-none focus:border-blue-500 resize-none text-sm"
//                                         value={requestData.description}
//                                         onChange={(e) => setRequestData({...requestData, description: e.target.value})}
//                                     />
//                                     <button 
//                                         onClick={() => createMutation.mutate(requestData)}
//                                         disabled={createMutation.isPending || !requestData.title}
//                                         className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
//                                     >
//                                         {createMutation.isPending ? <Loader2 className="animate-spin" /> : <><Sparkles size={18}/> Analyze & Post</>}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* 3. FEED SECTION */}
//                     <div className={`${isSeeker ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
//                         <div className="flex justify-between items-center mb-6">
//                             <h2 className="text-2xl font-black flex items-center gap-2 uppercase italic tracking-tight">
//                                 <LayoutDashboard className="text-blue-500" /> Live Feed
//                             </h2>
//                         </div>
                        
//                         <div className="grid grid-cols-1 gap-5">
//                             {!requests || requests.length === 0 ? (
//                                 <div className="p-20 border-2 border-dashed border-gray-800 rounded-3xl text-center">
//                                     <p className="text-gray-500 font-medium italic uppercase">The community is currently silent...</p>
//                                 </div>
//                             ) : (
//                                 requests.map((req) => (
//                                     <div key={req._id} className={`bg-[#1e293b] p-6 rounded-3xl border ${req.aiRecommended ? 'border-blue-500/50 shadow-lg shadow-blue-500/5' : 'border-gray-800'} hover:border-gray-600 transition-all relative overflow-hidden group`}>
                                        
//                                         {/* AI Matcher Badge */}
//                                         <div className="absolute top-0 right-0 flex">
//                                             {req.aiRecommended && (
//                                                 <div className="bg-blue-600 text-white px-3 py-1 text-[9px] font-black uppercase rounded-bl-xl flex items-center gap-1">
//                                                     <Sparkles size={10} /> AI Match
//                                                 </div>
//                                             )}
//                                             <div className={`px-4 py-1 text-[9px] font-black uppercase ${req.urgency === 'High' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'} ${!req.aiRecommended ? 'rounded-bl-xl' : ''}`}>
//                                                 {req.urgency || 'Medium'}
//                                             </div>
//                                         </div>

//                                         <div className="flex flex-col md:flex-row justify-between gap-6">
//                                             <div className="flex-1">
//                                                 <div className="flex items-center gap-2 mb-2">
//                                                     <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded-full">{req.category}</span>
//                                                 </div>
//                                                 <h3 className="text-xl font-black uppercase italic tracking-tight group-hover:text-blue-400 transition-colors">{req.title}</h3>
                                                
//                                                 {/* AI TL;DR Summary */}
//                                                 <div className="my-3 p-3 bg-blue-500/5 border-l-2 border-blue-500 rounded-r-xl">
//                                                     <p className="text-xs text-blue-300 font-semibold mb-1 flex items-center gap-1">
//                                                         <BrainCircuit size={12} /> AI Summary:
//                                                     </p>
//                                                     <p className="text-xs text-gray-300 italic">{req.aiSummary || "Matching your expertise..."}</p>
//                                                 </div>

//                                                 <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">{req.description}</p>
                                                
//                                                 <div className="flex flex-wrap gap-2">
//                                                     {req.tags?.map((tag, idx) => (
//                                                         <span key={idx} className="text-[9px] font-bold bg-[#0f172a] text-gray-400 px-3 py-1 rounded-full border border-gray-800">#{tag}</span>
//                                                     ))}
//                                                 </div>
//                                             </div>
                                            
//                                             {isHelper && (
//                                                 <div className="flex items-center">
//                                                     <button 
//                                                         onClick={() => acceptMutation.mutate(req._id)}
//                                                         disabled={acceptMutation.isPending}
//                                                         className="w-full md:w-auto bg-white text-black hover:bg-blue-500 hover:text-white px-8 py-3 rounded-2xl font-black uppercase italic transition-all active:scale-95 disabled:opacity-50"
//                                                     >
//                                                         {acceptMutation.isPending ? "Connecting..." : "Rescue Now"}
//                                                     </button>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;


























































// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { 
//     Loader2, 
//     BrainCircuit, 
//     ShieldCheck, 
// } from 'lucide-react';

// // API import - Ensure this path is correct in your project
// import api from '../api/axios'; 

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     // Auth Check
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
//     const userId = user?._id || user?.id;

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     // Fetch Requests/Messages
//     const { data: requests = [], isLoading, isError } = useQuery({
//         queryKey: ['requests', userId],
//         queryFn: async () => {
//             const res = await api.get(`/requests?userId=${userId}`); 
//             return res.data;
//         },
//         enabled: !!userId,
//         retry: 1
//     });

//     // Create Message Mutation
//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', { ...newReq, userId }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("Message sent to the community!");
//         },
//         onError: (error) => {
//             toast.error(error.response?.data?.message || "Failed to send message");
//         }
//     });

//     const handleSend = () => {
//         if (!requestData.description.trim()) return;
//         createMutation.mutate(requestData);
//     };

//     if (isLoading) return (
//         <div className="h-screen flex items-center justify-center bg-[#fcfaf7]">
//             <Loader2 className="animate-spin text-[#0e8a74] w-10 h-10" />
//         </div>
//     );

//     return (
//         <div className="min-h-screen bg-[#fcfaf7] text-[#112623] font-sans selection:bg-[#0e8a74] selection:text-white">
//             {/* Header Navigation */}
//             <nav className="bg-white/60 backdrop-blur-md sticky top-0 z-50 p-4 border-b border-gray-100">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//                         <div className="bg-[#0e8a74] p-1.5 rounded-lg text-white">
//                             <ShieldCheck size={20} />
//                         </div>
//                         <span className="text-xl font-bold tracking-tight">HelpHub AI</span>
//                     </div>
//                     <div className="flex items-center gap-8">
//                         <span className="text-sm font-semibold text-gray-400 hover:text-[#0e8a74] cursor-pointer">Dashboard</span>
//                         <span className="text-sm font-semibold text-gray-400 hover:text-[#0e8a74] cursor-pointer">Explore</span>
//                         <span className="bg-[#e2f1ee] text-[#0e8a74] px-4 py-1.5 rounded-full text-sm font-bold">Messages</span>
//                         <button 
//                             onClick={() => { localStorage.clear(); navigate('/login'); }} 
//                             className="text-gray-400 hover:text-red-500 text-sm font-bold transition-colors"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto p-6 lg:p-12">
//                 {/* Hero Banner */}
//                 <div className="bg-[#1a2523] rounded-[40px] p-10 lg:p-16 mb-12 relative overflow-hidden shadow-2xl">
//                     <div className="relative z-10 max-w-2xl">
//                         <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-4">Interaction / Messaging</p>
//                         <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
//                             Keep support moving through direct communication.
//                         </h1>
//                         <p className="text-gray-400 text-lg">
//                             Basic messaging gives helpers and requesters a clear follow-up path once a match happens.
//                         </p>
//                     </div>
//                     <BrainCircuit className="absolute top-1/2 -right-10 -translate-y-1/2 text-white opacity-5 w-96 h-96 pointer-events-none" />
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    
//                     {/* Recent Messages (Left Column) */}
//                     <div className="lg:col-span-7 bg-[#f7f2ed] rounded-[40px] p-8 lg:p-10 border border-[#eee8e2]">
//                         <div className="mb-8">
//                             <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-2">Conversation Stream</p>
//                             <h2 className="text-4xl font-bold">Recent messages</h2>
//                         </div>

//                         <div className="space-y-4">
//                             {requests.length === 0 ? (
//                                 <div className="bg-white p-12 rounded-[32px] border border-dashed border-gray-200 text-center">
//                                     <p className="italic text-gray-400">No active conversations yet.</p>
//                                 </div>
//                             ) : (
//                                 requests.map((req) => (
//                                     <div key={req._id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex justify-between items-start hover:border-[#0e8a74]/30 transition-all duration-300">
//                                         <div className="flex-1 pr-4">
//                                             <div className="flex items-center gap-2 mb-2">
//                                                 <h3 className="font-bold text-lg">{req.title || "Support Request"}</h3>
//                                                 <span className="text-[10px] bg-[#fcfaf7] text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">
//                                                     #{req._id?.slice(-4)}
//                                                 </span>
//                                             </div>
//                                             <p className="text-gray-500 text-sm leading-relaxed">{req.description}</p>
//                                         </div>
//                                         <div className="bg-[#e2f1ee] px-3 py-4 rounded-full flex flex-col items-center justify-center min-w-[70px]">
//                                             <span className="text-[10px] font-black text-[#0e8a74] uppercase">New</span>
//                                             <span className="text-[10px] font-bold text-[#0e8a74]">09:45 AM</span>
//                                         </div>
//                                     </div>
//                                 ))
//                             )}
//                         </div>
//                     </div>

//                     {/* Send Message Form (Right Column) */}
//                     <div className="lg:col-span-5 bg-[#f7f2ed] rounded-[40px] p-8 lg:p-10 border border-[#eee8e2] h-fit sticky top-28">
//                         <div className="mb-8">
//                             <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-2">Send Message</p>
//                             <h2 className="text-4xl font-bold">Start a conversation</h2>
//                         </div>

//                         <div className="space-y-6">
//                             <div>
//                                 <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">To</label>
//                                 <div className="bg-white border border-gray-200 rounded-2xl p-4 text-sm font-semibold text-gray-400 flex justify-between items-center cursor-not-allowed shadow-sm">
//                                     Community Helpers <span>▼</span>
//                                 </div>
//                             </div>

//                             <div>
//                                 <label className="block text-xs font-black uppercase text-gray-400 mb-2 ml-1">Message</label>
//                                 <textarea 
//                                     placeholder="Share support details, ask for files, or suggest next steps." 
//                                     className="w-full bg-white border border-gray-200 rounded-[32px] p-6 h-48 outline-none focus:ring-2 focus:ring-[#0e8a74]/20 focus:border-[#0e8a74] text-sm text-[#112623] placeholder-gray-300 resize-none transition-all shadow-sm"
//                                     value={requestData.description}
//                                     onChange={(e) => setRequestData({
//                                         description: e.target.value, 
//                                         title: e.target.value.slice(0, 25) + (e.target.value.length > 25 ? '...' : '')
//                                     })}
//                                 />
//                             </div>

//                             <button 
//                                 onClick={handleSend}
//                                 disabled={createMutation.isPending || !requestData.description.trim()}
//                                 className="w-full bg-[#0e8a74] hover:bg-[#0a6b5a] text-white py-5 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#0e8a74]/20"
//                             >
//                                 {createMutation.isPending ? (
//                                     <Loader2 className="animate-spin" size={24} />
//                                 ) : (
//                                     "Send"
//                                 )}
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;











// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { 
//     ShieldCheck, 
//     BrainCircuit,
//     LogOut 
// } from 'lucide-react';

// const HelperDashboard = () => {
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         localStorage.clear(); // Clear session
//         navigate('/login'); // Redirect to login
//     };

//     const recommendations = [
//         {
//             id: 1,
//             title: "Need help",
//             summary: "AI summary: Web Development request with high urgency. Best suited for members with relevant expertise.",
//             tags: ["Web Development", "High"],
//             colors: { tag: "bg-[#e2f1ee] text-[#0e8a74]", urgency: "bg-[#fcfaf7] text-[#0e8a74]" }
//         },
//         {
//             id: 2,
//             title: "Need help making my portfolio responsive before demo day",
//             summary: "Responsive layout issue with a short deadline. Best helpers are frontend mentors comfortable with CSS grids and media queries.",
//             tags: ["Web Development", "High"],
//             colors: { tag: "bg-[#e2f1ee] text-[#0e8a74]", urgency: "bg-[#fcfaf7] text-[#0e8a74]" }
//         },
//         {
//             id: 3,
//             title: "Looking for Figma feedback on a volunteer event poster",
//             summary: "A visual design critique request where feedback on hierarchy, spacing, and messaging would create the most value.",
//             tags: ["Design", "Medium"],
//             colors: { tag: "bg-[#f7f2ed] text-gray-600", urgency: "bg-[#fcfaf7] text-gray-500" }
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-[#fcfaf7] text-[#112623] font-sans selection:bg-[#0e8a74] selection:text-white">
            
//             {/* Top Dark Hero Section */}
//             <div className="p-6 lg:p-10">
//                 <div className="max-w-7xl mx-auto bg-[#1a2523] rounded-[40px] p-10 lg:p-16 relative overflow-hidden shadow-2xl">
//                     <div className="relative z-10 max-w-3xl">
//                         <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-4">AI Center</p>
//                         <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
//                             See what the platform intelligence is noticing.
//                         </h1>
//                         <p className="text-gray-400 text-lg lg:text-xl max-w-2xl">
//                             AI-like insights summarize demand trends, helper readiness, urgency signals, and request recommendations.
//                         </p>
//                     </div>
//                     <BrainCircuit className="absolute top-1/2 -right-10 -translate-y-1/2 text-white opacity-5 w-96 h-96 pointer-events-none" />
//                 </div>
//             </div>

//             {/* Navigation Bar with Logout */}
//             <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex justify-between items-center mb-10">
//                 <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//                     <div className="bg-[#0e8a74] p-1.5 rounded-lg text-white shadow-lg shadow-[#0e8a74]/20">
//                         <ShieldCheck size={20} />
//                     </div>
//                     <span className="text-xl font-bold tracking-tight text-[#112623]">HelpHub AI</span>
//                 </div>
                
//                 <div className="flex items-center gap-6 lg:gap-8">
//                     <span 
//                         className="text-sm font-semibold text-gray-400 hover:text-[#0e8a74] cursor-pointer transition-colors" 
//                         onClick={() => navigate('/dashboard')}
//                     >
//                         Dashboard
//                     </span>
//                     <span 
//                         className="text-sm font-semibold text-gray-400 hover:text-[#0e8a74] cursor-pointer transition-colors"
//                         onClick={() => navigate('/create-request')}
//                     >
//                         Create Request
//                     </span>
//                     <span className="bg-[#e2f1ee] text-[#0e8a74] px-5 py-2 rounded-full text-sm font-bold border border-[#0e8a74]/10">
//                         AI Center
//                     </span>
                    
//                     {/* Logout Button Added */}
//                     <button 
//                         onClick={handleLogout}
//                         className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-all group"
//                     >
//                         <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
//                         Logout
//                     </button>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
//                 {/* Stats Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//                     <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
//                         <p className="text-[#0e8a74] uppercase tracking-widest text-[10px] font-black mb-4">Trend Pulse</p>
//                         <h3 className="text-3xl font-bold mb-3 leading-tight">Web Development</h3>
//                         <p className="text-gray-400 text-sm leading-relaxed">Most common support area based on active community requests.</p>
//                     </div>
                    
//                     <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
//                         <p className="text-[#0e8a74] uppercase tracking-widest text-[10px] font-black mb-4">Urgency Watch</p>
//                         <h3 className="text-5xl font-bold mb-3">2</h3>
//                         <p className="text-gray-400 text-sm leading-relaxed">Requests currently flagged high priority by the urgency detector.</p>
//                     </div>

//                     <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm transition-transform hover:scale-[1.02]">
//                         <p className="text-[#0e8a74] uppercase tracking-widest text-[10px] font-black mb-4">Mentor Pool</p>
//                         <h3 className="text-5xl font-bold mb-3">2</h3>
//                         <p className="text-gray-400 text-sm leading-relaxed">Trusted helpers with strong response history and contribution signals.</p>
//                     </div>
//                 </div>

//                 {/* AI Recommendations Section */}
//                 <div className="bg-[#f7f2ed] rounded-[40px] p-8 lg:p-12 border border-[#eee8e2]">
//                     <div className="mb-10">
//                         <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-3">AI Recommendations</p>
//                         <h2 className="text-4xl lg:text-5xl font-bold tracking-tight">Requests needing attention</h2>
//                     </div>

//                     <div className="space-y-6">
//                         {recommendations.map((item) => (
//                             <div 
//                                 key={item.id} 
//                                 className="bg-white p-8 rounded-[32px] border border-gray-100 group hover:border-[#0e8a74]/30 hover:shadow-xl hover:shadow-[#0e8a74]/5 transition-all duration-300 cursor-pointer"
//                             >
//                                 <h4 className="text-xl font-bold mb-3 group-hover:text-[#0e8a74] transition-colors">{item.title}</h4>
//                                 <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-4xl">{item.summary}</p>
                                
//                                 <div className="flex items-center gap-3">
//                                     <span className={`px-4 py-1.5 rounded-full text-xs font-bold border border-gray-50 ${item.colors.tag}`}>
//                                         {item.tags[0]}
//                                     </span>
//                                     <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border border-gray-50 ${item.colors.urgency}`}>
//                                         {item.tags[1]}
//                                     </span>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default HelperDashboard;





















// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { 
//     Loader2, 
//     BrainCircuit, 
//     ShieldCheck, 
//     LogOut,
//     MessageSquare,
//     Zap,
//     Users
// } from 'lucide-react';

// // API import
// import api from '../api/axios'; 

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     // Auth Check & Role Detection
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
//     const userId = user?._id || user?.id;
    
//     // Logical Check: Yahan hum determine kar rahe hain ke helper hai ya seeker
//     const isHelper = user?.role === 'helper'; 

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     // Fetch Requests logic
//     const { data: requests = [], isLoading } = useQuery({
//         queryKey: ['requests', userId],
//         queryFn: async () => {
//             const endpoint = isHelper ? '/requests/all' : `/requests?userId=${userId}`; 
//             const res = await api.get(endpoint); 
//             return res.data;
//         },
//         enabled: !!userId,
//         retry: 1
//     });

//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', { ...newReq, userId }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("Request sent to the community!");
//         },
//         onError: (error) => {
//             toast.error(error.response?.data?.message || "Failed to send");
//         }
//     });

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate('/login');
//     };

//     const handleSend = () => {
//         if (!requestData.description.trim()) return;
//         createMutation.mutate(requestData);
//     };

//     if (isLoading) return (
//         <div className="h-screen flex items-center justify-center bg-[#fcfaf7]">
//             <Loader2 className="animate-spin text-[#0e8a74] w-10 h-10" />
//         </div>
//     );

//     // -------------------------------------------------------------------------
//     // SHARED NAVBAR
//     // -------------------------------------------------------------------------
//     const Navigation = () => (
//         <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex justify-between items-center">
//             <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//                 <div className="bg-[#0e8a74] p-1.5 rounded-lg text-white shadow-lg shadow-[#0e8a74]/20">
//                     <ShieldCheck size={20} />
//                 </div>
//                 <span className="text-xl font-bold tracking-tight">HelpHub AI</span>
//             </div>
//             <div className="flex items-center gap-6">
//                 <span className="text-sm font-semibold text-gray-400 cursor-default">Dashboard</span>
//                 <span className="bg-[#e2f1ee] text-[#0e8a74] px-5 py-2 rounded-full text-sm font-bold border border-[#0e8a74]/10">
//                     {isHelper ? 'AI Center' : 'Messages'}
//                 </span>
//                 <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-all group">
//                     <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
//                     Logout
//                 </button>
//             </div>
//         </nav>
//     );

//     return (
//         <div className="min-h-screen bg-[#fcfaf7] text-[#112623] font-sans selection:bg-[#0e8a74] selection:text-white">
//             <Navigation />

//             <main className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
//                 {/* HERO SECTION - Changes based on role */}
//                 <div className="bg-[#1a2523] rounded-[40px] p-10 lg:p-16 relative overflow-hidden shadow-2xl mb-12">
//                     <div className="relative z-10 max-w-3xl">
//                         <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-4">
//                             {isHelper ? 'Helper Intelligence' : 'Interaction / Messaging'}
//                         </p>
//                         <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
//                             {isHelper 
//                                 ? "See what the platform intelligence is noticing." 
//                                 : "Keep support moving through direct communication."}
//                         </h1>
//                         <p className="text-gray-400 text-lg lg:text-xl max-w-2xl">
//                             {isHelper 
//                                 ? "AI-driven insights summarize demand trends and help you find where you are needed most."
//                                 : "Basic messaging gives helpers and requesters a clear follow-up path once a match happens."}
//                         </p>
//                     </div>
//                     <BrainCircuit className="absolute top-1/2 -right-10 -translate-y-1/2 text-white opacity-5 w-96 h-96 pointer-events-none" />
//                 </div>

//                 {isHelper ? (
//                     // HELPER SPECIFIC CONTENT
//                     <div className="space-y-12">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
//                                 <h3 className="text-3xl font-bold">Web Dev</h3>
//                                 <p className="text-gray-400 text-sm font-bold uppercase">Active Trend</p>
//                             </div>
//                             <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
//                                 <h3 className="text-5xl font-bold">2</h3>
//                                 <p className="text-red-500 text-sm font-bold uppercase">High Urgency</p>
//                             </div>
//                             <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
//                                 <div className="bg-[#e2f1ee] w-fit p-2 rounded-lg text-[#0e8a74]"><Zap size={20} fill="currentColor"/></div>
//                                 <p className="text-gray-400 text-sm font-bold uppercase">Verified Mentor</p>
//                             </div>
//                         </div>

//                         <div className="bg-[#f7f2ed] rounded-[40px] p-8 lg:p-12 border border-[#eee8e2]">
//                             <h2 className="text-4xl font-bold mb-10">Recommended for you</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {requests.slice(0, 4).map((req) => (
//                                     <div key={req._id} className="bg-white p-8 rounded-[32px] border border-gray-100 hover:border-[#0e8a74]/30 transition-all cursor-pointer group">
//                                         <div className="flex justify-between mb-4">
//                                             <span className="bg-[#e2f1ee] text-[#0e8a74] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">New Task</span>
//                                             <span className="text-gray-300 font-mono text-xs">#{req._id?.slice(-4)}</span>
//                                         </div>
//                                         <h4 className="font-bold text-xl mb-2 group-hover:text-[#0e8a74] transition-colors">{req.title}</h4>
//                                         <p className="text-gray-500 text-sm line-clamp-2 mb-6">{req.description}</p>
//                                         <button className="w-full py-4 bg-[#fcfaf7] rounded-2xl font-bold text-[#0e8a74] hover:bg-[#0e8a74] hover:text-white transition-all">
//                                             I can help
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     // SEEKER/MESSAGING SPECIFIC CONTENT
//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//                         <div className="lg:col-span-7 bg-[#f7f2ed] rounded-[40px] p-8 lg:p-10 border border-[#eee8e2]">
//                             <div className="mb-8">
//                                 <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-2">Conversation Stream</p>
//                                 <h2 className="text-4xl font-bold">Recent messages</h2>
//                             </div>
//                             <div className="space-y-4">
//                                 {requests.length === 0 ? (
//                                     <div className="bg-white p-12 rounded-[32px] border border-dashed border-gray-200 text-center italic text-gray-400">
//                                         No active conversations yet.
//                                     </div>
//                                 ) : (
//                                     requests.map((req) => (
//                                         <div key={req._id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex justify-between items-center group hover:border-[#0e8a74]/40 transition-all">
//                                             <div className="flex gap-4 items-center">
//                                                 <div className="bg-[#fcfaf7] p-3 rounded-2xl text-gray-400 group-hover:text-[#0e8a74] transition-colors">
//                                                     <MessageSquare size={24} />
//                                                 </div>
//                                                 <div>
//                                                     <h3 className="font-bold text-lg">{req.title || "Support Request"}</h3>
//                                                     <p className="text-gray-500 text-sm line-clamp-1">{req.description}</p>
//                                                 </div>
//                                             </div>
//                                             <div className="bg-[#e2f1ee] px-3 py-2 rounded-full text-[10px] font-black text-[#0e8a74]">NEW</div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>

//                         <div className="lg:col-span-5 bg-[#f7f2ed] rounded-[40px] p-8 lg:p-10 border border-[#eee8e2] h-fit sticky top-10">
//                             <h2 className="text-4xl font-bold mb-8">Start a chat</h2>
//                             <div className="space-y-6">
//                                 <textarea 
//                                     placeholder="Describe what you need help with..." 
//                                     className="w-full bg-white border border-gray-200 rounded-[32px] p-6 h-48 outline-none focus:ring-4 focus:ring-[#0e8a74]/5 focus:border-[#0e8a74] text-sm shadow-sm resize-none transition-all"
//                                     value={requestData.description}
//                                     onChange={(e) => setRequestData({
//                                         description: e.target.value, 
//                                         title: e.target.value.slice(0, 25) + (e.target.value.length > 25 ? '...' : '')
//                                     })}
//                                 />
//                                 <button 
//                                     onClick={handleSend}
//                                     disabled={createMutation.isPending || !requestData.description.trim()}
//                                     className="w-full bg-[#0e8a74] text-white py-5 rounded-full font-bold text-lg hover:bg-[#0a6b5a] transition-all disabled:opacity-50 shadow-lg shadow-[#0e8a74]/20 active:scale-95"
//                                 >
//                                     {createMutation.isPending ? "Sending..." : "Send to Community"}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default Dashboard;




































// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { 
//     Loader2, 
//     BrainCircuit, 
//     ShieldCheck, 
//     LogOut,
//     MessageSquare,
//     Zap,
//     Users
// } from 'lucide-react';

// // API import
// import api from '../api/axios'; 

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     // Auth Check & Role Detection
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
//     const userId = user?._id || user?.id;
    
//     // Logical Check: Yahan hum determine kar rahe hain ke helper hai ya seeker
//     const isHelper = user?.role === 'helper'; 

//     useEffect(() => {
//         if (!user) {
//             navigate('/login');
//         }
//     }, [user, navigate]);

//     // Fetch Requests logic
//     const { data: requests = [], isLoading } = useQuery({
//         queryKey: ['requests', userId],
//         queryFn: async () => {
//              const res = await api.get(`/requests`, { params: { helperId: userId } }); 
//             return res.data;
//         },
//         enabled: !!userId,
//         retry: 1
//     });

//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', { ...newReq, userId }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("Request sent to the community!");
//         },
//         onError: (error) => {
//             toast.error(error.response?.data?.message || "Failed to send");
//         }
//     });

//     const handleLogout = () => {
//         localStorage.clear();
//         navigate('/login');
//     };

//     const handleSend = () => {
//         if (!requestData.description.trim()) return;
//         createMutation.mutate(requestData);
//     };

//     if (isLoading) return (
//         <div className="h-screen flex items-center justify-center bg-[#fcfaf7]">
//             <Loader2 className="animate-spin text-[#0e8a74] w-10 h-10" />
//         </div>
//     );
//     const acceptMutation = useMutation({
//         mutationFn: (requestId) => api.put(`/requests/accept/${requestId}`, { helperId: userId }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             const updatedUser = { 
//                 ...user, 
//                 totalSolved: (user.totalSolved || 0) + 1,
//             };
//             localStorage.setItem('user', JSON.stringify(updatedUser));
//             toast.success("RESCUE UNIT DEPLOYED!");
//         }
//     });

//     // -------------------------------------------------------------------------
//     // SHARED NAVBAR
//     // -------------------------------------------------------------------------
//     const Navigation = () => (
//         <nav className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex justify-between items-center">
//             <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
//                 <div className="bg-[#0e8a74] p-1.5 rounded-lg text-white shadow-lg shadow-[#0e8a74]/20">
//                     <ShieldCheck size={20} />
//                 </div>
//                 <span className="text-xl font-bold tracking-tight">HelpHub AI</span>
//             </div>
//             <div className="flex items-center gap-6">
//                 <span className="text-sm font-semibold text-gray-400 cursor-default">Dashboard</span>
//                 <span className="bg-[#e2f1ee] text-[#0e8a74] px-5 py-2 rounded-full text-sm font-bold border border-[#0e8a74]/10">
//                     {isHelper ? 'AI Center' : 'Messages'}
//                 </span>
//                 <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-red-500 transition-all group">
//                     <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
//                     Logout
//                 </button>
//             </div>
//         </nav>
//     );

//     return (
//         <div className="min-h-screen bg-[#fcfaf7] text-[#112623] font-sans selection:bg-[#0e8a74] selection:text-white">
//             <Navigation />

//             <main className="max-w-7xl mx-auto px-6 lg:px-10 pb-20">
//                 {/* HERO SECTION - Changes based on role */}
//                 <div className="bg-[#1a2523] rounded-[40px] p-10 lg:p-16 relative overflow-hidden shadow-2xl mb-12">
//                     <div className="relative z-10 max-w-3xl">
//                         <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-4">
//                             {isHelper ? 'Helper Intelligence' : 'Interaction / Messaging'}
//                         </p>
//                         <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight mb-6">
//                             {isHelper 
//                                 ? "See what the platform intelligence is noticing." 
//                                 : "Keep support moving through direct communication."}
//                         </h1>
//                         <p className="text-gray-400 text-lg lg:text-xl max-w-2xl">
//                             {isHelper 
//                                 ? "AI-driven insights summarize demand trends and help you find where you are needed most."
//                                 : "Basic messaging gives helpers and requesters a clear follow-up path once a match happens."}
//                         </p>
//                     </div>
//                     <BrainCircuit className="absolute top-1/2 -right-10 -translate-y-1/2 text-white opacity-5 w-96 h-96 pointer-events-none" />
//                 </div>

//                 {isHelper ? (
//                     // HELPER SPECIFIC CONTENT
//                     <div className="space-y-12">
//                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                             <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
//                                 <h3 className="text-3xl font-bold">Web Dev</h3>
//                                 <p className="text-gray-400 text-sm font-bold uppercase">Active Trend</p>
//                             </div>
//                             <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
//                                 <h3 className="text-5xl font-bold">2</h3>
//                                 <p className="text-red-500 text-sm font-bold uppercase">High Urgency</p>
//                             </div>
//                             <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between h-40">
//                                 <div className="bg-[#e2f1ee] w-fit p-2 rounded-lg text-[#0e8a74]"><Zap size={20} fill="currentColor"/></div>
//                                 <p className="text-gray-400 text-sm font-bold uppercase">Verified Mentor</p>
//                             </div>
//                         </div>

//                         <div className="bg-[#f7f2ed] rounded-[40px] p-8 lg:p-12 border border-[#eee8e2]">
//                             <h2 className="text-4xl font-bold mb-10">Recommended for you</h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                 {requests.slice(0, 4).map((req) => (
//                                     <div key={req._id} className="bg-white p-8 rounded-[32px] border border-gray-100 hover:border-[#0e8a74]/30 transition-all cursor-pointer group">
//                                         <div className="flex justify-between mb-4">
//                                             <span className="bg-[#e2f1ee] text-[#0e8a74] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">New Task</span>
//                                             <span className="text-gray-300 font-mono text-xs">#{req._id?.slice(-4)}</span>
//                                         </div>
//                                         <h4 className="font-bold text-xl mb-2 group-hover:text-[#0e8a74] transition-colors">{req.title}</h4>
//                                         <p className="text-gray-500 text-sm line-clamp-2 mb-6">{req.description}</p>
//                                         <button 
//                                             onClick={() => acceptMutation.mutate(req._id)}
//                                             className="bg-white text-black hover:bg-cyan-500 hover:text-white px-8 py-3 rounded-xl font-black uppercase italic tracking-widest transition-all text-sm shadow-xl flex items-center gap-2"
//                                         >
//                                             I can help
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     // SEEKER/MESSAGING SPECIFIC CONTENT
//                     <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//                         <div className="lg:col-span-7 bg-[#f7f2ed] rounded-[40px] p-8 lg:p-10 border border-[#eee8e2]">
//                             <div className="mb-8">
//                                 <p className="text-[#0e8a74] uppercase tracking-widest text-xs font-black mb-2">Conversation Stream</p>
//                                 <h2 className="text-4xl font-bold">Recent messages</h2>
//                             </div>
//                             <div className="space-y-4">
//                                 {requests.length === 0 ? (
//                                     <div className="bg-white p-12 rounded-[32px] border border-dashed border-gray-200 text-center italic text-gray-400">
//                                         No active conversations yet.
//                                     </div>
//                                 ) : (
//                                     requests.map((req) => (
//                                         <div key={req._id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex justify-between items-center group hover:border-[#0e8a74]/40 transition-all">
//                                             <div className="flex gap-4 items-center">
//                                                 <div className="bg-[#fcfaf7] p-3 rounded-2xl text-gray-400 group-hover:text-[#0e8a74] transition-colors">
//                                                     <MessageSquare size={24} />
//                                                 </div>
//                                                 <div>
//                                                     <h3 className="font-bold text-lg">{req.title || "Support Request"}</h3>
//                                                     <p className="text-gray-500 text-sm line-clamp-1">{req.description}</p>
//                                                 </div>
//                                             </div>
//                                             <div className="bg-[#e2f1ee] px-3 py-2 rounded-full text-[10px] font-black text-[#0e8a74]">NEW</div>
//                                         </div>
//                                     ))
//                                 )}
//                             </div>
//                         </div>

//                         <div className="lg:col-span-5 bg-[#f7f2ed] rounded-[40px] p-8 lg:p-10 border border-[#eee8e2] h-fit sticky top-10">
//                             <h2 className="text-4xl font-bold mb-8">Start a chat</h2>
//                             <div className="space-y-6">
//                                 <textarea 
//                                     placeholder="Describe what you need help with..." 
//                                     className="w-full bg-white border border-gray-200 rounded-[32px] p-6 h-48 outline-none focus:ring-4 focus:ring-[#0e8a74]/5 focus:border-[#0e8a74] text-sm shadow-sm resize-none transition-all"
//                                     value={requestData.description}
//                                     onChange={(e) => setRequestData({
//                                         description: e.target.value, 
//                                         title: e.target.value.slice(0, 25) + (e.target.value.length > 25 ? '...' : '')
//                                     })}
//                                 />
//                                 <button 
//                                     onClick={handleSend}
//                                     disabled={createMutation.isPending || !requestData.description.trim()}
//                                     className="w-full bg-[#0e8a74] text-white py-5 rounded-full font-bold text-lg hover:bg-[#0a6b5a] transition-all disabled:opacity-50 shadow-lg shadow-[#0e8a74]/20 active:scale-95"
//                                 >
//                                     {createMutation.isPending ? "Sending..." : "Send to Community"}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default Dashboard;


















// import React, { useState, useEffect } from 'react';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import api from '../api/axios';
// import { 
//     LayoutDashboard, Send, CheckCircle, Loader2, 
//     User as UserIcon, Sparkles, Zap, Shield, BrainCircuit, Target, Activity
// } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const Dashboard = () => {
//     const navigate = useNavigate();
//     const queryClient = useQueryClient();
//     const [requestData, setRequestData] = useState({ title: '', description: '' });
    
//     const rawUser = localStorage.getItem('user');
//     const user = rawUser ? JSON.parse(rawUser) : null;
//     const userId = user?._id || user?.id;

//     useEffect(() => {
//         if (!user) navigate('/login');
//     }, [user, navigate]);

//     const { data: requests, isLoading } = useQuery({
//         queryKey: ['requests', userId],
//         queryFn: async () => {
//             const res = await api.get(`/requests`, { params: { helperId: userId } }); 
//             return res.data;
//         },
//         enabled: !!userId
//     });

//     const createMutation = useMutation({
//         mutationFn: (newReq) => api.post('/requests', { ...newReq, userId }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             setRequestData({ title: '', description: '' });
//             toast.success("Request deployed to neural feed!");
//         }
//     });

//     const acceptMutation = useMutation({
//         mutationFn: (requestId) => api.put(`/requests/accept/${requestId}`, { helperId: userId }),
//         onSuccess: () => {
//             queryClient.invalidateQueries(['requests']);
//             const updatedUser = { 
//                 ...user, 
//                 totalSolved: (user.totalSolved || 0) + 1,
//             };
//             localStorage.setItem('user', JSON.stringify(updatedUser));
//             toast.success("RESCUE UNIT DEPLOYED!");
//         }
//     });

//     if (isLoading) return (
//         <div className="h-screen flex items-center justify-center bg-[#0a0f1d]">
//             <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
//         </div>
//     );

//     const isSeeker = user?.role?.toLowerCase() === 'seeker' || user?.role?.toLowerCase() === 'both';
//     const isHelper = user?.role?.toLowerCase() === 'helper' || user?.role?.toLowerCase() === 'both';

//     return (
//         <div className="min-h-screen bg-[#0a0f1d] text-white font-sans selection:bg-blue-500/30">
//             {/* Navbar */}
//             <nav className="border-b border-gray-900 bg-[#0f172a]/80 p-4 sticky top-0 z-50 backdrop-blur-md">
//                 <div className="max-w-7xl mx-auto flex justify-between items-center">
//                     <div className="flex items-center gap-3">
//                         <div className="bg-cyan-500 p-2 rounded-lg"><Activity size={20} className="text-white" /></div>
//                         <span className="text-xl font-bold tracking-tight">Helplytics AI</span>
//                     </div>
//                     <div className="flex items-center gap-6 text-sm font-medium text-gray-400">
//                         <span className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
//                         <span className="hover:text-white cursor-pointer transition-colors">Explore</span>
//                         <span className="hover:text-white cursor-pointer transition-colors underline underline-offset-8 text-cyan-400">Feed</span>
//                         <button onClick={() => { localStorage.clear(); navigate('/login'); }} className="bg-red-500/10 text-red-400 px-4 py-1 rounded-md border border-red-500/20 text-xs">Logout</button>
//                     </div>
//                 </div>
//             </nav>

//             <main className="max-w-7xl mx-auto p-8">
//                 {/* Image 1: Top Stats Panel */}
//                 <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
//                     {/* AI Smart Matcher Panel */}
//                     <div className="md:col-span-3 bg-gradient-to-r from-[#1e234a] to-[#121633] border border-blue-500/20 rounded-3xl p-8 relative overflow-hidden flex items-center shadow-2xl">
//                         <div className="relative z-10">
//                             <div className="flex items-center gap-2 text-blue-400 mb-3">
//                                 <BrainCircuit size={18} />
//                                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">AI Smart Matcher</span>
//                             </div>
//                             <h2 className="text-2xl font-semibold tracking-tight">
//                                 Found <span className="text-blue-400">{requests?.length || 0} tasks</span> matching your skills: 
//                                 <span className="text-gray-400 italic"> {user?.skills?.join(', ') || 'Optimizing...'}</span>
//                             </h2>
//                         </div>
//                         <BrainCircuit className="absolute right-[-20px] top-[-20px] w-64 h-64 text-blue-600 opacity-10" />
//                     </div>

//                     {/* Tasks Solved Card */}
//                     <div className="bg-[#161b33] border border-gray-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-xl">
//                         <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Tasks Solved</span>
//                         <span className="text-6xl font-black text-white">{user?.totalSolved || 0}</span>
//                         <span className="text-[10px] font-bold text-blue-500 mt-4 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-full">Global Rank: #99+</span>
//                     </div>
//                 </div>

//                 {/* Section Header */}
//                 <div className="flex items-center gap-3 mb-8">
//                     <LayoutDashboard className="text-blue-500" />
//                     <h2 className="text-2xl font-black italic uppercase tracking-tighter">Live Feed</h2>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
//                     {/* Role Based Panel: Seeker Input */}
//                     {isSeeker && (
//                         <div className="lg:col-span-4 space-y-6">
//                             <div className="bg-[#111827] p-8 rounded-[2rem] border border-gray-800 shadow-2xl">
//                                 <h3 className="text-lg font-bold mb-6 flex items-center gap-2 text-cyan-400">
//                                     <Target size={20} /> DEPLOY SUPPORT MISSION
//                                 </h3>
//                                 <div className="space-y-5">
//                                     <input 
//                                         type="text" 
//                                         placeholder="Mission Title..." 
//                                         className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl p-4 text-sm outline-none focus:border-cyan-500 transition-all"
//                                         value={requestData.title}
//                                         onChange={(e) => setRequestData({...requestData, title: e.target.value})}
//                                     />
//                                     <textarea 
//                                         placeholder="Describe the technical hurdle..." 
//                                         className="w-full bg-[#0a0f1d] border border-gray-800 rounded-xl p-4 h-32 text-sm outline-none focus:border-cyan-500 transition-all resize-none"
//                                         value={requestData.description}
//                                         onChange={(e) => setRequestData({...requestData, description: e.target.value})}
//                                     />
//                                     <button 
//                                         onClick={() => createMutation.mutate(requestData)}
//                                         disabled={createMutation.isPending}
//                                         className="w-full bg-cyan-600 hover:bg-cyan-500 py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20"
//                                     >
//                                         {createMutation.isPending ? <Loader2 className="animate-spin" /> : "Initiate Broadcast"}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Feed Cards - Exact as Image 1 */}
//                     <div className={`${isSeeker ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6`}>
//                         {requests?.map((req) => (
//                             <div key={req._id} className="bg-[#161b33]/40 border border-gray-800 rounded-[2.5rem] p-8 relative hover:border-blue-500/40 transition-all group">
//                                 <div className="flex justify-between items-start mb-4">
//                                     <div className="flex flex-col gap-3">
//                                         <span className="bg-blue-900/30 text-blue-400 text-[10px] font-black uppercase px-3 py-1 rounded-full w-fit border border-blue-500/20">
//                                             {req.category || 'Support'}
//                                         </span>
//                                         <h3 className="text-2xl font-black italic uppercase tracking-tighter text-blue-400 group-hover:text-blue-300 transition-colors">
//                                             {req.title}
//                                         </h3>
//                                     </div>
//                                     <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest border border-gray-800 px-3 py-1 rounded-md">
//                                         Low Urgency
//                                     </span>
//                                 </div>

//                                 {/* AI Summary Box from Image 1 */}
//                                 <div className="bg-[#0f172a]/80 border border-blue-500/10 rounded-2xl p-4 mb-6">
//                                     <div className="flex items-center gap-2 text-blue-400/60 text-[10px] font-bold uppercase mb-1">
//                                         <BrainCircuit size={14} /> AI Summary:
//                                     </div>
//                                     <p className="text-sm text-gray-400 italic font-medium">{req.aiSummary || "AI is currently analyzing the request parameters..."}</p>
//                                 </div>

//                                 <p className="text-gray-400 text-sm leading-relaxed mb-6 font-medium">{req.description}</p>

//                                 <div className="flex justify-between items-center pt-6 border-t border-gray-800/50">
//                                     <div className="flex gap-2">
//                                         {req.tags?.map((tag, i) => (
//                                             <span key={i} className="text-[10px] bg-black px-3 py-1 rounded-md text-gray-500 font-bold border border-gray-900">#{tag}</span>
//                                         ))}
//                                     </div>
                                    
//                                     {isHelper && (
//                                         <button 
//                                             onClick={() => acceptMutation.mutate(req._id)}
//                                             className="bg-white text-black hover:bg-cyan-500 hover:text-white px-8 py-3 rounded-xl font-black uppercase italic tracking-widest transition-all text-sm shadow-xl flex items-center gap-2"
//                                         >
//                                             Rescue Now
//                                         </button>
//                                     )}
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Dashboard;
















































import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { 
    Loader2, 
    BrainCircuit, 
    ShieldCheck, 
    LogOut,
    MessageSquare,
    Zap,
    Activity,
    Target
} from 'lucide-react';
import api from '../api/axios'; 

const Dashboard = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [requestData, setRequestData] = useState({ title: '', description: '' });
    
    const rawUser = localStorage.getItem('user');
    const user = rawUser ? JSON.parse(rawUser) : null;
    const userId = user?._id || user?.id;
    const isHelper = user?.role?.toLowerCase() === 'helper'; 

    // 1. Saare Hooks ko top par hona chahiye (Conditionals se pehle)
    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['requests', userId],
        queryFn: async () => {
             const res = await api.get(`/requests`, { params: { helperId: userId } }); 
            return res.data;
        },
        enabled: !!userId,
        retry: 1
    });

    const createMutation = useMutation({
        mutationFn: (newReq) => api.post('/requests', { ...newReq, userId }),
        onSuccess: () => {
            queryClient.invalidateQueries(['requests']);
            setRequestData({ title: '', description: '' });
            toast.success("Request sent to the community!");
        }
    });

    const acceptMutation = useMutation({
        mutationFn: (requestId) => api.put(`/requests/accept/${requestId}`, { helperId: userId }),
        onSuccess: () => {
            queryClient.invalidateQueries(['requests']);
            const updatedUser = { 
                ...user, 
                totalSolved: (user.totalSolved || 0) + 1,
            };
            localStorage.setItem('user', JSON.stringify(updatedUser));
            toast.success("RESCUE UNIT DEPLOYED!");
        }
    });

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user, navigate]);

    // 2. Event Handlers
    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const handleSend = () => {
        if (!requestData.description.trim()) return;
        createMutation.mutate(requestData);
    };

    // 3. Early Return (Loading state) hamesha hooks ke baad aayega
    if (isLoading) return (
        <div className="h-screen flex items-center justify-center bg-[#fcfaf7]">
            <Loader2 className="animate-spin text-[#0e8a74] w-10 h-10" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#fcfaf7] text-[#112623] font-sans">
            {/* Navbar */}
            <nav className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                    <div className="bg-[#0e8a74] p-2 rounded-lg text-white shadow-lg">
                        <Activity size={20} />
                    </div>
                    <span className="text-xl font-bold tracking-tight">HelpHub AI</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="bg-[#e2f1ee] text-[#0e8a74] px-4 py-1.5 rounded-full text-xs font-bold border border-[#0e8a74]/10">
                        {isHelper ? 'AI Center' : 'Seeker Mode'}
                    </span>
                    <button onClick={handleLogout} className="text-gray-400 hover:text-red-500 transition-colors">
                        <LogOut size={20} />
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 pb-20">
                {/* Hero Panel (Image 1 Style) */}
                <div className="bg-[#1a2523] rounded-[40px] p-10 relative overflow-hidden shadow-2xl mb-12 flex items-center justify-between">
                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-2 text-[#0e8a74] mb-4">
                            <BrainCircuit size={18} />
                            <span className="uppercase tracking-[0.2em] text-[10px] font-black">Neural Processor Active</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4 italic">
                            {isHelper ? "Found tasks matching your skills" : "Deploy your request to the grid"}
                        </h1>
                        <p className="text-gray-400 text-lg">
                            {isHelper 
                                ? "Our AI has identified high-priority signals in your area of expertise." 
                                : "Start a conversation and let AI match you with the right mentor."}
                        </p>
                    </div>
                    <div className="hidden lg:block bg-white/5 p-8 rounded-3xl border border-white/10 text-center">
                        <span className="block text-xs font-bold text-gray-500 uppercase mb-2 tracking-widest">Tasks Solved</span>
                        <span className="text-6xl font-black text-white italic">{user?.totalSolved || 0}</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Role Based Section */}
                    {isHelper ? (
                        <div className="lg:col-span-12 space-y-8">
                            <h2 className="text-3xl font-black italic uppercase flex items-center gap-3">
                                <Zap className="text-[#0e8a74]" /> Recommended Feed
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {requests.map((req) => (
                                    <div key={req._id} className="bg-white p-8 rounded-[32px] border border-gray-100 hover:border-[#0e8a74]/30 transition-all shadow-sm group">
                                        <div className="flex justify-between mb-4">
                                            <span className="bg-[#e2f1ee] text-[#0e8a74] px-3 py-1 rounded-full text-[10px] font-black uppercase">Signal #{req._id?.slice(-4)}</span>
                                            <Zap size={16} className="text-yellow-500" />
                                        </div>
                                        <h4 className="font-bold text-xl mb-3 uppercase italic leading-none">{req.title}</h4>
                                        <p className="text-gray-500 text-sm line-clamp-3 mb-8 font-medium">{req.description}</p>
                                        <button 
                                            onClick={() => acceptMutation.mutate(req._id)}
                                            className="w-full bg-[#1a2523] text-white hover:bg-[#0e8a74] py-4 rounded-2xl font-black uppercase italic tracking-widest transition-all text-xs"
                                        >
                                            Rescue Now
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Seeker Messaging UI (Image 2 Style) */}
                            <div className="lg:col-span-7 bg-[#f7f2ed] rounded-[40px] p-10 border border-[#eee8e2]">
                                <h2 className="text-3xl font-black italic uppercase mb-8">Recent Activity</h2>
                                <div className="space-y-4 text-center">
                                    {requests.length === 0 ? (
                                        <div className="py-20 text-gray-400 italic font-medium">No active broadcasts found.</div>
                                    ) : (
                                        requests.map((req) => (
                                            <div key={req._id} className="bg-white p-6 rounded-3xl flex justify-between items-center shadow-sm border border-transparent hover:border-[#0e8a74]/20 transition-all">
                                                <div className="flex gap-4 items-center text-left">
                                                    <div className="bg-[#fcfaf7] p-3 rounded-2xl text-[#0e8a74]"><MessageSquare size={22} /></div>
                                                    <div>
                                                        <h3 className="font-bold uppercase italic text-sm">{req.title}</h3>
                                                        <p className="text-gray-400 text-xs line-clamp-1">{req.description}</p>
                                                    </div>
                                                </div>
                                                <span className="text-[10px] font-black text-[#0e8a74] bg-[#e2f1ee] px-2 py-1 rounded-md">LIVE</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="lg:col-span-5 bg-[#1a2523] rounded-[40px] p-10 text-white shadow-xl h-fit">
                                <h2 className="text-3xl font-black italic uppercase mb-6 flex items-center gap-3">
                                    <Target className="text-[#0e8a74]" /> Deploy Task
                                </h2>
                                <div className="space-y-6">
                                    <textarea 
                                        placeholder="Describe your technical challenge..." 
                                        className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 h-48 outline-none focus:border-[#0e8a74] text-sm resize-none"
                                        value={requestData.description}
                                        onChange={(e) => setRequestData({
                                            description: e.target.value, 
                                            title: e.target.value.slice(0, 25)
                                        })}
                                    />
                                    <button 
                                        onClick={handleSend}
                                        disabled={createMutation.isPending || !requestData.description.trim()}
                                        className="w-full bg-[#0e8a74] py-5 rounded-full font-black uppercase italic tracking-widest hover:bg-[#0a6b5a] transition-all disabled:opacity-50 shadow-lg shadow-[#0e8a74]/20"
                                    >
                                        {createMutation.isPending ? "Syncing..." : "Broadcast Signal"}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Dashboard;