import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsId, clearPage } from "../../redux/actions";
import style from "../Details/Details.module.css";
import NavBar from "../NavBar/NavBar";
function Details(props) {
  const recipe = useSelector((state) => state.details);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailsId(props.match.params.id));
    return () => {
      dispatch(clearPage());
    };
  }, [dispatch, props.match.params.id]);

  return (
    <div key={recipe.id} className={style.details}>
      {
        <div className={style.detail} >
          <NavBar></NavBar>
          
          <h1>{recipe.name}</h1>
          <img src={recipe.image} alt="" width="200px" height="200px" />

          <div className={style.puntos}>
            <p>Health Score: {recipe.healthScore}</p>
          </div>
          <p className={style.datos}>Tipos de dietas:</p>
          <ul  className={style.ul}>
            {recipe.diets?.map((e) => (
              <li key={e.id} className={style.li}>{e}</li>
            ))}
          </ul>
          <p className={style.datos}>Resumen de {recipe.name}</p>

          <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>

          <p className={style.datos}>Los pasos para hacer esta receta:</p>
          <p>{recipe.steps === "" ? "No hay pasos" : recipe.steps}</p>
        </div>
      }
    </div>
  );
}

export default Details;
