import {
  GET_RECIPES,
  FILTER_DIETS,
  FILTER_BY_NAME,
  FILTER_SCORE,
  GET_RECIPES_NAME,
  GET_DIETS,
  GET_DETAILS,
  CLEAR_PAGE,
} from "../actions";
const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
  filter: [],
  details: {},

};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case GET_RECIPES:
      return {
        ...state,
        recipes: actions.payload,
        allRecipes: actions.payload,
      };
    case GET_RECIPES_NAME:
      return {
        ...state,
        recipes: actions.payload,
      };
    case GET_DIETS:
      return {
        ...state,
        diets: actions.payload,
      };
    case "POST_RECIPES":
      return {
        ...state,
      };

    case FILTER_DIETS:
      const allRecipes = [...state.allRecipes];
      const dietsFiltered =
        actions.payload === "All"
          ? allRecipes
          : allRecipes.filter((el) => el.diets.includes(actions.payload));

      return {
        ...state,
        recipes: dietsFiltered,
      };
    case FILTER_BY_NAME:
      const allRecipes2 = [...state.allRecipes];
      const sortedArray =
        actions.payload === "asc"
          ? allRecipes2.sort((a, b) => a.name.localeCompare(b.name))
          : allRecipes2.sort((a, b) => a.name.localeCompare(b.name)).reverse();

      return {
        ...state,
        recipes: sortedArray,
      };
     
  


    case FILTER_SCORE:
      const allRecipes3 = [...state.allRecipes];
      
      switch (actions.payload) {
        case "asc":
          let order1 = allRecipes3.sort(function (a, b) {
            console.log(allRecipes3)
            return a.healthScore - b.healthScore;
          });
          return {
            ...state,
            recipes: order1,
          };
        case "desc":
          let order2 = allRecipes3.sort((a, b) => {
            return b.healthScore - a.healthScore;
          });
          return {
            ...state,
            recipes: order2,
          };
        default:
          return state;
      }


    case GET_DETAILS:
      return {
        ...state,
        details: actions.payload,
      };
     case CLEAR_PAGE:
       return{
         ...state,
          details:{}
       }

    default:
      return state;
  }
}
