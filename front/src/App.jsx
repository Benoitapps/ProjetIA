import './assets/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import RegisterPage from './Components/Register/RegisterPage';
import LoginPage from './Components/Login/LoginPage';
import PreferencePage from './Components/FoodPreference/PreferencePage';
import RecipePageDetails from './Components/Recipes/RecipePageDetails.jsx';
import FavorisPage from './Components/Favoris/FavorisPage.jsx';
import NavBar from './Components/NavBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="recipe/:recipeId" element={<RecipePageDetails/>} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="favoris" element={<FavorisPage />} />

            <Route path="pref" element={<PreferencePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
