const { Diet } = require("../db");

const diets = [
  { name: "gluten free" },
  { name: "dairy free" },
  { name: "vegetarian" },
  { name: "lacto ovo vegetarian" },
  { name: "ketogenic" },
  { name: "vegan" },
  { name: "pescatarian" },
  { name: "paleolithic" },
  { name: "primal" },
  { name: "fodmap friendly" },
  { name: "whole 30" },
];
async function getDiet() {
  await Diet.bulkCreate(diets, { ignoreDuplicates: true });
}
module.exports = { getDiet };
