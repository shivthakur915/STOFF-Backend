const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();


//CREATE

router.post("/", async (req, res) => {
  console.log(req.body);
  
  const newCart = new Cart({
    userId:req.body.userId,
    products:req.body.products
  });
  console.log("In Cart post");
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(501).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  //console.log(req.body);
  const newCart ={
    userId:req.body.userId,
    products:req.body.products
  };
  try {
  //console.log("Inside Put")
 // console.log(req.body);
  const updatedCart=await Cart.findOneAndUpdate({userId:req.params.id},newCart,{new:true, upsert: true});
  //const updatedCart = await Cart.findByIdAndUpdate(req.params.id,req.body,{new:true});
  //console.log(updatedCart);
  res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;