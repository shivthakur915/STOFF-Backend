const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors = require("cors");
const userRoutes=require("./routes/user.js");
const authRoutes=require("./routes/auth.js");
const productRoutes=require("./routes/product.js");
const cartRoutes=require("./routes/cart.js");
const orderRoutes = require("./routes/order");
const paymentRoutes= require("./routes/payment")
const emailRoutes= require("./routes/email")


dotenv.config();

const url=process.env.URL;

mongoose.connect(url,{ useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('DB Connected');
    })
    .catch((err) => {
        console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/users",userRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/products",productRoutes);
app.use("/api/carts",cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/checkout",paymentRoutes);
app.use("/api/email",emailRoutes);


app.listen(process.env.PORT || 8000,()=>{
	console.log("Server Connected");
})