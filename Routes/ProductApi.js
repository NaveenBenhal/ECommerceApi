const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ProductTypes = require('./../Models/ProductType')
const SubProductModal = require('./../Models/SubProductType')

// Product-Type Route
// console.log('Product-Type Route',ProductTypes);

router.get('/getProductTypes', async (req, res) => {
    try {
        const Data = await ProductTypes.find();
        // console.log('getProductTypes', JSON.stringify(Data, null, 2));
        if (!Data) {
            return res.status(404).json({ message: 'No data found', status: 404, data: [] });  // Send 404 Not Found error if no data is found
        }
        return res.status(200).json({ message: "Data found", status: 200, data: Data });
    } catch (err) {
        return res.status(500).json({ message: err.message, status: err.status, data: [] });
    }
})


router.get('/getSubProductTypes', async (req, res) => {
    try {
        console.log('getSubProductTypes req.query', req.query);

        const data = await SubProductModal.find({ ProductTypeID: req.query.id })
        if (!data) {
            return res.status(404).json({ message: 'No data found', status: 404, data: [] });  // Send 404 Not Found error if no data is found
        }
        return res.status(200).json({ message: "Data found", status: 200, data: data })

    } catch (err) {
        return res.status(500).json({ message: err.message, Status: err.status, data: [] })
    }
})

module.exports = router;
