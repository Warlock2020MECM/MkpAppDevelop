const express = require("express");
const {registerController, loginController, updateUserController, requireSignIn} = require('../controllers/userController.js')

//Ruta del objeto
const router = express.Router();

//Rutas
//REGISTER || POST
router.post('/register', registerController);

//LOGIN || POST
router.post('/login', loginController);

//UPDATE || PUT
router.put('/update-user', requireSignIn, updateUserController);

//Exportar
module.exports = router;
