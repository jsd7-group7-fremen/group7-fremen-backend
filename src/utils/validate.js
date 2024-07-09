import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().min(3).max(60).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(12).required(),
  image: Joi.string(),
  isAdmin: Joi.boolean(),
  userStatus: Joi.string(),
  createdDate: Joi.date(),
  gender: Joi.string().required(),
  dateOfBirth: Joi.date(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const productSchema = Joi.object({
  productName: Joi.string().required(),
  brand: Joi.string().required(),
  stock: Joi.number().min(0),
  category: Joi.array().items(Joi.string().required()),
  price: Joi.number().min(0),
  sizeUs: Joi.string().required(),
  color: Joi.string().required(),
  description: Joi.string().required(),
  images: Joi.string().required(),
});

const orderSchema = Joi.object({
  purchaseDate: Joi.date(),
  products: Joi.array().required(),
  userId: Joi.string(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

const validateRegister = async (data) => {
  return registerSchema.validate(data);
};

const validateLogin = async (data) => {
  return loginSchema.validate(data);
};

const validateProduct = async (data) => {
  return productSchema.validate(data);
};

const validateOrder = async (data) => {
  return orderSchema.validate(data);
};

export { validateRegister, validateLogin, validateProduct, validateOrder };
