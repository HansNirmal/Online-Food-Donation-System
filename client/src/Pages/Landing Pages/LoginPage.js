import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const notify = () => toast("Register successfully!");
  const badnotify = () => toast("Register Failed!");
  const handleSubmit = async (event) => {
    event.preventDefault();

    let data = {
      email: email,
      password: password,
    }
    axios.post("http://localhost:4000/api/users/login", data).then((res) => {
      setMessage('Login successful!');
      localStorage.setItem("user", JSON.stringify(res.data))
      localStorage.setItem("auth", res.data.role)
      window.location.href ='/'

      setEmail('');
      setPassword('');
      notify()
    }).catch((err) => {

      axios.post("http://localhost:4000/admins/approves/login", data).then((res) => {
        setMessage('Login successful!');
        localStorage.setItem("user", JSON.stringify(res.data))
        localStorage.setItem("auth", res.data.role)
        window.location.href ='/'
        setEmail('');
        setPassword('');
        notify()
      }).catch((err) => {
        setMessage('Invalid email or password');
        badnotify()
      })
     
    })

    // Perform login logic here (e.g., API call, authentication)


    // Reset the form

  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  return (

    <div>
      <ToastContainer />

      <h2 id="page-title">Login</h2>
      <div className="homepage home-margin">


        <form onSubmit={handleSubmit}>

          <label htmlFor="email">Email Address</label>
          <input type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            required />

          <label htmlFor="password">Password</label>
          <input type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            required />



          <button type="submit">Login</button>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>

  )


}

export default Login;