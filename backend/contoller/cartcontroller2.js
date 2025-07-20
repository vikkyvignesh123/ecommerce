const UserCart = require("../model/userCart"); // Adjust path if needed
const { nanoid } = require("nanoid");
const mongoose=require('mongoose')

async function postcart(req, res) {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({
      success: false,
      message: "Missing userId or productId"
    });
  }

  try {
    const cartItem = await UserCart.findOne({
      userId: new mongoose.Types.ObjectId(userId),
      productId: new mongoose.Types.ObjectId(productId)
    });

    if (cartItem) {
      cartItem.productQuantity += 1;
      await cartItem.save();
      return res.json({
        success: true,
        message: "Product quantity updated",
        cartItem
      });
    } else {
      const newCartItem = new UserCart({
        userId,
        cartId: userId,
        productId,
        productQuantity: 1
      });

      await newCartItem.save();
      return res.json({
        success: true,
        message: "Product added to cart",
        newCartItem
      });
    }
  } catch (err) {
    console.error("❌ postcart error:", err);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message
    });
  }
}


async function getCartPage(req, res) {
  try {
    const cartItems = await UserCart.find();

    res.json({
      success: true,
      status: 200,
      message: "Cart fetched successfully",
      data: cartItems,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cart",
      error: err.message,
    });
  }
}

async function deleteCartitem(req, res) {
  const productId = req.params.id; // Product ID to delete

  try {
    // Find the user cart that contains this product
    const cart = await UserCart.findOne({
      "productDetails.productId": String(productId),
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Product not found in any cart",
      });
    }

    cart.productDetails = cart.productDetails.filter(
      (item) => item.productId !== productId
    );

    // Update productQuantity
    cart.productQuantity = cart.productDetails.length;

    // Save the updated cart
    await cart.save();

    res.json({
      success: true,
      message: "Product deleted successfully",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err.message,
    });
  }
}

async function alterCartitem(req, res) {
  const { userid, productid, productprice } = req.params;

  try {
    const cart = await UserCart.findOne({ userId: userid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "User not found in cart",
      });
    }

    let productFound = false;

    cart.productDetails.forEach((product) => {
      if (product.productId === productid) {
        product.productprice = productprice; // Update product price
        productFound = true;
      }
    });

    if (!productFound) {
      return res.status(404).json({
        success: false,
        message: "Product not found in user's cart",
      });
    }

    await cart.save();

    res.json({
      success: true,
      message: "Product price updated",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: err.message,
    });
  }
}

async function addProduct(req, res) {
  const { userid } = req.params;
  const { productname, productprice, productImage } = req.body;

  if (!productname || !productprice || !productImage) {
    return res.status(400).json({
      success: false,
      message: "productname, productprice, and productImage are required",
    });
  }

  try {
    const cart = await UserCart.findOne({ userId: userid });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found for user",
      });
    }

    // Create new product
    const newProduct = {
      productId: nanoid(),
      productname,
      productprice,
      productImage,
    };

    // Push product to cart
    cart.productDetails.push(newProduct);
    // Update quantity

    cart.productQuantity = cart.productDetails.length;

    await cart.save();

    res.json({
      success: true,
      message: "Product added successfully",
      data: cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: err.message,
    });
  }
}

module.exports = {
  postcart,
  getCartPage,
  deleteCartitem,
  alterCartitem,
  addProduct,

};
