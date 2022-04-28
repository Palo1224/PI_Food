const { Router } = require("express");
const { Recipe, Diet } = require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/", async (req, res) => {
  const { name, summary, spoonacularScore, healthScore, steps, diets } = req.body;

  if (!name || !summary)
    return res
      .status(404)
      .send("Faltan algunos datos obligatorios, fijese si por name o summary");
  try {
    const newRecipe = await Recipe.create({
      name,
      summary,
      spoonacularScore,
      healthScore,
      steps
    });

    ///MIXINS CON DIETA

    let db = await Diet.findAll({
      where: { name: diets },
    });
   
    newRecipe.addDiet(db);

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(404).send("Error en alguno de los datos provistos");
  }
});
module.exports = router;
