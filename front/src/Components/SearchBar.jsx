import React, { useState } from 'react';

function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const handleClick = () => {
        console.log(searchValue);
    }

    return (
        <>
            <input type="text" name="search" placeholder='Tapez votre recherche' onChange={e => setSearchValue(e.target.value)}/>
            <button onClick={handleClick}>Rechercher</button>
        </>
    );
}

export default SearchBar;