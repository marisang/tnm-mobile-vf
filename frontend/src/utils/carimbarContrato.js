import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

function formatarCpf(cpf) {
  const digitos = (cpf || '').replace(/\D/g, '')
  if (digitos.length !== 11) return cpf || '—'
  return `${digitos.slice(0, 3)}.${digitos.slice(3, 6)}.${digitos.slice(6, 9)}-${digitos.slice(9, 11)}`
}

/**
 * Recebe o PDF original do contrato e os dados da assinatura, e retorna
 * um novo PDF com uma página extra no final contendo o carimbo
 * de assinatura eletrônica — pra quem abrir o arquivo fora do sistema
 * (fora do banco de dados) também veja que ele foi assinado, por quem
 * e quando.
 */
export async function carimbarContrato(arquivoOriginal, dadosAssinatura) {
  const { nome, cpf, dataHoraFormatada, nomeArquivoOriginal, tipoContrato } = dadosAssinatura

  const bytesOriginais = await arquivoOriginal.arrayBuffer()
  const pdfDoc = await PDFDocument.load(bytesOriginais)

  const pagina = pdfDoc.addPage()
  const { width, height } = pagina.getSize()
  const fonteNormal = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const fonteNegrito = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const margem = 55
  let y = height - 90

  function linha(texto, { negrito = false, tamanho = 11, espacoDepois = 20 } = {}) {
    pagina.drawText(texto, {
      x: margem,
      y,
      size: tamanho,
      font: negrito ? fonteNegrito : fonteNormal,
      color: rgb(0.08, 0.08, 0.08),
      maxWidth: width - margem * 2,
    })
    y -= espacoDepois
  }

  // Linha decorativa superior
  pagina.drawLine({
    start: { x: margem, y: y + 30 },
    end: { x: width - margem, y: y + 30 },
    thickness: 1,
    color: rgb(0.6, 0.6, 0.6),
  })

  linha('DOCUMENTO ASSINADO ELETRONICAMENTE', { negrito: true, tamanho: 15, espacoDepois: 34 })

  // Informações específicas do tipo de contrato
  if (tipoContrato) {
    linha('Tipo de Contrato', { negrito: true, tamanho: 10, espacoDepois: 15 })
    linha(tipoContrato, { tamanho: 12, espacoDepois: 26 })
  }

  linha('Signatário', { negrito: true, tamanho: 10, espacoDepois: 15 })
  linha(nome || '—', { tamanho: 12, espacoDepois: 26 })

  linha('CPF', { negrito: true, tamanho: 10, espacoDepois: 15 })
  linha(formatarCpf(cpf), { tamanho: 12, espacoDepois: 26 })

  linha('Data e hora da assinatura', { negrito: true, tamanho: 10, espacoDepois: 15 })
  linha(`${dataHoraFormatada} (horário de Brasília)`, { tamanho: 12, espacoDepois: 26 })

  linha('Declarações aceitas nesta assinatura', { negrito: true, tamanho: 10, espacoDepois: 15 })
  linha('• Li e concordo com a Política de Privacidade', { tamanho: 11, espacoDepois: 16 })
  linha('• Declaro que a obra é inédita e de minha autoria', { tamanho: 11, espacoDepois: 16 })
  linha('• Confirmo a veracidade das informações fornecidas', { tamanho: 11, espacoDepois: 16 })
  linha('• Aceito os termos e condições do contrato assinado', { tamanho: 11, espacoDepois: 30 })

  pagina.drawLine({
    start: { x: margem, y: y + 12 },
    end: { x: width - margem, y: y + 12 },
    thickness: 0.5,
    color: rgb(0.75, 0.75, 0.75),
  })

  linha('Validade Jurídica', { negrito: true, tamanho: 10, espacoDepois: 15 })
  linha('Este documento foi assinado eletronicamente conforme a Lei 14.063/2020', { tamanho: 9, espacoDepois: 12 })
  linha('e possui a mesma validade jurídica de uma assinatura manuscrita.', { tamanho: 9, espacoDepois: 20 })

  linha(`Documento original: ${nomeArquivoOriginal}`, { tamanho: 8, espacoDepois: 12 })
  linha('Esta página foi adicionada automaticamente pelo sistema TNM no momento da assinatura.', { tamanho: 8 })

  const bytesFinal = await pdfDoc.save()
  return new Blob([bytesFinal], { type: 'application/pdf' })
}