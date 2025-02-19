const express = require('express');
const mongoose = require('mongoose'); // ✅ Import mongoose
const app = express();

const ApiRoutes = require('./Routes/ApiRoutes');

app.use(express.json()); // ✅ Parse JSON bodies

const DataBase = {
    Localurl: "mongodb://localhost:27017/DemoProject",
}

// DB Connection 
async function connectDB() {
    try {
        await mongoose.connect(DataBase.Localurl, {});
        console.log("Connected to MongoDB!!!...");
    } catch (error) {
        console.error("Error connecting to MongoDB:!!!...", error);
        process.exit(1);
    }
}

connectDB();


app.use('/api', ApiRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(3000, () => console.log('--------------------------------------- port 3000 --------------------------------'));
    