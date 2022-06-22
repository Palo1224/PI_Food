const { YOUR_API_KEY } = process.env;
const axios = require("axios").default;
const { Recipe, Diet } = require("../db");
const foods =require("../food.json")
async function getApi() {

  // const resAxios = await axios.get(
  //   `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`
  // );
  const { results } = foods;
  if (results.length > 0) {
    let info = results.map((i) => {
      return {
        id: i.id,
        name: i.title,
        summary: i.summary,
        healthScore: i.healthScore,
        diets: i.diets,
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
  let jsonDbRecipes = db
    ? db.map((e) => {
        return {
          id: e.id,
          name: e.name,
          summary: e.summary,
          healthScore: e.healthScore,
          image: e.image,
          diets: e.diets.map((e) => e.name),
          steps: e.steps
        };

      })
    : [];
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
  //cada cadena contigua de caracteres de espacio se reemplaza con la cadena vacía debido a la extensión +.
  //Sin embargo, al igual que 0 multiplicado por cualquier otra cosa es 0, parece que ambos métodos eliminan los espacios exactamente de la misma manera.
  // s+ significa si hay mas de un espacio lo remplazamos por vacio
  // el trim es como que comprime
  name_1 = name_1.replace(/\s+/g, "").trim();
  console.log(name_1)
  // name_1= name_1.replace(/\s+/g,'')
  //USO FILTER PORQUE QUIERO ME TRAIGA TODOS LO QUE EXISTE POR SU NOMBRE
  //SI LE PONGO MAP SOLO ME TRAERA SOLO UN A
  if (allInfo.length > 0) {
    const filterByName = await allInfo.filter((r) =>
      r.name.toLowerCase().includes(name_1.toLowerCase())
    );
    if(!(filterByName.length)) throw new Error("No se encontro la receta!");

    return filterByName;
  }throw new Error("No se encontro la receta!");

  
}
async function getId(id_1) {
  var ValorNumerico = /^[0-9]+$/;
  let foods = [...foodjs]  
  let foodFilter = foods.filter(e=>e.id==id_1)

  if (ValorNumerico.test(id_1)) {

  //   const resId = await axios(
  //     `https://api.spoonacular.com/recipes/${id_1}/information?apiKey=${YOUR_API_KEY}`
  //     );
    const results = foods.results;
    const food=results.filter(e=>e.id==id_1)
    if (food.length>0) {
      const {
        id,
        title,
        summary,
        healthScore,
        diets,
        analyzedInstructions,
        image,
      } = food[0];

      let infoApi1 = {
        id,
        name: title,
        summary,
        healthScore,
        diets,
        steps:
          analyzedInstructions[0] && analyzedInstructions[0].steps
            ? analyzedInstructions[0].steps.map((item) => item.step).join(" \n")
            : "",
        image,
      };
      return infoApi1;
    } else {
      throw new Error("No se encontro nada en la API");
    }
  } else {
    const recipeFinded = await Recipe.findByPk(id_1, {
      include: {
        model: Diet,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    if (Object.keys(recipeFinded).length> 0) {
      let {
        id,
        name,
        summary,
        healthScore,
        steps,
        image,
        diets,
      } = recipeFinded;

      let jsonDbRecipes = {
        id,
        name,
        summary,
        healthScore,
        steps,
        image,
        diets: diets.map((e) => e.name),
      };

      let infoIdDB = jsonDbRecipes;
      return infoIdDB;
    } else {
      throw new Error("No se encontro nada en la DB");
    }
  }
}


module.exports = {
  getApi,
  getDB,
  getAllInfo,
  getId,
  getName
};
