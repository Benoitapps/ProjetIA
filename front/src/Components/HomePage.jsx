import { useState } from 'react';
import SearchBar from './Search/SearchBar';
import RecipesList from './Search/RecipesList';
import { Link } from 'react-router-dom';

function HomePage() {
    const [recipes, setRecipes] = useState([]);

    return (
        <>
            <Link to="/recipe">Exemple de redirection</Link>
            <SearchBar setRecipes={setRecipes}/>
            <RecipesList recipes={recipes}/>
        </>
    )
}

export default HomePage
