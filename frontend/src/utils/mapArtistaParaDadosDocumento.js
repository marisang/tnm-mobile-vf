
/** Junta rua, número e complemento num único endereço legível para os contratos. */
function montarEnderecoCompleto(linha) {
  let endereco = linha.endereco_completo ?? ''
  if (linha.numero) {
    endereco = endereco ? `${endereco}, ${linha.numero}` : linha.numero
  }
  if (linha.complemento) {
    endereco = endereco ? `${endereco} - ${linha.complemento}` : linha.complemento
  }
  return endereco
}

export function mapArtistaParaDadosDocumento(linha) {
  return {
    nomeCompleto: linha.nome_completo ?? '',
    pseudonimoArtistico: linha.pseudonimo_artistico ?? '',
    nacionalidade: linha.nacionalidade ?? 'Brasileira',
    estadoCivil: linha.estado_civil ?? '',
    profissao: linha.profissao ?? '',
    rg: linha.rg ?? '',
    orgaoEmissor: linha.orgao_emissor ?? '',
    cpf: linha.cpf ?? '',
    endereco: montarEnderecoCompleto(linha),
    bairro: linha.bairro ?? '',
    municipio: linha.municipio ?? '',
    uf: linha.uf ?? '',
    cep: linha.cep ?? '',
    email: linha.email ?? '',
    celular: linha.celular ?? '',
    dataNascimento: linha.data_nascimento ?? '',
    // A data de assinatura normalmente não vem do cadastro do artista;
    // faz mais sentido usar a data de hoje como padrão.
    dataAssinatura: new Date().toLocaleDateString('pt-BR'),
  }
}
