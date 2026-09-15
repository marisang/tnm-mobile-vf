/** Remove tudo que não for dígito. */
export function onlyDigits(value) {
  return (value || '').replace(/\D/g, '')
}

/** Valida CPF usando o algoritmo oficial de dígitos verificadores. */
export function isValidCPF(rawCpf) {
  const cpf = onlyDigits(rawCpf)
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false // todos os dígitos iguais

  let soma = 0
  for (let i = 0; i < 9; i++) soma += parseInt(cpf[i], 10) * (10 - i)
  let resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf[9], 10)) return false

  soma = 0
  for (let i = 0; i < 10; i++) soma += parseInt(cpf[i], 10) * (11 - i)
  resto = (soma * 10) % 11
  if (resto === 10 || resto === 11) resto = 0
  if (resto !== parseInt(cpf[10], 10)) return false

  return true
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((email || '').trim())
}

export function isValidCEP(cep) {
  return onlyDigits(cep).length === 8
}

export function formatCPF(rawCpf) {
  const cpf = onlyDigits(rawCpf).slice(0, 11)
  return cpf
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatCEP(rawCep) {
  const cep = onlyDigits(rawCep).slice(0, 8)
  return cep.replace(/(\d{5})(\d)/, '$1-$2')
}

export async function buscarEnderecoPorCEP(rawCep){
  const cep = onlyDigits(rawCep)
  if(cep.length !== 8) return null

  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
    const data = await res.json()
    if (data.erro) return null
    return {
      logradouro: data.logradouro || '',
      bairro: data.bairro || '',
      localidade: data.localidade || '',
      uf: data.uf || '',
    }
  } catch{
    return null
  }
}

export function formatPhone(rawPhone) {
  const phone = onlyDigits(rawPhone).slice(0, 11)
  if (phone.length <= 10) {
    return phone
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{4})(\d)/, '$1-$2')
  }
  return phone
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
}