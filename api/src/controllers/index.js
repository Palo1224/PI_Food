const { YOUR_API_KEY } = process.env;
const axios = require("axios").default;
const { Recipe } = require("../db");

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
async function getApi() {
  try {
    const resAxios = await axios(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
    );
    const { results } = resAxios.data;

    if (results.length > 0) {
      let info = results.map((i) => {
        return {
          id: i.id,
          name: i.title,
          summary: i.summary,
          spoonacularScore: i.spoonacularScore,
          healthScore: i.healthScore,
          diets: i.diets,
          dishTypes: i.dishTypes,
          steps: i.analyzedInstructions.map((e) => e.steps),
          image: i.image,
        };
      });
      return info;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getDB() {
  try {
    const db = await Recipe.findAll();
    let info1 = await db
    return info1;
  } catch (error) {
    console.log(error);
  }
}
async function getAllInfo() {
  try {
    const apiInfo = await getApi();
    const infoTotal = apiInfo.concat(await getDB());
    return infoTotal;
  } catch (error) {
    console.error(error);
  }
}

async function getId(id_1) {
  var ValorNumerico = /^[0-9]+$/;
 
    if (id_1.match(ValorNumerico)) {

        const resId = await axios(`https://api.spoonacular.com/recipes/${id_1}/information?apiKey=${YOUR_API_KEY}`);
        const results=resId.data;
        //console.log(results);
        const {id,title,summary,spoonacularScore,healthScore,diets,dishTypes,analyzedInstructions,image}=results;
        
          let infoApi1 =  
             {
              id,
              name:title,
              summary,
              spoonacularScore,
              healthScore,
              diets,
              dishTypes,
              steps:analyzedInstructions.map((e) => e.steps),
              image
            };
            
            return infoApi1;
            
        } 
        else{
          const db = await Recipe.findByPk(id_1);
          //#region // console.log(db)
          // if(!db)
          // {
              
          //     throw new Error ("id doesnt exist. Please insert a different id");        
                      
          // }
          //#endregion
          let infoIdDB = await db;
          return infoIdDB;
      
        }
        

        

        

    
    
    

  
}

module.exports = {
  getApi,
  getDB,
  getAllInfo,
  getId
};
