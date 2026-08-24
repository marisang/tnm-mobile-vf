import { useState, useEffect, useCallback } from 'react';
import { obrasService } from '../services/api';

/**
 * Sempre escopado a um artista. Sem artistaId, não busca nada — este app
 * é de uso individual do artista, não existe tela que precise ver as
 * obras de todo mundo.
 */
export function useObras(artistaId = null) {
  const [obras, setObras] = useState([]);
  const [loading, setLoading] = useState(Boolean(artistaId));
  const [error, setError] = useState(null);

  const carregarObras = useCallback(async () => {
    if (!artistaId) {
      setObras([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await obrasService.buscarPorArtista(artistaId);
      setObras(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar obras:', err);
    } finally {
      setLoading(false);
    }
  }, [artistaId]);

  useEffect(() => {
    carregarObras();
  }, [carregarObras]);

  const criarObra = async (obraData) => {
    try {
      const novaObra = await obrasService.criar(obraData);
      setObras((atual) => [...atual, novaObra]);
      return novaObra;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const atualizarObra = async (id, obraData) => {
    try {
      const obraAtualizada = await obrasService.atualizar(id, obraData);
      setObras((atual) => atual.map((o) => (o.id === id ? obraAtualizada : o)));
      return obraAtualizada;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletarObra = async (id) => {
    try {
      await obrasService.deletar(id);
      setObras((atual) => atual.filter((o) => o.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    obras,
    loading,
    error,
    carregarObras,
    criarObra,
    atualizarObra,
    deletarObra,
  };
}
