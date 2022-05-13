import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  getRecipes,
  filterRecipes,
  filterRecipesByName,
  filterScore,
  clearPage,
} from "../../redux/actions/index";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import NavBar from "../NavBar/NavBar";
import FilterBar from "../FilterBar/FilterBar";
import style from "../Home/Home.module.css";

export default function Home() {
  const dispatch = useDispatch(); //se usa para enviar acciones, esto es solo uso, el efecto es el mismo que conncet.
  const Recipes = useSelector((state) => state.recipes); //se usa para obtener datos de estado, pero es más conveniente y conciso.
  const [order, setOrder] = useState();
  
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage, setRecipesPerPage] = useState(9);
  const indexOfLastRecipe = currentPage * recipesPerPage;  //9
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;// 9 - 9  0
  const currentRecipes = Recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const cambiarIndex = (index) => {
    if (index === currentPage) return true;
    else return false;

  };
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
    
  };
  useEffect(() => {
    dispatch(getRecipes());
    return () => {
      dispatch(clearPage());
    };
    // setOrder()
  }, [dispatch]);
  
  return (
    <div className={style.containerHome}>
      <NavBar />
      <FilterBar paginado={paginado} />

      <SearchBar  paginado={paginado} 
     />
      <Paginado
      currentPage={currentPage}
        recipesPerPage={recipesPerPage}
        Recipes={Recipes.length}
        paginado={paginado}
        cambiarIndex={cambiarIndex}
        indexOfLastRecipe={indexOfLastRecipe}
        />
      <div className={style.cards}>
        {currentRecipes.length>0 ? currentRecipes?.map((e) => {
          return (
            <div className={style.Recipes} key={e.id}> 
           
              <Link className={style.link} to={`/recipes/${e.id}`}>
                <Card
                  key={e.id}
                  id={e.id}
                  name={e.name}
                  image={e.image}
                  steps={e.steps}
                  diets={e.diets}
                  score={e.healthScore}
                ></Card>
              </Link>
            </div>
          );
        }) : 
        <div> 
        
           
        <p>Loading.....</p>
       
    </div>
    }
       
        
      </div>
      </div>
  );
}
