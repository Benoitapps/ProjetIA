import './assets/css/App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import RegisterPage from './Components/Register/RegisterPage';
import LoginPage from './Components/Login/LoginPage';
import PreferencePage from './Components/FoodPreference/PreferencePage';
import NavBar from './Components/NavBar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NavBar />}>
            <Route index element={<Home />} />
            <Route path="recipe" element={<div>Page des recettes</div>} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="pref" element={<PreferencePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
