const express  = require('express');
const app = express();
const path = require('path')
const dotenv = require('dotenv')
const cors = require('cors')
const methodOverride = require('method-override')
const  ejsMate =require('ejs-mate');
const { default: mongoose } = require('mongoose');
const Product = require('./model/product')
const bodyParser = require('body-parser')

const cities = require('./model/cities');

mongoose.connect('mongodb://localhost:27017/product');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error..."));
db.once("open", () => {
    console.log("Database connected...");
});
dotenv.config({path:'./config/config.env'})
app.engine('ejs',ejsMate); 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(bodyParser.json());
app.use(cors());
const categories = ['luxury','affordable'];

app.get('/',async(req,res)=>{
    const products = await Product.find({});
    res.render('products/home',{products});
    
});



//create new Products
app.get('/products/new',(req,res)=>{
 
    res.render('products/new'); //products/new
});

//Form for creating new Products
app.post('/products',async(req,res)=>{
    const product = new Product(req.body);
    await product.save();
    console.log(req.body)
    res.redirect('/')
    
});

//form to update products
app.get('/products/:id/edit',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit',{product});
});
//Update products
app.put('/products/:id',async(req,res)=>{
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
    res.redirect(`/products/${product.id}`)
    
});

//Delete a product
app.delete('/products/:id',async(req,res)=>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.redirect('/products')
});

//View all
app.get('/products',async(req,res)=>{
    const products = await Product.find({});
    res.render('products/index',{products})
});

// View Specific Listing
app.get('/products/:id', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/show', {product});
});


const port = 8000;
app.listen(`${port}`,()=>{
    console.log(`listening on port ${port}`)
});