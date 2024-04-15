export const validateCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]/g, "");
  if (cpf.length !== 11) {
    return false;
  }
  const repeatedDigits = /^(.)\1+$/.test(cpf);
  if (repeatedDigits) {
    return false;
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digitVerifier1 = remainder === 10 || remainder === 11 ? 0 : remainder;
  if (digitVerifier1 !== parseInt(cpf.charAt(9))) {
    return false;
  }
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let digitVerifier2 = remainder === 10 || remainder === 11 ? 0 : remainder;
  if (digitVerifier2 !== parseInt(cpf.charAt(10))) {
    return false;
  }
  return true;
};

export const validateCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]/g, "");

  if (cnpj.length !== 14) {
    return false;
  }

  const repeatedDigits = /^(.)\1+$/.test(cnpj);
  if (repeatedDigits) {
    return false;
  }

  let sum = 0;
  let weight = 5;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  let remainder = sum % 11;
  let digitVerifier1 = remainder < 2 ? 0 : 11 - remainder;
  if (digitVerifier1 !== parseInt(cnpj.charAt(12))) {
    return false;
  }

  sum = 0;
  weight = 6;
  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }
  remainder = sum % 11;
  let digitVerifier2 = remainder < 2 ? 0 : 11 - remainder;
  if (digitVerifier2 !== parseInt(cnpj.charAt(13))) {
    return false;
  }

  return true;
};
