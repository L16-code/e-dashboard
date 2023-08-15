const express=require('express');
const cors=require('cors');
require('./db/config');
const User=require("./db/users");
const Product=require("./db/Product")
// const mongoose=require('mongoose');

// const connectdb=async()=>{
//     mongoose.connect('mongodb://127.0.0.1:27017/e-comm');
//     const productSchema=new mongoose.Schema({});
//     const products=mongoose.model('products',productSchema);
//     const data=await products.find();
//     console.warn(data);
// }
// connectdb();
const app = express();
app.use(cors());
app.use(express.json());
app.post("/register",async (req, res)=>{
    let user=new User(req.body);
    let result =await user.save();
    result=result.toObject();
    delete result.password;
    res.send(result);
});

app.post("/login",async(req, res)=>{
    console.log(req.body);
    if(req.body.password && req.body.email){
    let user = await User.findOne(req.body).select("-password");
    if(user){
        res.send(user);
    }
    else{
        res.send({result:"no user found"});
    }
}
else{
    res.send({result:"no user found"})
}
    // res.send(req.body);
})
// app.get("/", (req, res) => {
//     res.send("app is not working");
// })

app.post("/add-product",async (req, res) => {
    let product =new Product(req.body);
    let result = await product.save();
    res.send(result);
})

app.get('/products', async (req, res) => {
    let products = await Product.find();
    if(products.length > 0)
    {
        res.send(products);

    }
    else{
        res.send({result: "no products found"});
    }
})

app.delete("/product/:id",async (req,res)=>{
    // res.send(req.params.id);
    const result =await Product.deleteOne({_id:req.params.id});
    res.send(result);


})

app.get("/product/:id",async(req,res)=>{
    let result = await Product.findOne({_id:req.params.id});
    if(result){
        res.send(result);
    }
    else{
        res.send({result:"product not found"});
    }
})
app.put("/product/:id",async(req, res)=>{
    let result= await Product.updateOne({_id:req.params.id},
        {
            $set:req.body
        });
        res.send(result);
})
app.listen(5000);