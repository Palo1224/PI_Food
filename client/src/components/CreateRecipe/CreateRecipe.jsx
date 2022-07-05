import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { postRecipes, getDiets ,getRecipes} from "../../redux/actions/index";
import NavBar from "../NavBar/NavBar";

import style from "../CreateRecipe/CreateRecipe.module.css"
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
      error.name = 'Enter Name of the recipe'
  }

  if (!info.summary) {
      error.summary = 'Write a short summary'
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
      return alert("Please fill in the name!! ");
    }
    if(!info.summary)
    {
      return alert("Please fill in the summary!! ");
    }
    if(recipes.filter(e=>e.name.includes(info.name.toLowerCase())).length>0)
    {
      return alert('Name already exists!')
    }
    if(recipes.filter(e=>e.summary.includes(info.summary.toLowerCase())).length>0)
    {
      return alert('Summary already exists!')
    }
    
    
    if(Object.keys(error).length===0)
    {
      dispatch(postRecipes(info))
     alert("Recipe Created with Success!")
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
    <div>      <NavBar></NavBar>
   
    <div className={style.container}>
      <h1>Create a new recipe!</h1>
      <form   key={info.id} className={style.create}   onSubmit={ (e)=>handleSubmit(e)}>
        <div>          
           <span>Name</span><br></br>
          <input
            className={error.name ? style.nameError : style.name}
            
            value={info.name}
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e)=> handleChange(e)}
            /><br></br>


            {error.name && <span className={style.error}>{error.name}</span>}

        </div>
        <div>
          <span>Summary</span><br></br>
          <input
            className={error.summary ? style.summaError : style.summa}

            value={info.summary}
            type="text"
            placeholder="Summary"
            name="summary"
            onChange={(e)=> handleChange(e)}
          /><br></br>

          {error.summary && <p className={style.error}>{error.summary}</p>}
        </div>
        
        <div className={style.steps}>
          <span>The steps you must do?</span><br></br>
          <input
          
            value={info.steps}
            type="text"
            placeholder="steps"
            name="steps"
            onChange={(e)=> handleChange(e)}
          />
        </div>

        <div  className={style.healthScore} >
         
          <span>Health Points</span><br></br>
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
          <span>Image</span><br></br>
          <input
            
            value={info.image}
            type="text"
            placeholder="image"
            name="image"
            onChange={(e)=> handleChange(e)}
          />
        </div>
       <div  className={style.diets}>
         <span>What type of diet is it?</span><br></br>
       <select onChange={(e) => handleSelect(e)}>
          {diets.map((diet) => (
            <option value={diet.name}>{diet.name}s</option> 
            ))}
        </select >
        <div>
        <ul className={style.ul}>
            {info.diet?.map((e) => (
              <li className={style.li}>{e}</li>
            ))}
          </ul>
          </div>
       </div>
 
        
        <button type="submit">Create my recipe</button>
      </form>
    </div>
    </div>
  );
}

export default CreateRecipe;
