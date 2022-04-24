const { Router } = require('express');
const recipeRouter=require('./recipe')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipe',recipeRouter);

module.exports = router;
