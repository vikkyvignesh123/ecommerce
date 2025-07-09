const { nanoid } = require("nanoid");
const fs = require("fs");
const path = require("path");

const cartcontroller = {
  async postcart(req, res) {
    const { productImg, productPrice, productName } = req.body;

    try {
      const result = await cartcontroller.cart({
        productImg,
        productPrice,
        productName
      });

      if (!result.success) {
        return res.status(result.status).json(result);
      }

      res.status(201).json({
        success: true,
        message: "Product added to cart",
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
//cart display code
getCartPage(req, res) {
  const jsoncart = path.join(__dirname, "../model/cart.json");

  if (!fs.existsSync(jsoncart)) {
    return res.render("cart", { cartItems: [] });
  }

  const cartData = fs.readFileSync(jsoncart, "utf-8");
  const cartItems = JSON.parse(cartData);

  res.render("cart", { cartItems });
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
          productname: cartdetails.productName,
          productprice: cartdetails.productPrice,
          productImage: cartdetails.productImg,
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
