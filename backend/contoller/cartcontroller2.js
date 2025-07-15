const UserCart = require("../model/userCart"); // Adjust path if needed
const { nanoid } = require("nanoid");

async function postcart(req, res) {
  const { username, useremail, userpassword } = req.body;

  // Validation
  if (!username || !useremail || !userpassword) {
    return res.status(400).json({
      success: false,
      message: "username, useremail, and userpassword are required",
    });
  }

  try {
    // Create new user cart document
    const {
      username,
      useremail,
      userpassword,
      productname,
      productprice,
      productImage,
    } = req.body;

    const newCart = new UserCart({
      userId: nanoid(),
      username,
      useremail,
      userpassword,
      cartId: nanoid(),
      productQuantity: 1,
      productDetails: [
        {
          productId: nanoid(),
          productname,
          productprice,
          productImage,
        },
      ],
    });

    // Save to MongoDB
    await newCart.save();

    res.status(201).json({
      success: true,
      message: "User cart created successfully in MongoDB",
      data: newCart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
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

//REGISTER FORM

async function register(req, res) {
  const { username, useremail, userpassword } = req.body;

  if (!username || !useremail || !userpassword) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await UserCart.findOne({ useremail });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Create new user with empty cart
    const newUser = new UserCart({
      userId: nanoid(),
      username,
      useremail,
      userpassword,
      cartId: nanoid(),
      productQuantity: 0,
      productDetails: []
    });

    await newUser.save();

    res.json({ success: true, message: "Registered successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Register failed", error: err.message });
  }
}

//LOGIN FORM 

async function login(req, res) {
  const { useremail, userpassword } = req.body;

  try {
    const user = await UserCart.findOne({ useremail, userpassword });

    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    res.json({ success: true, message: "Login successful", data: user });

  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err.message });
  }
}

module.exports = {
  postcart,
  getCartPage,
  deleteCartitem,
  alterCartitem,
  addProduct,
  register,
  login
};
