//import product collection/model
const wishlists = require("../models/wishlistSchema");
const products = require("../models/wishlistSchema");

//add to wishlist
exports.addtowishlist = async (req, res) => {
  //get product details from req
  //using destructuring
  const { id, title, price, image } = req.body;
  //   console.log(req.body.title);

  //logic
  try {
    //checking if product is available in wishlist
    const item = await wishlists.findOne({ id });
    if (item) {
      res.status(200).json("Item already present in your Wishlist");
    } else {
      //add item to wishlist
      const newProduct = new wishlists({ id, title, price, image });

      //store in db
      await newProduct.save();
      res.status(200).json("Item Added to your Wishlist");
    }
  } catch (err) {
    res.stats(401).json(err);
  }
};

//get wishlist
exports.getwishlistItems = async (req, res) => {
  try {
    const allProducts = await wishlists.find();
    res.status(200).json(allProducts);
  } catch (error) {
    res.status(401).json(error);
  }
};

//remove item from wishlist
exports.removefromwishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const removeitem = await wishlists.deleteOne({ id });
    if (removeitem) {
      const allitems = await wishlists.find();
      res.status(200).json(allitems);
    } else {
      res.stats(404).json("Item not found in your wishlist");
    }
  } catch (error) {
    res.status(401).json(error);
  }
};
