import React from 'react'
import {useState} from 'react'
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { getRecipeName } from '../redux/actions';
import style from './SearchBar.module.css';   

function SearchBar() {
  
  const dispatch = useDispatch();
  const [name,setName]=useState("")

  //const history=useHistory()
  function handleInputChange(e)
  {
    e.preventDefault();
    setName(e.target.value); //tomara todo lo que estamos escribiendo 
    console.log(name)  
  }

  function handleSubmit(e){
    e.preventDefault();
    console.log(e);
    dispatch(getRecipeName(name));
  }
    return (

    <div className={style.SearchBar}><input  onChange={e => handleInputChange(e)} type="text" placeholder="Search...."/>
    <button onClick={e => handleSubmit(e)} type="submit">Search</button>
    </div>
  )
}

export default SearchBar