// Motor de cálculo dos splits financeiros.
//
// Regra de negócio (fixa, definida pela Tô Na Mídia):
//   - ONErpm ..................... 30% do valor bruto
//   - Tô Na Mídia (TNM) ........... 20% do valor bruto
//   - Artista ..................... 50% do valor bruto
//
// Quando existe vínculo editorial (a obra tem uma editora responsável
// pela administração), 25% da PARTE DO ARTISTA (não do valor bruto
// total) é destinada à editora. Ou seja:
//   - parte bruta do artista = 50% do valor bruto
//   - editora fica com 25% dessa parte do artista  -> 12,5% do bruto
//   - artista fica com os 75% restantes da sua parte -> 37,5% do bruto

const PERCENTUAL_ONERPM = 0.30
const PERCENTUAL_TNM = 0.20
const PERCENTUAL_ARTISTA = 0.50
const PERCENTUAL_EDITORA_SOBRE_PARTE_ARTISTA = 0.25

/**
 * Calcula a divisão de splits financeiros a partir de um valor bruto.
 *
 * @param {number} valorBruto - valor total a ser dividido (vindo do Supabase)
 * @param {boolean} temVinculoEditorial - se a obra tem editora vinculada
 * @returns {{
 *   valorBruto: number,
 *   onerpm: number,
 *   tnm: number,
 *   artista: number,
 *   editora: number,
 *   percentualArtista: number,
 * }}
 */
export function calcularSplitFinanceiro(valorBruto, temVinculoEditorial = false) {
  const valor = Number(valorBruto) || 0

  const onerpm = valor * PERCENTUAL_ONERPM
  const tnm = valor * PERCENTUAL_TNM
  const parteArtistaBruta = valor * PERCENTUAL_ARTISTA

  let editora = 0
  let artista = parteArtistaBruta

  if (temVinculoEditorial) {
    editora = parteArtistaBruta * PERCENTUAL_EDITORA_SOBRE_PARTE_ARTISTA
    artista = parteArtistaBruta - editora
  }

  // Percentual do artista sobre o valor bruto total (50% sem editora,
  // 37,5% com editora) — é esse número que aparece no card.
  const percentualArtista = valor > 0 ? (artista / valor) * 100 : 0

  return {
    valorBruto: valor,
    onerpm,
    tnm,
    artista,
    editora,
    percentualArtista,
  }
}