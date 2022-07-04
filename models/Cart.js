const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  products: [
    {
     title: { type: String },
     desc: { type: String },
     img: { type: String },
     categories: { type: Array },
     size: { type: Array },
     color: { type: Array },
     price: { type: Number },
     quantity:{type:Number},
     inStock:{type:Boolean,default:true},
   },
   ],
},{ timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);