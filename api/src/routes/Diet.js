const { Router } = require("express");
const { Diet } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).json(await Diet.findAll());
  } catch (error) 
  {
    res.status(404).json({ error: error.message });
  }
});
module.exports = router;
