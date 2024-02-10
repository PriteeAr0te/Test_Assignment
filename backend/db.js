const mongoose = require('mongoose');
const mongoURL = "mongodb://localhost:27017/Assignment"

const connectToMongo = async() => {
    try{
        await mongoose.connect(mongoURL)
        console.log("Connected to MongoDB Successfully")
    }
    catch(error){
        console.log("Error Occurred during Connecting to database")
    }
}

module.exports = connectToMongo;