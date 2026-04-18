// import axios from 'axios';

// const api = axios.create({
//     baseURL: 'https://hackaton-backend-1-qk2c.onrender.com/', // Production mein yahan live URL aayega
// });

// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

// export default api;




// import axios from 'axios';

// const api = axios.create({
//     // Production URL mein '/api' suffix lazmi add karein
//     baseURL: 'https://hackaton-backend-1-qk2c.onrender.com/api', 
// });

// // Request Interceptor
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             // Standard format: 'Bearer <token>'
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// export default api;






















import axios from 'axios';

const api = axios.create({
    // Production mein env variable use karega, warna local
    baseURL: process.env.REACT_APP_API_URL || 'https://hackaton-backend-1-qk2c.onrender.com/api',
    timeout: 30000, // 30 seconds timeout (Render cold start ke liye zaroori hai)
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor (Production ke liye extra layer)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Agar token expire ho jaye toh auto logout
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;