import React, { useState } from 'react';
import login from '../../hook/login';
import '@css/RegisterLogin/RegisterLoginForm.css';
import { useNavigate } from "react-router-dom";

function FormTheme({setIsLogged}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const data = {
      email,
      password,
    };


    if ( email != "" && password != "" ){
      try{
        console.log("ok");
        console.log(data);
        const result = await login(data);
        console.log(result);
        if (result.token){
          localStorage.setItem("token", result.token);
          setIsLogged(true);
          navigate("/");
        }
      }catch(err){
        console.log(err);
      }
  }else{
    console.log("missing argument");
  }

  }

  return (
      <form onSubmit={handleSubmit} className="register-login__form">
        <div className="register-login__form__container">
            <div className="register-login__form__container__field">
                <label
                    htmlFor="email"
                    className="register-login__form__container__field__label"
                >
                    Email
                </label>
                <input
                    className="register-login__form__container__field__input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label
                    htmlFor="password"
                    className="register-login__form__container__field__label"
                >
                    Mot de passe
                </label>
                <input
                    className="register-login__form__container__field__input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
        </div>
        <input type="submit" value="Se connecter" className="register-login__form__submit"/>
      </form>

  );
}

export default FormTheme;