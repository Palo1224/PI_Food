const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post('/',async (req,res)=>{

   const {
       name,
       summary,
       score,
       healthScore,
       ingredients
    }=req.body;
   


})
module.exports = router;
