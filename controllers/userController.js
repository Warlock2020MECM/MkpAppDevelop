  const JWT = require("jsonwebtoken");
  const { hashPassword, comparePassword } = require("../helpers/authHelper");
  const userModel = require("../models/userModel");
  var { expressjwt: jwt } = require("express-jwt");

//middleware
const requireSignIn = jwt({
  secret:process.env.JWT_SECRET, 
  algorithms: ["HS256"],
})

//Register - Registrar
const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //Validar
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "email is required",
      });
    }
    if (!password || password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "password is required & 6 characters large",
      });
    }
    //Usuario existente
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: "Ya hay un usuario registrado con este correo",
      });
    }
    //Hashed password
    const hashedPassword = await hashPassword(password);

    //Guardar este usuarioz
    const user = await userModel({
      name,
      email,
      password: hashedPassword,
    }).save();

    return res.status(201).send({
      success: true,
      message: "Usuario registrado correctamente. Porfavor Logearse ",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error en registrar API",
      error,
    });
  }
};

//Login - Iniciar sesión
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Validacion
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Porfavor, valida tu usuario y contrasena",
      });
    }
    //Buscar el usuario
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "Usuario no encontrado",
      });
    }
    //Match password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(500).send({
        success: false,
        message: "Usuario y contraseña invalida",
      });
    }
    //Token JWT
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_secret, {
      expiresIn: "7d",
    });
    //Contraseña indefinida
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Logeo completado",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error en Login API",
      error,
    });
  }
};

//Actualizar
const updateUserController = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    //Encontrar usuario
    const user = await userModel.findOne({ email });
    //Validar contraseña
    if (password && password.length < 6) {
      return res.status(400).send({
        success: false,
        message: "Password is required and should be 6 character long",
      });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    //Actualizar usuarioxw
    const updatedUser = await userModel.findOneAndUpdate(
      { email },
      {
        name: name || user.name,
        password: hashedPassword || user.password,
      },
      { new: true }
    );
    //TOKEN JWT
    const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {
      expiresIn: "7d"
    })
    //UNEFINED PASSWORD
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Profile Updated Please Login",
      updatedUser
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in User Update API",
      error
    });
  }
};

module.exports = {
  requireSignIn,
  registerController,
  loginController,
  updateUserController,
};
