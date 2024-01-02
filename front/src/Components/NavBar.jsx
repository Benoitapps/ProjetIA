import React from 'react';
import { Outlet, Link } from "react-router-dom";
import '@css/NavBar.css';
import Chatbot from './Chatbot.jsx';

function NavBar({isLogged}) {
    return (
        <>
            <header>
                <nav>
                    <div className="logo">
                        <Link to="/">
                            <img src="../../opencook.svg" alt="Logo Opencook"/>
                            <h1>Open Cook</h1>
                        </Link>
                    </div>
                    <ul>
                        {
                            isLogged ? (
                                <>
                                    <li>
                                        <Link to="/favoris">Mon compte</Link>
                                    </li>
                                    <li>
                                        <Link onClick={() => {
                                            localStorage.removeItem("token");
                                            window.location.reload();
                                            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                                        }} to="/">Déconnexion</Link>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li>
                                        <Link to="/login">Connexion</Link>
                                    </li>
                                    <li className="register">
                                        <Link to="/register">Inscription</Link>
                                    </li>
                                </>
                            )
                        }
                        
                    </ul>
                </nav>
            </header>

            <Outlet />

            <Chatbot />
        </>
    );
}

export default NavBar;