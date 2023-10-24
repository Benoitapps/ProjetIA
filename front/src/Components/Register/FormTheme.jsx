import React, { useState } from 'react';
import register from '../../hook/register';
import '@css/Register/RegisterForm.css';

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
    
      <form onSubmit={handleSubmit} className='main'>
        <p>S'inscrire</p>
        <label htmlFor="name">Name</label>
        <input
          className='inputForm'
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <input type="submit" value="S'inscrire" />
      </form>
    
  );
}

export default FormTheme;