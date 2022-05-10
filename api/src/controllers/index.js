const { YOUR_API_KEY } = process.env;
const axios = require("axios").default;
const { Recipe, Diet } = require("../db");

async function getApi() {
  const resAxios = await axios.get(
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
        steps:
          i.analyzedInstructions[0] && i.analyzedInstructions[0].steps
            ? i.analyzedInstructions[0].steps
                .map((item) => item.step)
                .join(" \n")
            : "",
        image: i.image,
      };
    });

    return info;
  } else {
    throw new Error("No existe valores en la API!");
  }
}
async function getDB() {
  //
  const db = await Recipe.findAll({
    include: {
      model: Diet,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
 
    let jsonDbRecipes = db?db.map((e) => {
      return {
        id: e.id,
        name: e.name,
        summary: e.summary,
        spoonacularScore: e.spoonacularScore,
        healthScore: e.healthScore,
        instructions: e.instructions,
        image: e.image,
        diets: e.diets.map((e) => e.name),
      };
      
      //e.toJSON()
    })
    :[]
    let info1 = await jsonDbRecipes;
    return info1;

}
async function getAllInfo() {
  const apiInfo = await getApi();
  const infoTotal = apiInfo.concat(await getDB());
  return infoTotal;
}
async function getName(name_1) {
  const allInfo = await getAllInfo();
  name_1= name_1.replace(/\s+/g, ' ').trim()
  if (allInfo.length > 0) {
    const filterByName = await allInfo.filter((r) =>
      r.name.toLowerCase().includes(name_1.toLowerCase())
    );

    return filterByName;
  } else {
    throw new Error("No se encontro la receta!");
  }
}
async function getId(id_1) {
  var ValorNumerico = /^[0-9]+$/;
  var ValorLetras =/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  console.log(id_1);

  if (id_1.match(ValorNumerico)) {
    const resId = await axios(
      `https://api.spoonacular.com/recipes/${id_1}/information?apiKey=${YOUR_API_KEY}`
    );
    const results = resId.data;
    //console.log(results);
    const {
      id,
      title,
      summary,
      spoonacularScore,
      healthScore,
      diets,
      dishTypes,
      analyzedInstructions,
      image,
    } = results;

    let infoApi1 = {
      id,
      name: title,
      summary,
      spoonacularScore,
      healthScore,
      diets,
      dishTypes,
      steps: analyzedInstructions[0] && analyzedInstructions[0].steps
      ? analyzedInstructions[0].steps
          .map((item) => item.step)
          .join(" \n")
      : "",
      image,
    };
  console.log(infoApi1)
    return infoApi1;
  } else if (ValorLetras.test(id_1)) {
    const recipeFinded = await Recipe.findByPk(id_1,{
      include:{
          model: Diet,
          attributes: ['name'],
          through:{ 
              attributes: [], 
          },
      }
    })

    let {
      id,
      name,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image,
      diets,
    } = recipeFinded;
    
    let jsonDbRecipes = {
      id,
      name,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image,
      diets: diets.map((e) => e.name),
    };
  
    let infoIdDB = jsonDbRecipes;
    return infoIdDB;
  } else {
    throw new Error("No se encontro en la API ni en la  DB ");
  }
}

module.exports = {
  getApi,
  getDB,
  getAllInfo,
  getId,
  getName,
};
