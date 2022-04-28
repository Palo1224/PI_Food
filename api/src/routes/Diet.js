const { Router } = require('express');
const {Diet} = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req,res)=>{

        // const diets=await getDiet()
      
        res.status(200).json(await Diet.findAll());
    
})
module.exports = router;
