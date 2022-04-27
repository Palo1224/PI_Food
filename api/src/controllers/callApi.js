const {Diet}=require('../db')



const diets = [
  "Gluten Free",
  "Vegetarian",
  "Lacto-Vegetarian",
  "Ovo-Vegetarian",
  "Ketogenic",
  "Vegan",
  "Pescetarian",
  "Paleo",
  "Primal",
  "Low FODMAP",
  "Whole30",
];



async function getDiet(){
    if(diets.length > 0){
        try{
            const infoDiet= await Diet.create()
            return infoDiet;

        }catch(e)
        {
            console.error(e)
        }
    }
}
module.exports ={getDiet};