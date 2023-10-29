import { useState } from 'react';
import SearchBar from './Search/SearchBar';
import RecipesList from './Search/RecipesList';
import '@css/Home.css';

function HomePage() {
    const [recipes, setRecipes] = useState([]);

    return (
        <>
            <div className="hero">
                <SearchBar setRecipes={setRecipes}/>
            </div>
            <RecipesList recipes={recipes}/>
        </>
    )
}

export default HomePage
