import Joi from "joi";

export const registerSchema = Joi.object({
  fullName: Joi.string().required(),
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
  quantityInStock: Joi.number().min(0).integer(),
  unitPrice: Joi.number().min(0),
  brand: Joi.string().required(),
  color: Joi.string().required(),
  sizeUs: Joi.string().required(),
  description: Joi.string().required(),
  productImages: Joi.object().keys({
    isometric: Joi.string(),
    side: Joi.string(),
    top: Joi.string(),
    rear: Joi.string(),
    front: Joi.string(),
    bottom: Joi.string(),
  }),
  category: Joi.array().items(Joi.string().required()),
  productStatus: Joi.string().required(),
  createdDate: Joi.date(),
});

const orderSchema = Joi.object({
  purchaseDate: Joi.date(),
  products: Joi.array().required(),
  userId: Joi.string(),
  createdAt: Joi.date(),
  isDeleted: Joi.boolean(),
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
