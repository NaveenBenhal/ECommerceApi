const mongooes = require('mongoose')

const SubProductSchema = new mongooes.Schema({
    SubProductName : String,
    ProductTypeID : String
})

const SubProductModal = new mongooes.model('subproducttypes',SubProductSchema)

module.exports = SubProductModal


