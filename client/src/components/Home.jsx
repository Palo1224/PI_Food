import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  filterRecipes,
  filterRecipesByName,
  filterScore,
  clearPage,
} from "../redux/actions/index";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import FilterBar from "./FilterBar";
import style from "./Home.module.css"

export default function Home() {
  const dispatch = useDispatch(); //se usa para enviar acciones, esto es solo uso, el efecto es el mismo que conncet.
  const Recipes = useSelector((state) => state.recipes); //se usa para obtener datos de estado, pero es más conveniente y conciso.
  const [order, setOrder] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = Recipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );
  const cambiarIndex = (index) => { //dar estilo css
    if(index===currentPage) return true
    else return false
}
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getRecipes());

  }, [dispatch]);


  
  return (
    <div className={style.containerHome}>
      <NavBar/>
      <FilterBar paginado={paginado} />
      
      <SearchBar/>
      <Paginado
        recipesPerPage={recipesPerPage}
        Recipes={Recipes.length}
        paginado={paginado}
        cambiarIndex={cambiarIndex}
        />
          <div className={style.cards}>
      {currentRecipes?.map((e) => {
        return (
          <div className={style.Recipes}  key={e.id} >

  
  <Link className={style.link}to={`/recipes/${e.id}`}>

              <Card 
                id={e.id}
                name={e.name}
                image={e.image}
                diets={e.diets}
                score={e.spoonacularScore}
                
                ></Card>
             
                </Link>
          </div>
        );
      })}
      </div>
    </div>
  );
}
