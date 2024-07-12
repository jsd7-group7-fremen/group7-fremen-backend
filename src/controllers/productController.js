import Product from "../models/product.model.js";
import { validateProduct } from "../utils/validate.js";
import NotFoundError from "../error/NotFoundError.js";
import BadRequestError from "../error/BadRequestError.js";

const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.json({
      error: false,
      products,
      message: "All products retrieved successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getProductById = async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new NotFoundError(`Product Id: ${productId} was not found.`);
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

const createProduct = async (req, res, next) => {
  //แกะกล่อง
  const {
    productName,
    quantityInStock,
    unitPrice,
    brand,
    color,
    sizeUs,
    description,
    productImages,
    category,
    productStatus,
    createdDate,
  } = req.body;
  //Validatation
  const { error } = await validateProduct({
    productName,
    quantityInStock,
    unitPrice,
    brand,
    color,
    sizeUs,
    description,
    productImages,
    category,
    productStatus,
    createdDate,
  });
  if (error) {
    console.log(req.body);
    console.error("Error :", error);
    throw new BadRequestError(error.message);
  }

  //Create สินค้าใหม่ลง database
  try {
    const product = new Product({
      productName,
      quantityInStock,
      unitPrice,
      brand,
      color,
      sizeUs,
      description,
      productImages,
      category,
      productStatus,
      createdDate,
    });
    await product.save();
    return res.json({
      error: false,
      product,
      message: `Create product successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  const {
    productName,
    quantityInStock,
    unitPrice,
    brand,
    color,
    sizeUs,
    description,
    productImages,
    category,
    productStatus,
    createdDate,
  } = req.body;

  if (
    !productName &&
    !quantityInStock &&
    !unitPrice &&
    !brand &&
    !color &&
    !sizeUs &&
    !description &&
    !productImages &&
    !category &&
    !productStatus
  ) {
    return res
      .status(400)
      .json({ error: true, message: `No Change Provided.` });
  }

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new NotFoundError(`Product Id: ${productId} was not found.`);
    }
    if (productName) product.productName = productName;
    if (quantityInStock) product.quantityInStock = quantityInStock;
    if (unitPrice) product.unitPrice = unitPrice;
    if (brand) product.brand = brand;
    if (color) product.color = color;
    if (sizeUs) product.sizeUs = sizeUs;
    if (description) product.description = description;
    if (productImages) product.productImages = productImages;
    if (category) product.category = category;
    if (productStatus) product.productStatus = productStatus;
    if (createdDate) product.createdDate = createdDate;

    await product.save(); //Update ข้อมูลที่เปลี่ยนแปลงของสินค้าเดิม ลงใน database

    return res.json({
      error: false,
      product,
      message: `Product Id: ${productId} has been updated successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

const softDeleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new NotFoundError(`Product Id: ${productId} was not found.`);
    }
    if (product.productStatus === "deleted") {
      return res.status(400).json({
        error: true,
        message: `Product Id: ${productId} has already status= ${product.productStatus}.`,
      });
    }

    product.productStatus = "deleted"; //soft delete
    await product.save();
    res.status(200).json({
      message: `Product Id: ${productId} has been (soft) deleted successfully.`,
    });
  } catch (error) {
    next(error);
  }
};

const hardDeleteProduct = async (req, res, next) => {
  const { productId } = req.params;
  console.log(productId);
  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      throw new NotFoundError(`Product Id: ${productId} was not found.`);
    }

    await product.deleteOne({ _id: productId }); //Hard delete --> delete from database
    res
      .status(200)
      .json({
        message: `Product has been deleted from database successfully.`,
      });
  } catch (error) {
    next(error);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  softDeleteProduct,
  hardDeleteProduct,
};
