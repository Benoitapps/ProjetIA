import React, { useState } from 'react';
import searchRecipe from '../hook/search';

function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const handleClick = () => {
        searchRecipe(searchValue);
    }

    return (
        <>
            <input type="text" name="search" placeholder='Tapez votre recherche' onChange={e => setSearchValue(e.target.value)}/>
            <button onClick={handleClick}>Rechercher</button>
        </>
    );
}

export default SearchBar;