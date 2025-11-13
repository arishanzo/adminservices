import axiosClient from "../axios";
import { getFetchCache } from "../fetchCahce/getFetchCache";


export const getPromo = async () => {

    try {
     const response = await  getFetchCache (() => axiosClient.get(`/api/promo`) );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}