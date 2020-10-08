const express = require("express");
const bodyParser = require("body-Parser");
const mongoose = require("mongoose");
const shortid = require("shortid");
 
 

// create a web server the run express
const app = express();
// why use json, it means when i have a new request  to this server it read as a json content
app.use(bodyParser.json());

// initialice mongo database
// 2 parameters define better conection to the dB 
// mongoose.connect(1parameter, {2 parameter});
mongoose.connect("mongodb://localhost/react-shopping-cart-db",{   
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// define the product model
// this modal  accept 2 parameters
const Product = mongoose.model(
    "products",
 new mongoose.Schema({
    _id :{ type: String, default: shortid.generate },
    title: String,
    image: String,
    price: Number,
    availableSizes: [String],
})
);

// list of products
// // define the first end point
// get the list of products from database

app.get("/api/products", async (req, res) => {
    // need acces to modal
    // find is  a Promise so we have to ose async await
    const products =  await Product.find({});
    res.send(products);
});

// create new products
// we need to create a end point with products
// we are sending a request from FRONT-END to this endpoint
app.post("/api/products", async (req, res) =>{
    // with this three line of code we can create a product inside the dB
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.send(savedProduct);
});

// delete product
app.delete("/api/products/:id", async (req, res) =>{
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.send(deletedProduct);
})

// launch the server

const port  = process.env.PORT || 5000;
app.listen(port, () => console.log("serve at http://localhost:5000"))






