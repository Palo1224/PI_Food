
import React from 'react'
import style from './Paginado.module.css'
function Paginado({recipesPerPage,Recipes,paginado}) {
  const pageNumbers = []

  for(let i = 1; i <=Math.ceil(Recipes/recipesPerPage); i++) {pageNumbers.push(i);}
    

  return (
     <div className={style.paginado}>
          <div className={style.table}>
                 {
            pageNumbers && 
            pageNumbers.map(number => (
                <span className={style.number} key={number}>
                <a onClick={()=> {paginado(number)}} >{number}
                     </a>
                </span>
            ))}
          </div> 
    </div>
     
  )
}

export default Paginado