import { Link } from 'react-router-dom';
import FormTheme from './FormTheme';
import fondRegister  from '@img/fondreg.png';
import '@css/RegisterLogin/RegisterLoginPage.css'
import React from "react";
function RegisterPage() {

    return (
        <main className="register-login">
            <div className="register-login__img">
                <img src={fondRegister} alt="Illustration connexion/inscription"/>
            </div>
            <div className="register-login__container">
                <div className="register-login__container__logo">
                    <img src="../../opencook.svg" alt="Logo Opencook"/>
                    <h2>Open Cook</h2>
                </div>
                <FormTheme/>
                <p>Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></p>
            </div>
        </main>
    )
}

export default RegisterPage
