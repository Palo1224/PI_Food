import React from "react";
import { Link, useLocation } from "react-router-dom";

import style from "./NavBar.module.css";
function NavBar() {
  const { pathname } = useLocation();

  return (
    <div className={style.container}>
      <nav className={style.nav}>
        <ul className={style.Link}>
          <li  className={style.link}>
            
            <Link  to="/recipes/">Home </Link>
          </li>
          <li className={style.link}>
            <Link to="/recipe">Crear receta</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
