const mongoose = require("mongoose");

const connectDB = () => {
    // if(process.argv.length < 3) process.exit(1);
    
    // const password = process.argv[2];
    
    // const url = `mongodb+srv://myAtlasDBUser:${password}@myatlasclusteredu.kguxzmt.mongodb.net/noteApp?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", false);
    
    const url = process.env.MONGODB_URI;

    console.log(`connection to ${url}`);

    mongoose
        .connect(url)
        .then((result) => {
            console.log("connected to MongoDB");
        })
        .catch((err) => {
            console.log(`Error connection to MongoDB:`, err.message);
        })
}

module.exports = connectDB;