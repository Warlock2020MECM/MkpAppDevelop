const mongoose = require("mongoose")
const colors = require("colors")

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect to DATABASE ${mongoose.connection.host}`.bgCyan.white)
    } catch (error) {
        console.log(`error en conexion ${error}`.bgRed.white
        )
    }
};

module.exports = connectDB;