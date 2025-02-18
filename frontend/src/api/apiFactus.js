import axios from "axios";

const apiFactus = axios.create({
    baseURL: 'https://api-sandbox.factus.com.co',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token en cada solicitud
apiFactus.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token"); // Recuperamos el token
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Agregamos el token a los headers
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiFactus;
