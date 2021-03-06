import axios from 'axios'
export const GET_RECIPES = 'GET_RECIPES';
export const GET_RECIPES_NAME= 'GET_RECIPES_NAME';
export const FILTER_DIETS= 'FILTER_DIETS';
export const FILTER_BY_NAME= 'FILTER_BY_NAME';
export const FILTER_SCORE= 'FILTER_SCORE';
export const GET_DIETS= 'GET_DIETS';
export const POST_RECIPE = 'POST_RECIPE'
export const GET_DETAILS= 'GET_DETAILS';
export const CLEAR_PAGE ="CLEAR_PAGE";
export const FILTER_DATOS="FILTER_DATOS";
export const FILTER_DB="FILTER_DB";

export function getRecipes(){
	return function(dispatch){
		return axios.get('/recipes')
		.then(( json ) => dispatch({type: GET_RECIPES, payload: json.data}))
		
	}
}
export function getDiets()
{
   return async function(dispatch) {
      const diets=await axios.get('/types')
	  return dispatch({type: GET_DIETS, payload:diets.data})
	   }
}
export function postRecipes(payload)
{
	return async function(dispatch) {
		const post=await axios.post('/recipe',payload)
		// .then(()=> window.alert('Receta creada exitosamente'))
        // .catch((error)=> window.alert(error.response.data))
		return post;

	}
}
export function delDB(payload)
{
	return async function(dispatch) {
		const post=await axios.delete('/recipes',payload)
		// .then(()=> window.alert('Receta creada exitosamente'))
        // .catch((error)=> window.alert(error.response.data))
		return post;

	}
}
export function filterRecipes(payload)
{ 
	
   return { 
	    type: FILTER_DIETS,
		payload,
   }
}


export function filterRecipesByName(payload)
{
	return {
		type: FILTER_BY_NAME,
		payload
	}
}
export function filterScore(payload)
{
   return {type: FILTER_SCORE, payload}
}
export function filterDB(payload)
{
	return { type:FILTER_DB,payload}
}
export function getRecipeName(name)
{
	 return async function(dispatch) {
		 try {
			 const json= await axios.get(`/recipes?name=${name}`)
			 return dispatch({type:GET_RECIPES_NAME ,payload:json.data})
			 
		 } catch (error) {
			 console.log({error: error.message}) 
		 } 
		
	 }

}


export function getDetailsId(id)
{ 


	return async function(dispatch)
	{

		
		try {

          var json= await axios.get(`/recipes/${id}`)
		  return dispatch({
             type:GET_DETAILS,
			 payload:json.data,
		  })  

		  
		}catch (error) {
           console.log(error)
		}

	}
}

export function clearPage()
{
	return {
		type:CLEAR_PAGE,

	}
}