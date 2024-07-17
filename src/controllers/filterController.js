import Product from "../models/product.model.js";
import NotFoundError from "../error/NotFoundError.js";

const filterProductsByCategory = async (req, res, next) => {
  const { category, search, sortBy, gender, sizes } = req.query;

  let query = {};

  if (category) {
    const categories = category.split(',');
    query.category = { $all: categories };
  }

  if (search) {
    query.$or = [
      { productName: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
    ];
  }

  if (gender) {
    query.category = { $in: gender.split(',') };
  }

  // if (priceRange) {
  //   const priceConditions = [];
  
  //   priceRange.forEach(range => {
  //     switch (range) {
  //       case 'lessThan2000':
  //         priceConditions.push({ unitPrice: { $lt: 2000 } });
  //         break;
  //       case '2000to4000':
  //         priceConditions.push({ unitPrice: { $gte: 2000, $lte: 4000 } });
  //         break;
  //       case '4000to8000':
  //         priceConditions.push({ unitPrice: { $gte: 4000, $lte: 8000 } });
  //         break;
  //       case 'moreThan8000':
  //         priceConditions.push({ unitPrice: { $gt: 8000 } });
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  
  //   // ใช้ $or เพื่อกรองตามช่วงราคา
  //   if (priceConditions.length > 0) {
  //     query.$or = priceConditions;
  //   }
  // }


  if (sizes) {
    query.sizeUs = { $in: sizes.split(',') };
  }

  let sort = {};
  switch (sortBy) {
    case 'สินค้าเด่น':
      sort = { createdDate: -1 };
      break;
    case 'ใหม่ล่าสุด':
      sort = { createdDate: -1 };
      break;
    case 'ราคา: สูง-ต่ำ':
      sort = { unitPrice: -1 };
      break;
    case 'ราคา: ต่ำ-สูง':
      sort = { unitPrice: 1 };
      break;
    default:
      break;
  }

  try {
    const products = await Product.find(query).sort(sort);
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