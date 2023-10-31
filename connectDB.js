// const mongoURI = 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.1';
const mongoose = require("mongoose");
const connectDb = async(uri)=>{
    return mongoose.connect(uri)
}

module.exports = {
    connectDb,
}