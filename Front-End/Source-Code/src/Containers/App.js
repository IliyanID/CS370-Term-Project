import React, { PureComponent, Fragment } from 'react';
import AuthContext from '../Context/authContext';
import UserContext from '../Context/userContext'

import LoginBox from '../Components/LoginBox';
import LoggedIn from './LoggedIn';

import './App.css'
const debug = false;

class App extends PureComponent{

  state = {
    userCredentials:["",""],
    tabs: [
      {name: "All Inventory", classes: "itemTab selectedItem"},
      {name: "Search", classes: "itemTab"},
      {name: "Item", classes: "itemTab"}
    ],
    UserToken:{authenticated:false,userToken:""},
    currentSearch:[""],
    inventory:[{}],
    createUserChecked:{checked: false,user:"",pass:""},
    resetPasswordChecked:{checked: false,user:"",pass:""},
    user:""
  }

 

  deleteUser = () =>{
    const Http = new XMLHttpRequest();
    let url;
    if(debug === true)
        url = "http://10.0.0.108:80/username/"+ this.state.UserToken.userToken;
    else
        url = window.location.href + "username/" + this.state.UserToken.userToken;


    Http.open("DELETE",url);
   
  
    Http.send();
    
    Http.onreadystatechange = (e) => {
        let result = JSON.parse(Http.response)
        console.log(result)
        if(result.success === true){
          //alert(result.UserDeleted + " Deleted");
          this.setState({UserToken:{authenticated:false,userToken:""}});
        }
        else
          alert("User Was Not Deleted");
        
    }
  }
  createUser = () =>{
    const Http = new XMLHttpRequest();
    let url;
    if(debug === true)
        url = "http://10.0.0.108:80/username"
    else
        url = window.location.href + "username"


    Http.open("POST",url);
    let data = {username:this.state.createUserChecked.user,password:this.state.createUserChecked.pass};
   // console.log(JSON.stringify(data));
    Http.send(JSON.stringify(data));
    
    Http.onreadystatechange = (e) => {
        let result = JSON.parse(Http.response)
        console.log(result)
        if(result.success === true){
          //alert("User Created");
          this.setState({createUserChecked:{checked:false,user:"",pass:""}});
        }
        else
          alert("User Was Not Created");
        
    }
  }

  changeUser = () =>{
    const Http = new XMLHttpRequest();
    let url;
    if(debug === true)
        url = "http://10.0.0.108:80/username" 
    else
        url = window.location.href + "username" 
    //console.log(this.state.user);

    Http.open("PUT",url);
    let data = {username:this.state.resetPasswordChecked.user,password:this.state.resetPasswordChecked.pass};
   console.log("Change User JSON\n" + JSON.stringify(data));
    Http.send(JSON.stringify(data));
    
    Http.onreadystatechange = (e) => {
      let result = JSON.parse(Http.response);
      console.log(result);
      if(result.success === true){
        //alert("User Password Changed");
        this.setState({resetPasswordChecked:{checked:false,user:"",pass:""}});
    }
    else
      alert("User Password Not Changed");
  }
}

  authenticateUser = (logout) =>{
    let url = document.URL + "user";
    if(debug){
      url = "http://10.0.0.108:80/user"
      console.log("Entered authenticateUser");
    }
   // console.log(url);

      const Http = new XMLHttpRequest();
      Http.open("POST", url);
      //Http.setRequestHeader("Content-Type", "application/json");
      //console.log(Http.request)
      let cred = {username:this.state.userCredentials[0],password:this.state.userCredentials[1]};
      
      
      Http.onreadystatechange = (e) => {
        let result = JSON.parse(Http.response);
        console.log(result);
        if(result.authenticated === true || logout === true || debug === true){
          this.setState({UserToken:JSON.parse(Http.response),
          userCredentials:["",""],
          tabs: [
            {name: "All Inventory", classes: "itemTab selectedItem"},
            {name: "Search", classes: "itemTab"},
            {name: "Item", classes: "itemTab"}
            ],
            currentSearch:[""]});
       // console.log(JSON.parse(Http.response));
        }
      }
    Http.send(JSON.stringify(cred));
    

  }


  
 

  updateCred = (value,credSelector) =>{
      const index = (credSelector === "username") ? 0 : 1;
      var tempUserCredentials = [this.state.userCredentials[0],this.state.userCredentials[1]];
      tempUserCredentials[index] = value;
      this.setState({userCredentials:tempUserCredentials});

      if(debug)
        console.log("CredSelector: " + credSelector + " Value: " + value);   
  

    
  }

  updateSelectedTab = (index) =>{
    let tabs = [
      {name: "All Inventory", classes: "itemTab"},
      {name: "Search", classes: "itemTab"},
      {name: "Item", classes: "itemTab"}
    ];
    let selectedTab = {...tabs[index]};
    selectedTab.classes += (" selectedItem");
    
    tabs[index] = selectedTab;

    this.setState({tabs:tabs});
  }

  updateSearch = (event) =>{
    this.setState({currentSearch:event.target.value.toLowerCase().split(" ")});
    if(debug)
      console.log("Current Search: " + this.state.currentSearch);
  }

  createUserUpdate = (checked,user,pass) =>{
    this.setState({resetPasswordChecked:{checked:checked,user:user ,pass:pass}}); 
    this.setState({user:user});
  }

  render(){
  
    let item = null
    if(this.state.UserToken.authenticated)
      item = (
        <UserContext.Provider value = {
          {logout : this.authenticateUser,
          itemTab : this.updateSelectedTab,
          updateSearch : this.updateSearch,
          tabs : this.state.tabs,
          currentSearch : this.state.currentSearch,
          UserToken: this.state.UserToken,
          inventory:this.state.inventory,
          deleteUser:this.deleteUser}}>
              
            <LoggedIn/>

        </UserContext.Provider>);
    
    else     
      item = (
        <AuthContext.Provider value = {
          {authenticated : this.state.UserToken.authenticated,
          creds:this.state.userCredentials,
          updateCred : this.updateCred,
          authenticateUser : this.authenticateUser,
          createUserChecked: this.state.createUserChecked,
          resetPasswordChecked: this.state.resetPasswordChecked,
          updateUser : this.changeUser,
          setUpdateChecked:this.createUserUpdate,
          getUpdatUser:this.state.resetPasswordChecked,
          createUser: this.createUser,
          getCreateUser:this.state.createUserChecked,
          setCreateChecked:(checked, user, pass) =>{ this.setState({createUserChecked:{checked:checked,user:user,pass:pass}});}
          }}>
            
            <LoginBox/> 

        </AuthContext.Provider>);

    return(
      <Fragment>
        {item}
      </Fragment>
    );

  }
}
export default App;