import React from 'react';
import { Outlet, Link } from "react-router-dom";

function NavBar() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/recipe">Recette</Link>
                    </li>
                    <li>
                        <Link to="/register">S'inscrire</Link>
                    </li>
                    <li>
                        <Link to="/login">Se connecter</Link>
                    </li>
                </ul>
            </nav>

            <Outlet />
        </>
    );
}

export default NavBar;