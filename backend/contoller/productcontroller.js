const Product = require('../model/product');
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

const addProduct = async (req, res) => {
    try{
        const {productname,productprice,productImage}=req.body;

        const newAddProduct = await new Product({
            productId: nanoid(),
            productname: productname,
            productprice: productprice,
            productImage: productImage,
            createdat:Date.now()
        })

       await newAddProduct.save()
        res.json({
            success:true,
            status:200,
            message:"Successfully product stored"
        })
}
catch(err)
{
    res.json({
        success:false,
        status:404,
        message:"cannot stored product "
    })
}
}
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



module.exports={
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct

}