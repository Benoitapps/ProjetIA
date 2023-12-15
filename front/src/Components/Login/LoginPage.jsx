import FormLogin from './FormLogin';
import fondRegister  from '@img/fondreg.png';
import '@css/RegisterLogin/RegisterLoginPage.css';
import { Link } from 'react-router-dom';
import React from "react";

function LoginPage() {
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
                <FormLogin/>
                <p>Vous n’avez pas de compte ? <Link to="/register">Inscrivez-vous</Link></p>
            </div>
        </main>
    )
}

export default LoginPage
