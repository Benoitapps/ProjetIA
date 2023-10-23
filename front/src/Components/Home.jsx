import { useState } from 'react';
import SearchBar from './Search/SearchBar';
import RecipesList from './Search/RecipesList';

function HomePage() {
    const [recipes, setRecipes] = useState([]);

    return (
        <>
            <SearchBar setRecipes={setRecipes}/>
            <RecipesList recipes={recipes}/>
        </>
    )
}

export default HomePage
