/**
 * Remove acentos e caracteres não permitidos do nome do arquivo antes de
 * usá-lo como chave no Supabase Storage (ele só aceita letras sem acento,
 * números, ponto, hífen e underscore).
 */
export function sanitizeFileName(nomeOriginal) {
  return nomeOriginal
    .normalize('NFD')                 // separa a letra do acento (ã -> a + ~)
    .replace(/[\u0300-\u036f]/g, '')  // remove os acentos separados
    .replace(/[^a-zA-Z0-9._-]/g, '_') // troca qualquer outro caractere por _
}