import React from 'react';
import { Outlet, Link } from "react-router-dom";
import '@css/NavBar.css';

function NavBar() {
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
                        <li>
                            <Link to="/recipe">Recette</Link>
                        </li>
                        <li>
                            <Link to="/login">Connexion</Link>
                        </li>
                        <li className="register">
                            <Link to="/register">Inscription</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <Outlet />
        </>
    );
}

export default NavBar;