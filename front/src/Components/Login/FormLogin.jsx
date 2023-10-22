import React, { useState } from 'react';
import login from '../../hook/login';
import '../../css/Register/RegisterForm.css';



function FormTheme() {

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
        const loginn = await login(data);
      }catch(err){
        console.log(err);
      }
  }else{
    console.log("missing argument");
  }

  }

  return (
    
      <form onSubmit={handleSubmit} className='main'>
        <p>Se connecter</p>
        <label htmlFor="email">Email</label>
        <input
          className='inputForm'
          id="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          className='inputForm'
          id="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="Se Conecter" />
      </form>
    
  );
}

export default FormTheme;