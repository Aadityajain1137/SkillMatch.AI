import React, { useState } from 'react'
import { useNavigate,Link } from 'react-router'
import { useAuth } from '../hooks/useAuth';
import RegisterLoadingScreen from './Registerloadingscreen';
const Register = () => {

    const navigate = useNavigate();
    const [email,setEmail] = useState("");
    const [password , setPassword] = useState("");
    const [username , setUsername] = useState("");

    const {loading , handleRegister} = useAuth();
      const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        await handleRegister({username, email, password})
        navigate('/');
    } catch(err) {
        console.log(err)
        alert("Registration failed")
    }
}
    if(loading){
        return <RegisterLoadingScreen />
    }
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id='username' name='username'placeholder='Enter username' onChange={(e)=>{setUsername(e.target.value)}}/>
            </div>

             <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email'placeholder='Enter email' onChange={(e)=>{setEmail(e.target.value)}}/>
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password'placeholder='Enter password' onChange={(e)=>{setPassword(e.target.value)}}/>
            </div>
                <button className='button primary-button'>Register</button>

            </form>
            <p>Already have an Account? <Link to={"/login"}>Login</Link> </p>
        </div>
    </main>
  )
}

export default Register
