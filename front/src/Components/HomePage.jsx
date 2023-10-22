import { useState } from 'react';
import SearchBar from './Search/SearchBar';
import RecipesList from './Search/RecipesList';
import { Link } from 'react-router-dom';

function HomePage() {
    const [recipes, setRecipes] = useState([]);

    return (
        <>
            <Link to="/recipe">Exemple de redirection</Link>
            <Link to="/register">Exemple de register</Link>
            <Link to="/login">Exemple de login</Link>
            <SearchBar setRecipes={setRecipes}/>
            <RecipesList recipes={recipes}/>
        </>
    )
}

export default HomePage
