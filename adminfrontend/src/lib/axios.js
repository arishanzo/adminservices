// src/lib/axios.js
import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "X-Requested-With": "XMLHttpRequest", // penting untuk Sanctum
    "Accept": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});


// Auto-detect content type
axiosClient.interceptors.request.use((config) => {
  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = 'multipart/form-data';
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  config.withCredentials = true; 
  return config;
});

// Handle response errors
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      // Network error (server tidak bisa dijangkau)
      error.message = 'Network Error: Server tidak dapat dijangkau';
    } else if (error.response.status === 500) {
      error.message = 'Server Error: Terjadi kesalahan pada server';
    } else if (error.response.status === 404) {
      error.message = 'Not Found: Endpoint tidak ditemukan';
    } else if (error.response.status === 401) {
      error.message = 'Unauthorized: Sesi telah berakhir';
      localStorage.removeItem('auth_token');
    }
    
    return Promise.reject(error);
  }
);


// Service Communication Helper
export const serviceClient = {

  getAllPermintaanPenarikan: () => {
    return axiosClient.get('/api/services/permintaanpenarikan', {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
      }
    });
  },

  getAllGuru: () => {
    return axiosClient.get('/api/services/guruAll', {
    headers: {
       'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
    }
    });
  },

   getAllMurid: () => {
    return axiosClient.get('/api/services/muridAll', {
    headers: {
       'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
    }
    });
  },

  getCrossServiceData: (userId, guruId) => {
    return axiosClient.post('/services/cross-data', {
      user_id: userId,
      guru_id: guruId
    }, {
      headers: {
        'X-Service-Key': import.meta.env.VITE_SERVICE_KEY,
      }
    });
  }
};

export default axiosClient;
