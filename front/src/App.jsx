import './assets/css/App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from './Components/HomePage';
import RegisterPage from './Components/Register/RegisterPage';
import LoginPage from './Components/Login/LoginPage';
import PreferencePage from './Components/FoodPreference/PreferencePage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/recipe",
    element: <div>Page des recettes</div>,
  },
  {
    path: "/register",
    element: <RegisterPage/>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/pref",
    element: <PreferencePage/>,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
