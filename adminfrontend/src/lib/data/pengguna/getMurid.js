
import { serviceClient } from "../../axios";
import { getFetchCache } from "../../fetchCahce/getFetchCache";

export const getMurid = async () => {

    try {
     const response = await  getFetchCache (() => serviceClient.getAllMurid() );
     return response.data;
    } catch (error) {
     throw error.response?.data?.message || "Terjadi kesalahan";
    }

}