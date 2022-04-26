const { Router } = require('express');
const router = Router();
const {getAllInfo}=require('../controllers/index');


//#region 
// const getApi= async()=>
// {

//     try {
//             const resAxios=await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
//             const {results}=resAxios.data;
          
//             if(results.length>0)
//             {
//               let info= results.map(i=>{
//                   return {
//                       id:i.id,
//                       name:i.title,
//                       summary:i.summary,
//                       spoonacularScore:i.spoonacularScore,
//                       healthScore:i.healthScore,
//                       diets:i.diets,
//                       dishTypes:i.dishTypes,
//                       steps:i.analyzedInstructions.map(e=>e.steps),
//                       image:i.image,

//                   }
//               }) 
//                 return info
//             }
       
//     }catch (error) {
//         console.log(error);
//     }

// }


// const getDB = async ()=>
// {

//     try {
//         const db = await Recipe.findAll()
//         let info1=db.map(r=>{
//             return{
//                 name:r.name,
//                 summary:r.summary,
//             }
//         })
//             return info1;

//     } catch (error) {
//         console.log(error);
//     }

   
//     players4.map(p => console.log(p.toJSON()))
// } 
//#endregion
router.get('/', async(req,res)=>
{
   res.send(await getAllInfo())
  
})
router.get('/:id', async(req,res)=>{

})

module.exports = router;
