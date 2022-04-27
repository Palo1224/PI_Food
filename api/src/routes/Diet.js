const { Router } = require('express');
const {API_KEY}= process.env;
const {getDiet}=require('../controllers/callApi')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', async (req,res)=>{

    
        res.status(200).json(await getDiet());
    
})
module.exports = router;
