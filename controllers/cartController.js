//import product collection/model
const cartItems = require("../models/cartSchema");
const products = require("../models/cartSchema");

exports.addtocart = async (req, res) => {
  const { id, title, image, price, quantity } = req.body;
  try {
    const product = await cartItems.findOne({ id });
    if (product) {
      //product is in the cart
      product.quantity += 1;
      product.grandTotal = product.quantity * product.price;
      product.save();
      res.status(200).json("Items added to your cart");
    } else {
      //product not in cart
      const newProduct = new cartItems({
        id,
        title,
        image,
        price,
        quantity,
        grandTotal: price,
      });
      await newProduct.save();
      res.status(200).json("Item added to your cart");
    }
  } catch (error) {
    //error
    res.status(401).json(error);
  }
};

exports.getCart = async (req, res) => {
  try {
    const allItems = await cartItems.find();
    res.status(200).json(allItems);
  } catch (error) {
    res.status(400).json(error);
  }
};

//remove item from cart
exports.removefromcart = async (req, res) => {
  const { id } = req.params;
  try {
    const removeitem = await cartItems.deleteOne({ id });
    if (removeitem) {
      const allitems = await cartItems.find();
      res.status(200).json(allitems);
    } else {
      res.stats(404).json("Item not found in your cart");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//empty cart
exports.emptyCart = async (req, res) => {
  try {
    const items = await cartItems.deleteMany({});
    res.status(200).json("Your Cart is Empty");
  } catch (error) {
    res.status(401).json(error);
  }
};

//increment quantity
exports.incQuantity = async (req, res) => {
  //get prod id from req
  const { id } = req.params;
  try {
    //checking if product in cart
    const product = await cartItems.findOne({ id });
    if (product) {
      product.quantity += 1;
      product.grandTotal = product.price * product.quantity;
      await product.save();
      const allItems = await cartItems.find();
      res.status(200).json(allItems);
    } else {
      res.stats(404).json("Product not in your cart");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};

//decrement quantity
exports.decQuantity = async (req, res) => {
  //get prod id from req
  const { id } = req.params;
  try {
    //checking if product in cart
    const product = await cartItems.findOne({ id });
    if (product) {
      product.quantity -= 1;
      if (product.quantity == 0) {
        //remove product from cart
        await cartItems.deleteOne({ id });
        //get the remaining cart items
        const allItems = await cartItems.find();
        res.status(200).json(allItems);
      } else {
        product.grandTotal = product.price * product.quantity;
        await product.save();
        const allItems = await cartItems.find();
        res.status(200).json(allItems);
      }
    } else {
      res.stats(404).json("Product not in your cart");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
