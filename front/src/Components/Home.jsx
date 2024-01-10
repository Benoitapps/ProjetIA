import { useState } from 'react';
import SearchBar from './Search/SearchBar';
import RecipesList from './Search/RecipesList';
import '@css/Home.css';

function HomePage() {
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
            <div className="hero">
                <SearchBar setRecipes={setRecipes} setIsLoading={setIsLoading} isLoading={isLoading}/>
            </div>
            <RecipesList recipes={recipes} isLoading={isLoading}/>
        </>
    )
}

export default HomePage
