const {YOUR_API_KEY}=process.env;
const axios = require('axios').default;
const {Recipe}=require('../db')


//     async function createDb(data)
// {
// const {name,summary,spoonacularScore,healthScore,steps}=data;
// const newRecipe= await Recipe.create({
//     name,
//     summary,
//     spoonacularScore,
//     healthScore,
//     steps,
    
// })
// return newRecipe;
//     }
    async  function getApi ()
   {
   
    try {
        const resAxios=await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=50`);
        const {results}=resAxios.data;
      
        if(results.length>0)
        {
          let info= results.map(i=>{
              return {
                  id:i.id,
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
                return info
            }
        
        }catch (error) {
            console.log(error);
        }


    }

    async function getDB()
    {

        try {
            const db = await Recipe.findAll()
            let info1=db.map(r=>{
                return{
                    name:r.name,
                    summary:r.summary,
                }
            })
                return info1;

        } catch (error) {
            console.log(error);
        }

    }
    async function getAllInfo() {
        try{
            const apiInfo = await getApi();
            const infoTotal =apiInfo.concat(await getDB());
            return infoTotal;
        }catch (error) {
            console.error(error);
        }
    }



module.exports = {
  getApi,getDB,getAllInfo,
}