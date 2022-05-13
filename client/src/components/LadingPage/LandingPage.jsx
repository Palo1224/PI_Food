import React from 'react';
import {Link} from 'react-router-dom'
import style from '../LadingPage/LandingPage.module.css';

export default function LandingPage(){
	return(
		<div className={style.landing}>
			<h1>Henry Food</h1>
			<Link to ='/recipes/'>
				<button className={style.btn}>Ingresar</button>
			</Link>
		</div>
	)
}