import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets ,getRecipes} from "../redux/actions/index";
import NavBar from "./NavBar";

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
    healthScore: "",
    steps: "",
    diet:[],
    
  });

  const validate= (info) => 
  {
    const error={}

    if (!info.name) {
      error.name = 'Ingresar nombre de la receta'
  }

  if (!info.summary) {
      error.summary = 'Escribe un breve resumen'
    }
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
    if(recipes.filter(e=>e.name.includes(info.name.toLowerCase())).length>0)
    {
      return alert('Ya existe el nombre!')
    }
    if(recipes.filter(e=>e.summary.includes(info.summary.toLowerCase())).length>0)
    {
      return alert('Ya existe el resumen!')
    }
    
    
    if(Object.keys(error).length===0)
    {
      dispatch(postRecipes(info))
     alert("Receta Creada con éxitos!")
      setInfo({
        name: "",
        summary: "",
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
    <div className={style.container}>
      {/* <Link to="/recipes/">
        <button>Volver</button>
      </Link> */}
      <NavBar></NavBar>
      <h1>Crea una nueva receta!</h1>
      <form   key={info.id} className={style.create}   onSubmit={ (e)=>handleSubmit(e)}>
        <div>           <p>Nombre</p>
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
          <p>Resumen</p>
          <input
            className={error.summary ? style.summaError : style.summa}

            value={info.summary}
            type="text"
            placeholder="Summary"
            name="summary"
            onChange={(e)=> handleChange(e)}
          />
          {error.summary && <p className={style.error}>{error.summary}</p>}

        </div>
        
        <div className={style.steps}>
          <p>Steps</p>
          <input
          
            value={info.steps}
            type="text"
            placeholder="steps"
            name="steps"
            onChange={(e)=> handleChange(e)}
          />
        </div>

        <div  className={style.healthScore} >
         
          <p>Health Score</p>
          <input
            value={info.healthScore}
            type="number"
            min="0" max="100"
            placeholder="healthScore"
            name="healthScore"
            onChange={(e)=> handleChange(e)}
          />
        </div>

        <div className={style.image}>
          <p>Image</p>
          <input
            
            value={info.image}
            type="text"
            placeholder="image"
            name="image"
            onChange={(e)=> handleChange(e)}
          />
        </div>
       <div  className={style.diets}>
         <p>Que tipo de dieta es?</p>
       <select onChange={(e) => handleSelect(e)}>
          {diets.map((diet) => (
            <option value={diet.name}>{diet.name}s</option> 
            ))}
        </select >
        <ul className={style.ul}>
            {info.diet?.map((e) => (
              <li className={style.li}>{e}</li>
            ))}
          </ul>
       </div>
 
        
        <button type="submit">Crear mi receta</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
