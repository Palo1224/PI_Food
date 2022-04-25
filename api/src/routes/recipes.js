const axios = require('axios').default;
const { Router } = require('express');
const { route } = require('./recipe');
const {YOUR_API_KEY}=process.env;

const router = Router();



router.get('/', (req,res)=>
{
    const getApi= async()=>
    {
    
        try {
            const resAxios=await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=1`);
            
            console.log(resAxios.data.results)
        }catch (error) {
        }
    }
    getApi()
})
    
        
    







module.exports = router;
