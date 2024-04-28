import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const notify = () => toast.success('Login successfull', {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
     });;
     const loginFail = () => toast.error('Incorrect username or password', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });

  return (
    <>

    <div>Login</div>
    <button onClick={notify}>Login success!</button>
        <ToastContainer />
    <button onClick={loginFail}>Login fail!</button>
    <ToastContainer />

</>

  )
}

export default Login