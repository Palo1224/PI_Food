
const { Diet } = require("../db");

const diets = [
  { name: "Gluten Free" },
  { name: "Vegetarian" },
  { name: "Lacto-Vegetarian" },
  { name: "Ovo-Vegetarian" },
  { name: "Ketogenic" },
  { name: "Vegan" },
  { name: "Pescetarian" },
  { name: "Paleo" },
  { name: "Primal" },
  { name: "Low FODMAP" },
  { name: "Whole30" },
];
async function getDiet() {
  await Diet.bulkCreate(diets);
}
module.exports = { getDiet };
