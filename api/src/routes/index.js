const { Router } = require("express");
const recipeRouter = require("./recipe");
const dietRouter = require("./diet");
const recipesRouter = require("./recipes");

const router = Router();


router.use("/recipe", recipeRouter);
router.use("/recipes", recipesRouter);

router.use("/types", dietRouter);

module.exports = router;
