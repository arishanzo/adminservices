import { useEffect, useState } from "react";
import { getFetchCache } from "../lib/fetchCahce/getFetchCache";
import { getTransaksi } from "../lib/data/transkasi/getTransaksi";

export const UseGetPermintaanPenarikan = () => {
  const [permintaanPenarikan, setPermintaanPenarikan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchPermintaanPenarikan = async () => {
      try {

        setLoading(true);
        const result = await getFetchCache ( () => getTransaksi(), 5, 3000);
        if (isMounted) setPermintaanPenarikan(result.data || null);

      } catch (error) {

        if (isMounted) {
          if (error?.response?.status === 404) {
            setPermintaanPenarikan(null);
          } else {
            setError(
              error?.response?.data?.message ||
                error?.message ||
                "Gagal memuat Promo"
            );
          }
        }

      } finally {
        if (isMounted) setLoading(false);
      }

    };

    const timer = setTimeout(() => {
      fetchPermintaanPenarikan();
    }, 100);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return { permintaanPenarikan, loading, error };
};
