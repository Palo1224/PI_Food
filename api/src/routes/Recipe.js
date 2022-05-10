const { Router } = require("express");
const { Recipe, Diet } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  const { name, summary, spoonacularScore, healthScore, steps, diet,image } =req.body;
 

  if (!name || !summary)
    return res
      .status(404)
      .send("Faltan algunos datos obligatorios, fijese si por name o summary");
  try {
    let foodDbName = await Recipe.findAll({ 
      where: { name: name } 
  })
  if(foodDbName.length) throw new Error('El nombre ya existe, ingresar otro')
    const newRecipe = await Recipe.create({
      name,
      summary,
      spoonacularScore,
      healthScore,
      steps,
      image
   
    });

    ///MIXINS CON DIETA
    let db = await Diet.findAll({
      where: { name: diet },
    });

    newRecipe.addDiet(db);

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = router;
