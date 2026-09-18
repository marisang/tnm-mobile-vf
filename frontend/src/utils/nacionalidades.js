/**
 * Lista de nacionalidades exibida no cadastro, no formato
 * "Gentílico(a)" + bandeira do país (imagem), no mesmo padrão do
 * select de Estilo Musical. `code` é o código ISO 3166-1 alpha-2 do
 * país, usado para montar a URL da imagem da bandeira (via flagcdn.com,
 * um serviço público e gratuito de imagens de bandeiras, sem API key).
 *
 * Ordem alfabética, com "Brasileiro(a)" sempre em primeiro lugar.
 */
export const nacionalidades = [
  { value: 'Brasileiro(a)', code: 'br' },
  { value: 'Alemão(ã)', code: 'de' },
  { value: 'Americano(a)', code: 'us' },
  { value: 'Angolano(a)', code: 'ao' },
  { value: 'Argentino(a)', code: 'ar' },
  { value: 'Boliviano(a)', code: 'bo' },
  { value: 'Britânico(a)', code: 'gb' },
  { value: 'Canadense', code: 'ca' },
  { value: 'Chileno(a)', code: 'cl' },
  { value: 'Chinês(a)', code: 'cn' },
  { value: 'Colombiano(a)', code: 'co' },
  { value: 'Equatoriano(a)', code: 'ec' },
  { value: 'Espanhol(a)', code: 'es' },
  { value: 'Francês(a)', code: 'fr' },
  { value: 'Italiano(a)', code: 'it' },
  { value: 'Japonês(a)', code: 'jp' },
  { value: 'Mexicano(a)', code: 'mx' },
  { value: 'Moçambicano(a)', code: 'mz' },
  { value: 'Paraguaio(a)', code: 'py' },
  { value: 'Peruano(a)', code: 'pe' },
  { value: 'Português(a)', code: 'pt' },
  { value: 'Uruguaio(a)', code: 'uy' },
  { value: 'Venezuelano(a)', code: 've' },
]

/** URL da imagem da bandeira (24px de largura) para um código de país ISO alpha-2. */
export function bandeiraUrl(code) {
  return `https://flagcdn.com/24x18/${code}.png`
}
