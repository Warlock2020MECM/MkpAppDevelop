const postModel = require("../models/postModel");
const JWT = require("jsonwebtoken");
var { expressjwt: jwt } = require("express-jwt");

//Crear publicacion
const createPostController = async (req, res) => {
  try {
    const { title, description } = req.body;
    //Validar
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Porfavor, llena todos los campos",
      });
    }
    const posts = await postModel({
      title,
      description,
      postedBy: req.auth._id,
    }).save();

    res.status(201).send({
      success: true,
      message: "Publicacion creada de forma correcta",
      posts,
    });
    console.log(req);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create Post API",
      error,
    });
  }
};

// Obtener todas las publicaciones
const getAllPostsController = async (req, res) => {
  try {
    const posts = await postModel
      .find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Todas las publicaciones",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error al obtener los productos de la API",
      error,
    });
  }
};
// Obtener las publicaciones del usuario
const getUserPostsControllers = async (req, res) => {
  try {
    const userPosts = await postModel.find({ postedBy: req.auth._id });
    res.status(200).send({
      success: true,
      message: "user posts",
      userPosts,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in User POST API",
      error,
    });
  }
};
// Eliminar publicaciones
const deletePostControllers = async (req, res) => {
  try {
    const {id} = req.params;
    await postModel.findByIdAndDelete({ _id: id });
    res.status(200).send({
      success: true,
      message: "Publicacion eliminada de forma correcta",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error en eliminar publicaciones de la API",
      error,
    });
  }
};

const updatePostControllers  = async (req,res) => {
  try {
    const { title, description } = req.body;
    //Buscar publicacion
    const post = await postModel.findById({_id:req.params.id});
    //Validar
    if(!title || !description){
      return res.status(500).send({
        success: false,
        message: "Porfavor, coloca el titulo o descripcion de la publicacion"
      });
    }
    const updatePost = await postModel.findByIdAndUpdate({_id: req.params.id},
      {
        title: title || post?.title,
        description: description || post?.description 
      },{new:true}
    );
    res.status(200).send({
      success: true,
      message: 'Se actualizo cambio completamete',
      updatePost,
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "Problema al actualizar API",
      error,
    })
  }
};

module.exports = {
  createPostController,
  getAllPostsController,
  getUserPostsControllers,
  deletePostControllers,
  updatePostControllers
};
