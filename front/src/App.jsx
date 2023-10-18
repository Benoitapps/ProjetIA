import { useState } from 'react';
import './App.css';
import SearchBar from './Components/Search/SearchBar';
import RecipesList from './Components/Search/RecipesList';

function App() {
  const [recipes, setRecipes] = useState([]);

  return (
    <>
      <SearchBar setRecipes={setRecipes}/>
      <RecipesList recipes={recipes}/>
    </>
  )
}

export default App
