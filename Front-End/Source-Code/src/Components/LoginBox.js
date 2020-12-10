import React, { useContext,Fragment } from 'react';
import AuthContext from '../Context/authContext';

import './LogInBox.css';
const formSubmit = (event) =>{
  event.preventDefault();
}

const LoginBox = (props) =>{
    const authContext = useContext(AuthContext);
   // console.log(authContext.getCreateUser.checked);
    let content=(
      <Fragment>
      <form onSubmit={formSubmit}>
            <div className="login-cred">
                <input  onChange={(e) =>{authContext.updateCred(e.target.value,"username")}} value={authContext.creds[0]} type="text" placeholder="Username"/>
                <input  onChange={(e) =>{authContext.updateCred(e.target.value,"password")}}  value={authContext.creds[1]} type="password" placeholder="Password"/>
            </div>
            <div>
                <input onClick={authContext.authenticateUser} type="submit" className="login-button" value="LogIn"/>
            </div>
        </form>

    
        <div className = "sign-up">
          <p>Don't Have an account? <a href="" onClick={(e) =>{e.preventDefault(); authContext.setCreateChecked(true,"","")}}>Sign Up</a></p>
          <p>Forgot Password? <a href="" onClick={(e) =>{e.preventDefault(); authContext.setUpdateChecked(true,"","")}}>Reset Password</a></p>
        </div>
        </Fragment>
    );
    if (authContext.getCreateUser.checked === true){
      content=(
        <Fragment>
        <form onSubmit={formSubmit}>
              <div className="login-cred">
                  <input  onChange={(e) =>{authContext.setCreateChecked(true,e.target.value,authContext.getCreateUser.pass)}} type="text" value={authContext.getCreateUser.user} placeholder="Username"/>
                  <input  onChange={(e) =>{authContext.setCreateChecked(true,authContext.getCreateUser.user,e.target.value)}} type="password" value={authContext.getCreateUser.pass} placeholder="New Password"/>
              </div>
              <div>
                  <input onClick={authContext.createUser} type="submit" className="login-button" value="Sign Up"/>
              </div>
          </form>
  
      
          <div className = "sign-up">
            <p>Want to login? <a href=""  onClick={(e) =>{e.preventDefault(); authContext.setCreateChecked(false,"",""); authContext.setUpdateChecked(false,"","")}}>Login</a></p>
            <p>Forgot Password? <a href="" onClick={(e) =>{e.preventDefault(); authContext.setCreateChecked(false,"",""); authContext.setUpdateChecked(true,"","")}}>Reset Password</a></p>
          </div>
          </Fragment>);
    }

    if (authContext.resetPasswordChecked.checked === true){
      content=(
        <Fragment>
        <form onSubmit={formSubmit}>
              <div className="login-cred">
                  <input  onChange={(e) =>{authContext.setUpdateChecked(true,e.target.value,authContext.resetPasswordChecked.pass)}} type="text" value={authContext.resetPasswordChecked.user} placeholder="Username"/>
                  <input  onChange={(e) =>{authContext.setUpdateChecked(true,authContext.resetPasswordChecked.user,e.target.value)}} type="password" value={authContext.resetPasswordChecked.pass} placeholder="New Password"/>
              </div>
              <div>
                  <input onClick={authContext.updateUser} type="submit" className="login-button" value="Reset Password"/>
              </div>
          </form>
  
      
          <div className = "sign-up">
            <p>Want to login? <a href=""  onClick={(e) =>{e.preventDefault(); authContext.setCreateChecked(false,"",""); authContext.setUpdateChecked(false,"","")}}>Login</a></p>
            <p>Don't Have an account? <a href="" onClick={(e) =>{e.preventDefault(); authContext.setCreateChecked(true,"",""); authContext.setUpdateChecked(false,"","")}}>Sign Up</a></p>
          </div>
          </Fragment>);
    }

    return(
      <div className="login-box">
        <h1>Inventory</h1>

        {content}

      </div>
    );
}

export default LoginBox;