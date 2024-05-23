import axios from 'axios';

// Configurer l'instance d'Axios avec l'URL de base du back-end
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL // Utiliser la variable d'environnement pour l'URL de base
});

// Intercepteur de requêtes pour ajouter le token d'authentification
api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Intercepteur de réponses pour gérer les erreurs globales
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            // Gérer les erreurs 401 globalement, par exemple rediriger vers la page de connexion
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
