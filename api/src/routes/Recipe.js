const { Router } = require('express');
const {Recipe} = require('../db');

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
       ingredients,image
    }=req.body;
   
    if(!name || !summary )
      return  res.status(404).send('Faltan algunos datos obligatorios, fijese si por name o summary');
      console.log(req.body)
    try {
        const newRecipe= await Recipe.create({
            name,
            summary,
            score,
            healthScore,
            ingredients,image
        })
        console.log(req.body)


        res.status(201).json(newRecipe);

    } catch (error) {
        console.log(error)
        res.status(404).send('Error en alguno de los datos provistos');

    }


})
module.exports = router;
