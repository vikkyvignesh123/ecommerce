const express = require("express");
const router = express.Router();
const newController = require("../contoller/newcontroller");

// Add to cart
router.post("/addtocart", newController.addToCart);

// Get user's cart
router.get("/getmycart/:userId", newController.getMyCart);

// Update cart quantity
router.put("/updatemycart", newController.updateMyCart);

module.exports = router;
