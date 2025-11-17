
import { serviceClient } from "../../axios";
import { getFetchCache } from "../../fetchCahce/getFetchCache";

export const getGuru = async () => {

    try {
     const response = await  getFetchCache (() => serviceClient.getAllGuru() );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}