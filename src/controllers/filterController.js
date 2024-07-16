import Product from "../models/product.model.js";
import NotFoundError from "../error/NotFoundError.js";

const filterProductsByCategory = async (req, res, next) => {
  const { category, search } = req.query;
  
  let query = {};
  if (category) {
    const categories = category.split(',');
    query.category = { $all: categories };
  }
  if (search) {
    query.$or = [
      { productName: { $regex: search, $options: "i" } },
      { brand:       { $regex: search, $options: "i" } },
    ];
  }

  try {
    const products = await Product.find(query);
    if (products.length === 0) {
      throw new NotFoundError(`No products found for the given criteria.`);
    }
    return res.json({
      error: false,
      products,
      message: `Products retrieved successfully`,
    });
  } catch (error) {
    next(error);
  }
};

export { filterProductsByCategory };
