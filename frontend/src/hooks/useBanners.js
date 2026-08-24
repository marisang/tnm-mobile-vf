import { useState, useEffect } from 'react';
import { bannersService } from '../services/api';

export function useBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    bannersService
      .listarAtivos()
      .then((data) => {
        if (mounted) setBanners(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
        console.error('Erro ao carregar banners promocionais:', err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return { banners, loading, error };
}
