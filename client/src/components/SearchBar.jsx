import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeName } from "../redux/actions";
import style from "./SearchBar.module.css";

function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  //const history=useHistory()
  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value); //tomara todo lo que estamos escribiendo
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getRecipeName(name));
  }
  return (
    <div className={style.containerS}>
      <div className={style.SearchBar}>
        <input
          className={style.searchTerm}
          onChange={(e) => handleInputChange(e)}
          type="text"
          placeholder="Buscar...."
        />
        <button
          className={style.BtnSearch}
          onClick={(e) => handleSubmit(e)}
          type="submit"
        >
        
         Buscar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
