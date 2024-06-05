const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const connectDB = require('./config/db.js');

// DOTENV
dotenv.config();

// MONGO DB CONNECTION
connectDB();

// NEW OBJECT
const app = express()

// MIDDLEWARE
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// ROUTES
app.use('/api/v1/auth',require('./routes/userRoutes.js'));
app.use('/api/v1/post',require('./routes/postRoutes.js'));

// PUERTO
const PORT = process.env.PORT || 8080

//LISTEN
app.listen(PORT,()=>{
    console.log(`Server is running ${PORT}`.bgGreen.white);
});


// ROUTES
// app.get("",(req,res) => {
//     res.status(200).json({
//         success: true,
//         message: "Welcome to full stack app cambio 4",
//     })
// })
