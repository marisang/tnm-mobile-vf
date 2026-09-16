import { useState, useEffect } from 'react'
import { calcularSplitFinanceiro } from '../utils/calcularSplitFinanceiro'
import { transacoesService } from '../services/api'
import { useArtistaAtual } from '../hooks/useArtistaAtual'

function PainelFinanceiro() {
  const { artista } = useArtistaAtual()
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [mesAtual, setMesAtual] = useState(0) // 0 = mês atual, 1 = mês anterior, 2 = 2 meses atrás
  const [dadosFinanceiros, setDadosFinanceiros] = useState({
    valorBrutoTotal: 0,
    temVinculoEditorial: false,
    atualizadoEm: '',
    historico: [], // Últimos 3 meses
  })
  const [mostrarModalSaque, setMostrarModalSaque] = useState(false)

  useEffect(() => {
    async function carregarDadosFinanceiros() {
      try {
        setCarregando(true)
        setErro(null)

        if (!artista?.id) {
          setErro('Artista não identificado.')
          return
        }

        // Busca as transações financeiras do artista
        const transacoes = await transacoesService.buscarPorArtista(artista.id)

        // Obter os últimos 3 meses
        const hoje = new Date()
        const ultimos3Meses = []

        for (let i = 0; i < 3; i++) {
          const data = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
          const mes = data.getMonth() + 1
          const ano = data.getFullYear()

          // Filtrar transações deste mês/ano
          const transacoesMes = transacoes.filter((t) => {
            if (t.mes_referencia && t.ano_referencia) {
              return t.mes_referencia === mes && t.ano_referencia === ano
            }
            // Fallback: usar data_competencia se mes/ano_referencia não existirem
            const dataComp = new Date(t.data_competencia)
            return dataComp.getMonth() + 1 === mes && dataComp.getFullYear() === ano
          })

          // Somar valores brutos do mês
          const totalMes = transacoesMes.reduce((acc, t) => acc + Number(t.valor_bruto || 0), 0)

          ultimos3Meses.push({
            mes,
            ano,
            mesNome: data.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }),
            mesAbrev: data.toLocaleDateString('pt-BR', { month: 'short' }),
            valorBruto: totalMes,
            transacoes: transacoesMes,
          })
        }

        // Verificar se o artista tem vínculo editorial (campo na tabela artistas)
        const temVinculoEditorial = artista.vinculo_editorial || false

        // "Atualizado em" deve refletir quando os dados do ERP foram
        // importados/atualizados pelo WEB, não o horário em que a pessoa
        // abriu o app — por isso usamos o carimbo mais recente das
        // próprias transações (atualizado_em/criado_em), com fallback
        // para "agora" apenas se não houver nenhuma transação ainda.
        const timestampsAtualizacao = transacoes
          .map((t) => t.atualizado_em || t.criado_em)
          .filter(Boolean)
          .map((data) => new Date(data).getTime())

        const ultimaAtualizacao =
          timestampsAtualizacao.length > 0 ? new Date(Math.max(...timestampsAtualizacao)) : new Date()

        setDadosFinanceiros({
          valorBrutoTotal: ultimos3Meses[0]?.valorBruto || 0,
          temVinculoEditorial,
          atualizadoEm: ultimaAtualizacao.toLocaleString('pt-BR'),
          historico: ultimos3Meses,
        })
      } catch (e) {
        console.error('Erro ao carregar dados financeiros:', e)
        setErro('Não foi possível carregar os dados financeiros.')
      } finally {
        setCarregando(false)
      }
    }

    carregarDadosFinanceiros()
  }, [artista])

 
  // Dados do mês selecionado
  const dadosMesAtual = dadosFinanceiros.historico[mesAtual] || {
    valorBruto: 0,
    mesNome: '',
  }

  const split = calcularSplitFinanceiro(
    dadosMesAtual.valorBruto,
    dadosFinanceiros.temVinculoEditorial
  )

  const saldoFormatado = split.artista.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })

  const percentualArtistaFormatado = split.percentualArtista.toLocaleString('pt-BR', {
    maximumFractionDigits: 1,
  })

  function handleConfirmarSaque() {
    window.open('https://dashboard.onerpm.com/login', '_blank')
    setMostrarModalSaque(false)
  }

  if (carregando) {
    return <p style={{ textAlign: 'center', marginTop: 40 }}>Carregando dados...</p>
  }

  if (erro) {
    return <p style={{ textAlign: 'center', marginTop: 40, color: 'red' }}>{erro}</p>
  }

  return (
    <>
      {/* Seletor de Mês */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, fontSize: '0.95rem' }}>
          Selecione o período (últimos 3 meses):
        </label>
        <select
          value={mesAtual}
          onChange={(e) => setMesAtual(Number(e.target.value))}
          style={{
            width: '100%',
            padding: '10px 12px',
            fontSize: '1rem',
            border: '1px solid #ddd',
            borderRadius: 6,
            backgroundColor: '#fff',
            cursor: 'pointer',
          }}
        >
          {dadosFinanceiros.historico.map((item, index) => (
            <option key={index} value={index}>
              {item.mesNome.charAt(0).toUpperCase() + item.mesNome.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Saldo Disponível */}
      <div className="balance-card">
        <div className="balance-label">Faturamento do Período (ERP)</div>
        <div className="balance-amount">{saldoFormatado}</div>
        <div className="balance-percentual">
          {percentualArtistaFormatado}% do faturamento bruto
          {dadosFinanceiros.temVinculoEditorial && ' (após repasse à editora)'}
        </div>
        <div className="balance-updated">
          Dados atualizados em: {dadosFinanceiros.atualizadoEm}
        </div>
      </div>

      {/* Resumo do Split Financeiro */}
      <div className="chart-card" style={{ marginTop: 16 }}>
        <div className="chart-title">Distribuição Financeira (Dados ERP)</div>
        <div style={{ padding: '16px 0' }}>
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 4 }}>Valor Bruto Total</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600, color: '#333' }}>
              {dadosMesAtual.valorBruto.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 4 }}>ONErpm (30%)</div>
            <div style={{ fontSize: '1rem', fontWeight: 500, color: '#555' }}>
              {split.onerpm.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
          </div>

          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 4 }}>Tô Na Mídia (20%)</div>
            <div style={{ fontSize: '1rem', fontWeight: 500, color: '#555' }}>
              {split.tnm.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
          </div>

          {dadosFinanceiros.temVinculoEditorial && (
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 4 }}>Editora (25% da parte do artista)</div>
              <div style={{ fontSize: '1rem', fontWeight: 500, color: '#555' }}>
                {split.editora?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </div>
            </div>
          )}

          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '2px solid #6A1B9A' }}>
            <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: 4 }}>Você Recebe ({split.percentualArtista}%)</div>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#6A1B9A' }}>
              {split.artista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </div>
          </div>
        </div>
      </div>

      {/* Aviso sobre Faturamento Histórico */}
      <div style={{ 
        marginTop: 16, 
        padding: '12px 16px', 
        backgroundColor: 'rgba(106, 27, 154, 0.1)', 
        border: '1px solid rgba(106, 27, 154, 0.2)', 
        borderRadius: '8px',
        fontSize: '0.9rem',
        lineHeight: '1.4'
      }}>
        <div style={{ fontWeight: 600, marginBottom: 8, color: '#6A1B9A' }}>
          ℹ️ Informações Históricas
        </div>
        <p style={{ margin: 0, color: '#333' }}>
          Caso você precise de informações de faturamento referentes a períodos anteriores aos últimos três meses, 
          envie um e-mail para: <strong>financeiro@tonamidia.com.br</strong>
        </p>
      </div>

      {/* Solicitar Saque */}
      <button className="btn btn-primary" onClick={() => setMostrarModalSaque(true)} style={{ marginTop: 16 }}>
        Acesso à ONErpm
      </button>

      {/* Modal de aviso de redirecionamento do saque */}
      {mostrarModalSaque && (
        <div className="modal-overlay" onClick={() => setMostrarModalSaque(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3>Redirecionamento</h3>
            <p>
              Você será redirecionado(a) para a plataforma da <strong>ONErpm</strong>, onde o saque deverá ser realizado. O aplicativo da Tô na Mídia não processa solicitações de saque.
            </p>
            <div className="modal-actions">
              <button className="btn-secondary btn-small" onClick={() => setMostrarModalSaque(false)}>
                Cancelar
              </button>
              <button className="btn-primary btn-small" onClick={handleConfirmarSaque}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PainelFinanceiro