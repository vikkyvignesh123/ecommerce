const Product = require('../model/product');
const UserCart = require('../model/userCart');
const mongoose = require('mongoose');
const {nanoid}=require("nanoid");
const { findByIdAndDelete } = require('../model/userCart');

// Get All Product

const getAllProducts = async (req, res) => {
try{

   const allProduct = await Product.find()

   res.json({
    success:true,
    status:200,
    message:"Successfully Get All Products",
    data:allProduct
   })
}
catch(err)
{
    res.json({
        success:false,
        status:404,
        message:"cannot find getall Product"
    })
}
}
//get one product

const getProductById = async (req, res) => {
    try{
    const id = req.params.id;
    const product = await Product.findOne({"productId":id});
   res.json({
    success:true,
    status:200,
    message:"Successfully Get Product",
    data:product
   })
}
catch(err)
{
     res.json({
        success:false,
        status:404,
        message:"cannot find getall Product"
    })

}
}
// add product

async function addProduct(req, res) {
    try {
    const { userId, productId } = req.body;

    const userObjectId = new mongoose.Types.ObjectId(userId);
    const productObjectId = new mongoose.Types.ObjectId(productId);

    let cartItem = await UserCart.findOne({
      userId: userObjectId,
      productId: productObjectId
    });

    if (cartItem) {
      cartItem.productQuantity += 1;
      await cartItem.save();
      return res.json({ message: "Product quantity updated", cartItem });
    }

    const newCartItem = new UserCart({
      userId: userObjectId,
      cartId: userId,
      productId: productObjectId,
      productQuantity: 1
    });

    await newCartItem.save();

    res.json({ message: "Product added to cart", newCartItem });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding to cart", error: err.message });
  }
};

// update product

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;  

    const updatedProduct = await Product.findOneAndUpdate(
      { productId: productId },
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete Product

const deleteProduct = async (req, res) => {

const productId = req.params.id; // Note: Here id is productId, not _id

const deleteItem = await Product.findOneAndDelete({ productId: productId });

if (!deleteItem) {
    return res.status(404).json({
        success: false,
        message: "Product with given productId not found"
    });
}

res.json({
    success: true,
    message: "Successfully deleted product by productId",
    data: deleteItem
});
}


const getUserCart = async (req, res) => {
  try {
    const { userId } = req.params;

    const items = await UserCart.find({ userId: userId });

    let totalItems = 0;
    items.forEach(item => {
      totalItems += item.productQuantity;
    });

    res.json({ totalItems, items });
  } catch (err) {
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
};



module.exports={
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct,
    getUserCart

}