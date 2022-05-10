import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets ,getRecipes} from "../redux/actions/index";
import style from "./CreateRecipe.module.css"
function CreateRecipe() {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.diets);
  const recipes= useSelector((state)=>state.recipes)
  const [error,setError] = useState({})
  const home =useHistory()

  const [info, setInfo] = useState({
    name: "",
    summary: "",
    spoonacularScore: "",
    healthScore: "",
    steps: "",
    diet:[],
    
  });
  const validate= (info) => 
  {
    const error={}
    // if(!info.name)
    // {
    //   error.name="Name is requred"
    // }
    // if(!info.summary)
    // {
    //   error.summary="Summary is required"
    // }
    if (!info.name) {
      error.name = 'Ingresar nombre de la receta'
  }

  if (!info.summary) {
      error.summary = 'Escribe un breve resumen'
  }
  // if (!info.spoonacularScore || info.spoonacularScore < 0 || info.spoonacularScore > 100) {
  //     error.score = 'Ingresa un valor de 0 a 100'
  // }
  // if (!info.healthScore || info.healthScore < 0 || info.healthScore > 100) {
  //     error.healthScore = 'Ingresa un valor de 0 a 100'
  // }
  // if (!error.stepByStep.length) {
  //     error.stepByStep = 'Escribe una serie de pasos sobre cómo cocinar la receta'
  // }
  // if (!info.image) {
  //     error.image = 'Ingresar URL de alguna imagen representativa'
  // }
  // if (!info.diets.length) {
  //     error.diets = 'Elige al menos un tipo de dieta'
  // }
    return error
  }
  function handleChange(e){
    setInfo(info =>{
      const newInfo={
      ...info,
      [e.target.name]:e.target.value,
      }
      const error=validate(newInfo)
      setError(error)
      return newInfo
    }) 
    
  }
  function handleSubmit(e)  {
    e.preventDefault()
    if(!info.name)
    {
      return alert("Por favor complete el nombre!! ");
    }
    if(!info.summary)
    {
      return alert("Por favor complete el resumen!! ");
    }
    // if(recipes.filter(e=>e.name.includes(info.name.toLowerCase())).length>0)
    // {
    //   return alert('Ya existe el nombre!')
    // }
    // if(recipes.filter(e=>e.summary.includes(info.summary.toLowerCase())).length>0)
    // {
    //   return alert('Ya existe el resumen!')
    // }
    
    if(Object.keys(error).length===0)
    {
      dispatch(postRecipes(info))
     alert("Receta Creada con éxitos!")
      setInfo({
        name: "",
        summary: "",
        spoonacularScore: "",
        healthScore: "",
        steps: "",
        diet:[],
      })
      home.push('/recipes'); 
    }
    else{
     alert('Please, fill in all the required fields')
    }
 
  }
  function handleSelect(e){
     setInfo({
       ...info,
       diet:[...info.diet, e.target.value]
     })
  }
  useEffect(() => {
    dispatch(getDiets());
    dispatch(getRecipes())
  }, []);

  return (
    <div>
      <Link to="/recipes/">
        <button>Volver</button>
      </Link>
      <h1>Crea una nueva receta!</h1>
      <form  className={style.create}   onSubmit={ (e)=>handleSubmit(e)}>
        <div>           <label>Nombre</label>
          <input
            className={error.name ? style.nameError : style.name}

            value={info.name}
            type="text"
            placeholder="Nombre"
            name="name"
            onChange={(e)=> handleChange(e)}
          />
          {error.name && <p className={style.error}>{error.name}</p>}

        </div>
        <div>
          <label>Resumen</label>
          <input
            className={error.summary ? style.summaError : style.summa}

            value={info.summary}
            type="text"
            placeholder="Summary"
            name="summary"
            onChange={(e)=> handleChange(e)}
          />
          {error.summary && <span className={style.error}>{error.summary}</span>}

        </div>
        <div>
          <label>Score</label>
          <input
            value={info.spoonacularScore}
            type="number"
            min="0" max="100"
            placeholder="Score"
            name="spoonacularScore"
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div>
          <label>Health Score</label>
          <input
            value={info.healthScore}
            type="number"
            min="0" max="100"
            placeholder="healthScore"
            name="healthScore"
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div >
          <label>Steps</label>
          <input
          className={style.steps}
            value={info.steps}
            type="text"
            placeholder="steps"
            name="steps"
            onChange={(e)=> handleChange(e)}
          />
        </div>
        <div>
          <label>Image</label>
          <input
            value={info.image}
            type="text"
            placeholder="image"
            name="image"
            onChange={(e)=> handleChange(e)}
          />
        </div>

        <select onChange={(e) => handleSelect(e)}>
          {diets.map((diet) => (
            <option value={diet.name}>{diet.name}s</option> 
            ))}
        </select >
        <ul><li>{info.diet.map(e=> e + ',')}{console.log(info)}</li></ul>
        <button type="submit">Crear mi receta</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
