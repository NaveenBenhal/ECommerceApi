
const mongoose= require('mongoose')
const CreateProductScema = new mongoose.Schema({
    productTypeId: Object,
    subProductId: Object,
    name: String,
    price: String,
    description: String,
    createdBy: String,
    ProductImage: String // Add image field
})
const Products = new mongoose.model('products', CreateProductScema)


module.exports = Products

