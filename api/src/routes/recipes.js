const { Router } = require("express");
const router = Router();
const { getAllInfo, getId, getName } = require("../controllers/index");


router.get("/", async (req, res) => {
  const {name}= req.query;
   try {
     if(name)
     {
      res.status(200).json(await getName(name))
     }
     else
     {
       res.status(200).json(await getAllInfo());
     }
  } catch (error) {
    
    res.status(404).json({error:error.message});
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    res.status(200).json(await getId(id));
  } catch (error) {
    res.status(404).json({error:error.message});
  }
});


module.exports = router;
