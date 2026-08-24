import html2pdf from 'html2pdf.js'

const OPCOES_PADRAO = {
  margin: [15, 15, 15, 15], // mm: topo, esquerda, baixo, direita
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2, useCORS: true, scrollX: 0, scrollY: 0 },
  jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
}


export async function gerarPdf(elemento, nomeArquivo) {
  await html2pdf()
    .set({ ...OPCOES_PADRAO, filename: nomeArquivo })
    .from(elemento)
    .save()
}

export async function gerarPdfComoBlob(elemento) {
  const blob = await html2pdf()
    .set(OPCOES_PADRAO)
    .from(elemento)
    .outputPdf('blob')
  return blob
}