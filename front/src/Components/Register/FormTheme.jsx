import React, { useState } from 'react';
import register from '../../hook/register';
import '@css/RegisterLogin/RegisterLoginForm.css';

function FormTheme() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const handleSubmit =  async (event) => {
    event.preventDefault();

    const data = {
      name,
      email,
      password,
    };


    if (name != "" && email != "" && password != "" ){
      try{
        console.log("ok");
        console.log(data);
        const sign = await register(data);
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
                      htmlFor="name"
                      className="register-login__form__container__field__label"
                  >
                      Name
                  </label>
                  <input
                      className="register-login__form__container__field__input"
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
              </div>
              <div className="register-login__form__container__field">
                  <label
                      htmlFor="email"
                      className="register-login__form__container__field__label"
                  >
                      Email
                  </label>
                  <input
                      className="register-login__form__container__field__input"
                      id="email"
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="register-login__form__container__field">
              <label
                  htmlFor="password"
                  className="register-login__form__container__field__label"
              >
                  Mot de passe
              </label>
                  <input
                      className="register-login__form__container__field__input"
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
          </div>
          <input type="submit" value="S'inscrire" className="register-login__form__submit"/>
      </form>

);
}

export default FormTheme;