import { useState, useEffect, useCallback } from 'react';
import { showsService } from '../services/api';

/**
 * modo: 'publicados' (vitrine pública, só shows aprovados) ou um
 * artistaId (para o próprio artista ver o status dos seus shows).
 * Sem nenhum dos dois, não busca nada — nunca lista shows de todo mundo
 * em qualquer status.
 */
export function useShows(modo = null) {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(Boolean(modo));
  const [error, setError] = useState(null);

  const carregarShows = useCallback(async () => {
    if (!modo) {
      setShows([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data =
        modo === 'publicados' ? await showsService.listarPublicados() : await showsService.buscarPorArtista(modo);
      setShows(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar shows:', err);
    } finally {
      setLoading(false);
    }
  }, [modo]);

  useEffect(() => {
    carregarShows();
  }, [carregarShows]);

  const criarShow = async (showData) => {
    try {
      const novoShow = await showsService.criar(showData);
      setShows((atual) => [...atual, novoShow]);
      return novoShow;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const atualizarShow = async (id, showData) => {
    try {
      const showAtualizado = await showsService.atualizar(id, showData);
      setShows((atual) => atual.map((s) => (s.id === id ? showAtualizado : s)));
      return showAtualizado;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletarShow = async (id) => {
    try {
      await showsService.deletar(id);
      setShows((atual) => atual.filter((s) => s.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    shows,
    loading,
    error,
    carregarShows,
    criarShow,
    atualizarShow,
    deletarShow,
  };
}
