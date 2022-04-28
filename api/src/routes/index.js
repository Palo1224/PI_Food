const { Router } = require('express');
const recipeRouter=require('./recipe')
const dietRouter= require('./diet')
const recipesRouter= require('./recipes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipe',recipeRouter);
router.use('/recipes',recipesRouter);

router.use('/types',dietRouter);

module.exports=router
