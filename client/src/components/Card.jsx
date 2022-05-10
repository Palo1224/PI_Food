import React from "react";
import style from "./Card.module.css";

export default function Card({ name, image, diets, id, score }) {
  return (
    <div className={style.recipe} key={id}>
      <img src={image} alt="img not found" width="200px" height="200px" />
      <h2 className={style.name}>{name}</h2>

      <ul className={style.ul}>
        {diets.map((e) => (
          <li className={style.li}>{e}</li>
        ))}
      </ul>
      <p>score: {score}</p>
    </div>
  );
}
