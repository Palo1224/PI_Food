import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterRecipes,
  filterRecipesByName,
  filterScore,
} from "../redux/actions/index";
import style from "./FilterBar.module.css"
export default function FilterBar({ paginado }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState();
  const recipes = useSelector((state) => state.recipes);

  function handleFilteredRecipes(e) {
    e.preventDefault();
    dispatch(filterRecipes(e.target.value));
    paginado(1)
  }
  function handleSort(e) {
    e.preventDefault();
    dispatch(filterRecipesByName(e.target.value));
    paginado(1)
    setOrder();
  }
  function handleSortScore(e) {
    e.preventDefault();
    dispatch(filterScore(e.target.value));
    paginado(1)
    setOrder();
  }
  return (
    <div className={style.ContainerFil} >
      <div >
        <select onChange={(e) => handleSort(e)} defaultValue="default">
          <option value="default" disabled>
            Alphabetical order
          </option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => handleSortScore(e)} defaultValue="default">
          <option value="default" disabled>
            Ordenar por Puntuacion
          </option>
          <option value="desc">Menor</option>
          <option value="asc">Mayor</option>
        </select>
      </div>
      <select onChange={(e) => handleFilteredRecipes(e)}>
        <option value="default" disabled>
          Select by Diets
        </option>
        <option value="All">Todos</option>
        <option value="dairy free">Dairy Free</option>
        <option value="gluten free">Gluten Free</option>
        <option value="ketogenic">Ketogenic</option>
        <option value="vegetarian">Vegetarian</option>
        <option value="lacto vegetarian">Lacto-Vegetarian</option>
        <option value="lacto ovo vegetarian">Ovo-Vegetarian</option>
        <option value="vegan">Vegan</option>
        <option value="pescatarian">Pescetarian</option>
        <option value="paleolithic">Paleo</option>
        <option value="primal">Primal</option>
        <option value="fodmap friendly">Low FODMAP</option>
        <option value="whole 30">Whole30</option>
      </select>
    </div>
  );
}
