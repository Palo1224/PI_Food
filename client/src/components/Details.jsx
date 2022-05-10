import React, {useEffect} from 'react'
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {getDetailsId,clearPage} from "../redux/actions"


function Details(props) {
    console.log(props)
    console.log(props.match.params.id)
    const dispatch= useDispatch();
    useEffect(()=>{
        dispatch(getDetailsId(props.match.params.id));
        return ()=>{
            dispatch(clearPage())
        }
    },[dispatch,props.match.params.id])

    const recipe=useSelector((state)=> state.details)
    console.log(recipe)
    return (
    <div>
        {
        <div >
     
            <Link to="/recipes/"><button>Home</button></Link>
            <h1>{recipe.name}</h1> 
            <img src={recipe.image}></img>
            <span>Summary</span>
            <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
            <ul >{recipe.diets}</ul>

            <span>Health Score: {recipe.healthScore}</span>
            <p>Score: {recipe.spoonacularScore}</p>
            <p>Steps: {recipe.steps}</p>
     

        </div>
        }
    </div>
  )
}

export default Details