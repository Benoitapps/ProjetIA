import React, { useState, useEffect } from 'react';
import searchRecipe from '../../hook/search';

function SearchBar({ setRecipes }) {
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = async () => {
        if (searchValue.trim() === "") {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            setRecipes([]);
            const recipes = await searchRecipe(searchValue);
            setRecipes(recipes);
        } catch (err) {
            setError("Une erreur s'est produite lors de la recherche.");
        }

        setIsLoading(false);
    }

    useEffect(() => {
        if (!isLoading) {
            setIsLoading(false);
        }
    }, [isLoading]);

    return (
        <>
            <input
                type="text"
                name="search"
                placeholder="Tapez votre recherche"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
            />
            <button onClick={handleClick} disabled={isLoading}>
                {isLoading ? "Recherche en cours..." : "Rechercher"}
            </button>
            {error && <p>{error}</p>}
        </>
    );
}

export default SearchBar;