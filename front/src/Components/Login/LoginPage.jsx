import { useState } from 'react';
import FormLogin from './FormLogin';
import fondRegister  from './../../ressources/fondreg.png'
import '../../css/Register/RegisterPage.css';


import { Link } from 'react-router-dom';

function LoginPage() {

    return (
        <>
        <div className='mainPage'>
            <img src={fondRegister} alt="Example" />
            <div>
                <FormLogin />
                <Link to="/register">S'inscrire</Link>
            </div>
            
        </div>
            
        </>
    )
}

export default LoginPage
