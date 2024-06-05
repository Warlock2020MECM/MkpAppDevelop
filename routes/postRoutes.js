const express = require("express");
const { requireSignIn } = require("../controllers/userController");
const { 
    createPostController, 
    getAllPostsController, 
    getUserPostsControllers, 
    deletePostControllers, 
    updatePostControllers 
} = require("../controllers/postController");

//Router Object
const router = express.Router();

//Crear Publicación || Publicar
router.post('/create-post',requireSignIn,createPostController);

//Mostrar todas las publicaciones
router.get('/get-all-posts', getAllPostsController);

//Mostrar las publicaciones de usuario
router.get('/get-user-post', requireSignIn, getUserPostsControllers);

//Eliminar las publicaciones
router.delete('/delete-post/:id', requireSignIn,deletePostControllers);

//Editar las publicaciones
router.put('/update-post/:id',requireSignIn,updatePostControllers);

//Exportar
module.exports = router;


