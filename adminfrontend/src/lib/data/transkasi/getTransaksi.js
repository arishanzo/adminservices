
import { serviceClient } from "../../axios";
import { getFetchCache } from "../../fetchCahce/getFetchCache";

export const getTransaksi = async () => {

    try {
     const response = await  getFetchCache (() => serviceClient.getAllPermintaanPenarikan() );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}