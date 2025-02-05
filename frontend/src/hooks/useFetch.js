import { useState, useCallback } from 'react';
import apiClient from '../api/apiClient';

const useFetch = (endpoint, method = 'GET', options = {}) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = useCallback(
        async (body = null) => {
            setLoading(true);
            setError(null);

            try {
                const formData = new FormData();
                for (const key in body) {
                    formData.append(key, body[key]);
                }

                const response = await apiClient(endpoint, {
                    method,
                    data: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data', // Asegúrate de enviar el encabezado correcto
                    },
                    ...options,
                });

                if (response.data?.token) {
                    localStorage.setItem('authToken', response.data.token);
                }

                setData(response.data);
            } catch (err) {
                console.log('Error Response:', err.response?.data); // Muestra la respuesta del servidor
                console.log('Error Status:', err.response?.status); // Muestra el código de estado HTTP
                console.log('Error Headers:', err.response?.headers); // Muestra los headers de respuesta
                setError(err);
            } finally {
                setLoading(false);
            }
        },
        [endpoint, method, options]
    );

    return { data, loading, error, fetchData };
};

export default useFetch;
