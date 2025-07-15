const { nanoid } = require("nanoid");
const fs = require("fs");
const path = require("path");

const cartcontroller = {
async postcart(req, res) {
  const { username, useremail, userpassword } = req.body;

  if (!username || !useremail || !userpassword) {
    return res.status(400).json({
      success: false,
      message: "username, useremail, and userpassword are required"
    });
  }


  const userid = nanoid();
  const productid = nanoid();

  const productImg = "";
  const productPrice = "";
  const productName = "";

  try {
    const result = await cartcontroller.cart({
      userid,
      productid,
      username,
      useremail,
      userpassword,
      productImg,
      productPrice,
      productName
    });

    if (!result.success) {
      return res.status(result.status).json(result);
    }

    res.status(201).json({
      success: true,
      message: "User cart created with empty product details",
      data: result.data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
},

  async deleteCartitem(req, res) {
  const productId = req.params.id;
  const jsoncart = path.join(__dirname, "../model/cart.json"); 

  try {
    // Read existing cart data
    let cartData = [];
    if (fs.existsSync(jsoncart)) {
      const raw = fs.readFileSync(jsoncart, "utf-8");
      cartData = JSON.parse(raw);
    }

    // Check if product exists
    const exists = await cartData.some(item => item.productId === String(productId));
    if (!exists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
    }

    // Filter out the item
    const updatedCart = cartData.filter(item => item.productId !== productId);

    // Write updated data back to file
    fs.writeFileSync(jsoncart, JSON.stringify(updatedCart, null, 2));

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: err.message,
    });
  }
},


// Update product name using route params
async alterCartitem(req, res) {
  const { userid, productid, productprice } = req.params;
  const jsoncart = path.join(__dirname, "../model/cart.json");

  try {
    if (!fs.existsSync(jsoncart)) {
      return res.status(404).json({ success: false, message: "Cart file not found" });
    }

    const data = JSON.parse(fs.readFileSync(jsoncart, "utf-8"));

    console.log("Searching for productId:", productid);

    const foundItem = data.find(item => 
      item.userId === userid
    );

    if (!foundItem) {
      return res.status(404).json({ success: false, message: "User not found in cart" });
    }

    let productFound = false;

    foundItem.productDetails.forEach(product => {
      if (product.productId === productid) {
        product.productprice = productprice;   // Update price
        productFound = true;
      }
    });
      
    if (!productFound) {
      return res.status(404).json({ success: false, message: "Product not found in user's cart" });
    }

    fs.writeFileSync(jsoncart, JSON.stringify(data, null, 2));

    res.json({ success: true, message: "Product price updated", data: foundItem });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Update failed",
      error: err.message
    });
  }
},


//cart display code
getCartPage(req, res) {
  const jsoncart = path.join(__dirname, "../model/cart.json");

  if (!fs.existsSync(jsoncart)) {
    return res.render("cart.jade", { cartItems: [] });
  }

  const cartData = fs.readFileSync(jsoncart, "utf-8");
  const cartItems = JSON.parse(cartData);

  // res.render("cart.jade", { cartItems });
  res.json({
    success:true,
    status:200,
    message:cartItems,
  })
},

getdashboardPage(req, res) {
  try{
    // res.render("dashboard.jade");
    res.json({
      status:200,
      message:"successfully get dashboard page"

    })
  }
  catch(err)
  {
    res.json({
      status:404,
      message:"dashborad page cannot display"


    })
    console.log(err);
  }


},



 async cart(cartdetails) {
    return new Promise((resolve, reject) => {
      try {
        const jsoncart = path.join(__dirname, "../model/cart.json");
              let cartItems=[];
        if (!fs.existsSync(jsoncart)) {
          fs.writeFileSync(jsoncart, JSON.stringify([]));
        }

        const readcart = JSON.parse(fs.readFileSync(jsoncart, "utf-8"));

       const productdata = {
  cartId: nanoid(),
  productId: nanoid(),
  productname: cartdetails.productName || "",
  productprice: cartdetails.productPrice || "",
  productImage: cartdetails.productImg || "",
  
  username: cartdetails.username,
  useremail: cartdetails.useremail,
  userpassword: cartdetails.userpassword
};

        const productExists = readcart.some(
          (item) => item.productname === productdata.productname
        );

        if (productExists) {
          return resolve({
            success: false,
            status: 409,
            message: "Product already in cart",
          });
        }

        readcart.push(productdata);
        fs.writeFileSync(jsoncart, JSON.stringify(readcart, null, 2));

        resolve({
          success: true,
          data: productdata,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
};

module.exports = cartcontroller;
