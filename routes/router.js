//to define routes for client requests, create routes folder and router.js file

//import express
const express = require("express");

//import productController
const productController = require("../controllers/productController");

//import wishlistcontroller
const wishlistController = require("../controllers/wishlistController");

//import cartController
const cartController = require("../controllers/cartController");

//using express create object using Router class inorder to setup path
const router = new express.Router();

//resolve client request in various server routes
//API

//get-all-products
router.get("/products/all-products", productController.getallproducts);

//view product
router.get("/products/view-product/:id", productController.viewproduct);

//add to wishlist
router.post("/wishlist/add-product", wishlistController.addtowishlist);

//get all wishlist items
router.get("/wishlist/get-products", wishlistController.getwishlistItems);

//remove item from wishlist
router.delete("/wishlist/remove-item/:id", wishlistController.removefromwishlist);

//add item to cart
router.post("/cart/add-product", cartController.addtocart);

//get cart tiems
router.get("/cart/all-products", cartController.getCart);

//remove item from cart
router.delete("/cart/remove-item/:id", cartController.removefromcart);

//empty cart
router.delete("/cart/remove-all-items", cartController.emptyCart);

//increment cart items
router.get("/cart/increment-item/:id", cartController.incQuantity);

//decrement cart items
router.get("/cart/decrement-item/:id", cartController.decQuantity);

//export router
module.exports = router;
