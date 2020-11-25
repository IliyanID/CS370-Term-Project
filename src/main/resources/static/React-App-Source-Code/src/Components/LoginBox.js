import React, { useContext, } from 'react';
import AuthContext from '../Context/authContext';

import './LogInBox.css';
const formSubmit = (event) =>{
  event.preventDefault();
}

const LoginBox = (props) =>{
    const authContext = useContext(AuthContext);

    return(
      <div className="login-box">
        <h1>Inventory</h1>

        <form onSubmit={formSubmit}>
            <div className="login-cred">
                <input  onChange={(e) =>{authContext.updateCred(e.target.value,"username")}} type="text" placeholder="Username"/>
                <input  onChange={(e) =>{authContext.updateCred(e.target.value,"password")}} type="password" placeholder="Password"/>
            </div>
            <div>
                <input onClick={authContext.authenticateUser} type="submit" className="login-button" value="LogIn"/>
            </div>
        </form>

    
        <div className = "sign-up">
          <p>Don't Have an account? <a href="../../public/index.html">Sign Up</a></p>
          <p>Forgot Password? <a href="../../public/index.html">Reset Password</a></p>
        </div>

      </div>
    );
}

export default LoginBox;