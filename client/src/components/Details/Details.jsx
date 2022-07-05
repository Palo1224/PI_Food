import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsId, clearPage } from "../../redux/actions";
import style from "../Details/Details.module.css";
import { RiHeartPulseFill } from "react-icons/ri";
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
    <div>
                <NavBar/>

        {
          
          <div className={style.detail}>
         
         <div key={recipe.id} className={style.details}>
           <div className={style.puntos}>
           <h1>{recipe.name}</h1>
           <img src={recipe.image} alt="" width="200px" height="200px" />
              <p>

                <RiHeartPulseFill /> Health Score: {recipe.healthScore}
              </p>
              <p className={style.datos}>Types of Diets:</p>
           </div>
              <ul className={style.ul}>
                {recipe.diets?.map((e) => (
                  <li key={e.id} className={style.li}>
                    {e}
                  </li>
                ))}
              </ul>
            <div>
              <p className={style.datos}> <strong>The steps to make this recipe:</strong></p>
              <p>{recipe.steps === "" ? "Not steps" : recipe.steps}</p>
            </div>
            <div>
              <p className={style.datos}><strong>Summary of {recipe.name}</strong></p>

              <p dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
            </div>
            </div>
          </div>
        }
      </div>
  );
}

export default Details;
