const UserCart = require("../model/userCart");
const Product = require("../model/product");
const mongoose = require("mongoose");

const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    console.log("Incoming AddToCart Request:", { userId, productId, quantity });

    // Convert strings to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    // Check if product exists
    const product = await Product.findById(productObjectId);
    if (!product) {
      console.log("Product not found for ID:", productId);
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if item is already in cart
    const existingCartItem = await UserCart.findOne({
      userId: userObjectId,
      productId: productObjectId
    });

    if (existingCartItem) {
      existingCartItem.productQuantity += quantity || 1;
      await existingCartItem.save();
      return res.json({ message: "Product quantity updated in cart" });
    }

    // Create new cart item
    const cartItem = new UserCart({
      userId: userObjectId,
      productId: productObjectId,
      productQuantity: quantity || 1,
      cartId: userId // cartId can still be string (for grouping)
    });

    await cartItem.save();
    res.json({ message: "Product added to cart successfully" });

  } catch (err) {
    console.error("AddToCart Error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


const getMyCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const cartItems = await UserCart.find({ userId }).populate("productId");

    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const updateMyCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    const cartItem = await UserCart.findOne({ userId, productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    cartItem.productQuantity = quantity;
    await cartItem.save();

    res.json({ message: "Cart item updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports={
    addToCart,
    updateMyCart,
    getMyCart

}