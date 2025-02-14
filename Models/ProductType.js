const mongoose = require('mongoose');

const ProductTypeScema  =new mongoose.Schema({
    ProductTypeName : String
})
const ProductType = new mongoose.model('producttypes', ProductTypeScema)

module.exports = ProductType