const axios = require('axios').default;
const { Router } = require('express');
const {YOUR_API_KEY}=process.env;

const router = Router();



router.get('/', async(req,res)=>
{
    const getApi= async()=>
    {
    
        try {
                const resAxios=await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
                const {results}=resAxios.data;
              
                if(results.length>0)
                {
                  let info= results.map(i=>{
                      return {
                          name:i.title,
                          summary:i.summary,
                          spoonacularScore:i.spoonacularScore,
                          healthScore:i.healthScore,
                          diets:i.diets,
                          dishTypes:i.dishTypes,
                          steps:i.analyzedInstructions.map(e=>e.steps),
                          image:i.image,

                      }
                  }) 
                  
                  console.log(info)
                    return info
                }
           
        }catch (error) {
            console.log(error);
        }
    }
    
     res.send(await getApi())
    
  
})
  //  getApi()
        
    







module.exports = router;
