import './assets/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import RegisterPage from './Components/Register/RegisterPage';
import LoginPage from './Components/Login/LoginPage';
import PreferencePage from './Components/FoodPreference/PreferencePage';
import SearchConfigPage from './Components/SearchConfig/SearchConfigPage';
import RecipePageDetails from './Components/Recipes/RecipePageDetails.jsx';
import FavorisPage from './Components/Favoris/FavorisPage.jsx';
import NavBar from './Components/NavBar';
import { useEffect, useState } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(false);

  const isUserLogged = () => {
    return localStorage.getItem("token") != null;
  }
  
  useEffect(() => {
    setIsLogged(isUserLogged());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar isLogged={isLogged}/>}>
            <Route index element={<Home />} />
            <Route path="recipe/:recipeId" element={<RecipePageDetails isLogged={isLogged}/>} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage setIsLogged={setIsLogged}/>} />
            <Route path="favoris" element={<FavorisPage />} />

            <Route path="pref" element={<PreferencePage />} />
            <Route path="search-config" element={<SearchConfigPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
