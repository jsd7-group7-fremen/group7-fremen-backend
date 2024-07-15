import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import BadRequestError from "../error/BadRequestError.js";
import NotFoundError from "../error/NotFoundError.js";
import mongoose from "mongoose";


// เพิ่มสินค้าในตะกร้า
const addToCart = async (req, res, next) => {
  try {
    const { _id, productId, quantity, size } = req.body;

    if (!_id || !productId || !quantity || !size  ) {
      throw new BadRequestError("Missing required fields");
    }

    // ตรวจสอบสินค้าว่ามีอยู่ในฐานข้อมูลหรือไม่
    const product = await Product.findById(productId);
    if (!product) {
      throw new NotFoundError("Product not found");
    }

    // ค้นหาผู้ใช้และตะกร้าสินค้าของผู้ใช้
    let user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError("User not found");
    }
  
    // ตรวจสอบว่าสินค้าอยู่ในตะกร้าแล้วหรือไม่
    const itemIndex = user.cart.findIndex((item) => item.productId.toString() === productId && item.size.toString() === size );
    if (itemIndex > -1) {
      // ถ้ามีอยู่แล้วให้เพิ่มจำนวน
      user.cart[itemIndex].quantity += quantity;
    } else {
      // ถ้าไม่มีอยู่ในตะกร้าให้เพิ่มสินค้าใหม่
      user.cart.push({ productId, quantity, size });
    }

    await user.save();
    res.status(200).json({ message: "Product added to cart", cart: user.cart });
  } catch (error) {
    next(error);
  }
};

// ลบสินค้าออกจากตะกร้า
const removeFromCart = async (req, res, next) => {
  try {
    const { _id, productId,size } = req.body;

    if (!size) {
      throw new BadRequestError("Missing size fields");
    }

    if (!_id || !productId) {
      throw new BadRequestError("Missing required fields");
    }

    let user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // กรองสินค้าที่ไม่ตรงกับ productId ออกจากตะกร้า
    user.cart = user.cart.filter((item) => item.productId.toString() !== productId || item.size.toString() !== size);

    await user.save();
    res.status(200).json({ message: "Product removed from cart", cart: user.cart });
  } catch (error) {
    next(error);
  }
};

// อัปเดตจำนวนสินค้าในตะกร้า
const updateCart = async (req, res, next) => {
    try {
      const { _id, productId, quantity, size } = req.body;
  
      if (!_id || !productId || (quantity === undefined && size === undefined)) {
        throw new BadRequestError("Missing required fields");
      }
  
      let user = await User.findById(_id);
  
      if (!user) {
        throw new NotFoundError("User not found");
      }
  
      const itemIndex = user.cart.findIndex((item) => item.productId.toString() === productId);
  
      if (itemIndex > -1) {
        // อัปเดตจำนวนสินค้าและขนาดรองเท้า
        if (quantity !== undefined) {
          user.cart[itemIndex].quantity = quantity;
        }
        if (size !== undefined) {
          user.cart[itemIndex].size = size;
        }
        await user.save();
        res.status(200).json({ message: "Cart updated", cart: user.cart });
      } else {
        throw new NotFoundError("Product not found in cart");
      }
    } catch (error) {
      next(error);
    }
};
  

// ดึงข้อมูลตะกร้าสินค้าของผู้ใช้
const getCart = async (req, res, next) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      throw new BadRequestError("Missing userId");
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new BadRequestError("Invalid userId format");
    }

    const user = await User.findById(userId).populate('cart.productId');

    if (!user) {
      throw new NotFoundError("User not found");
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};


// ลบตะกร้าสินค้าของผู้ใช้
const clearCart = async (req, res, next) => {
  try {
    const { _id } = req.body;

    if (!_id) {
      throw new BadRequestError("Missing required field: _id");
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
      throw new BadRequestError("Invalid _id format");
    }

    const user = await User.findById(_id);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    // Log user data to verify the retrieved user object
    console.log("Retrieved user:", user);

    user.cart = [];
    await user.save();
    res.status(200).json({ message: "Cart cleared", cart: user.cart });
  } catch (error) {
    console.error("Error clearing cart:", error);
    next(error);
  }
};



export { addToCart, removeFromCart, updateCart, getCart, clearCart };
