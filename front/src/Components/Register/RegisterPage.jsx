import { useState } from 'react';
import  RegisterCard  from './RegisterCard';
import FormTheme from './FormTheme';
import fondRegister  from './../../ressources/fondreg.png'
import '../../css/Register/RegisterPage.css';


import { Link } from 'react-router-dom';

function RegisterPage() {

    return (
        <>
        <div className='mainPage'>
            <img src={fondRegister} alt="Example" />
            <div>
                <FormTheme />
                <Link to="/login">Se connecter</Link>
            </div>
            
        </div>
            
        </>
    )
}

export default RegisterPage
