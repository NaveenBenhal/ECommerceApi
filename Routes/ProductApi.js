const express = require('express');
const router = express.Router()
const mongoose = require('mongoose');
const ProductTypes = require('./../Models/ProductType')
const SubProductModal = require('./../Models/SubProductType')
const CreateProductModel = require('../Models/CreateProduct')
const multer = require("multer");
const path = require("path");

// Multer configuration
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
            allowedTypes.test(file.mimetype);

        if (isValid) {
            cb(null, true);
        } else {
            cb(new Error("Only JPG, JPEG, and PNG images are allowed"));
        }
    }
});
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
        let data = []
        if (Number(req.query.id) != 0) {
            data = await SubProductModal.find({ ProductTypeID: req.query.id })
        } else {
            data = await SubProductModal.find();
        }
        if (!data) {
            return res.status(404).json({ message: 'No data found', status: 404, data: [] });  // Send 404 Not Found error if no data is found
        }
        return res.status(200).json({ message: "Data found", status: 200, data: data })

    } catch (err) {
        return res.status(500).json({ message: err.message, Status: err.status, data: [] })
    }
})

// Ensure "ProductImage" matches the frontend's FormData field name
router.post("/createProduct", upload.single("ProductImage"), async (req, res) => {
    try {
        console.log("Received data:", req.body);
        console.log("Uploaded file:", req.file);

        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded", status: 400 });
        }

        // Parse JSON fields
        const productTypeId = JSON.parse(req.body.productTypeId);
        const subProductId = JSON.parse(req.body.subProductId);

        // Validate required fields
        if (!productTypeId?._id || !subProductId?._id || !req.body.name || !req.body.price || !req.body.description || !req.body.createdBy) {
            return res.status(400).json({ message: "Missing required fields", status: 400 });
        }

        // Create product object
        const productData = {
            productTypeId,
            subProductId,
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            createdBy: req.body.createdBy,
            ProductImage: `/uploads/${req.file.filename}`, // Save image path
        };

        console.log("productData file:", productData);
        // Save to MongoDB
        const data = await CreateProductModel.create(productData);

        if (data) {
            return res.status(201).json({ message: "Product created successfully", status: 201, product: data });
        }
    } catch (err) {
        console.error("createProduct ERROR:", err);
        return res.status(500).json({ message: err.message, status: 500 });
    }
});


router.post('/getProducts', async (req, res) => {
    try {
        console.log('getProducts req.body', req.body);
        let resultData = []
        if (req.body.userId) {
            resultData = await CreateProductModel.find({ createdBy: req.body.userId })
        } else {
            resultData = await CreateProductModel.find()
        }

        if (req.body.productId) {
            resultData = await resultData.filter((item) => item.productTypeId._id == req.body.productId)
        }

        if (req.body.subProductId) {
            resultData = await resultData.filter((item) => item.subProductId._id == req.body.subProductId)
        }   

        if (resultData) {
            return res.status(200).json({ message: "Data found", status: 200, data: resultData })
        }
    } catch (err) {
        return res.status(err.status).json({ message: err.message, status: err.status })
    }
})



module.exports = router;
