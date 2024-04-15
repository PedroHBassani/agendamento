import { validateCNPJ, validateCPF } from "./validate.js";

export const paginate = (page, limit, total) => {
  return {
    page: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    limit: parseInt(limit),
    total,
  };
};

export const getImagePath = (image, path = "medias") => {
  if (!image) return "";
  if (image.startsWith(process.env.HOST)) return image;
  return `${process.env.HOST}/uploads/${path}/${image}`;
};

export const randomNumbers = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateUrl = (title, numbers = true) => {
  let url = title.toLowerCase().replace(/ /g, "-");
  url = url.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  url = url.replace(/[^a-z0-9-]/g, "").replace(/--+/g, "-");
  if (numbers) {
    url = `${url}-${randomNumbers(10000, 99999)}`;
  }
  return url;
};

export const generateCode = (length = 8) => {
  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  for (let i = 0; i < length; i++) {
    if (i % 3 === 0) {
      code += numbers.charAt(Math.floor(Math.random() * numbers.length));
    } else {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }
  return code;
};

export const onlyNumbers = (value) => {
  return value.replace(/\D/g, "");
};

export const verifyIdentifier = (type, value) => {
  if (type === "CPF") {
    return validateCPF(value);
  }
  if (type === "CNPJ") {
    return validateCNPJ(value);
  }
  return false;
};
