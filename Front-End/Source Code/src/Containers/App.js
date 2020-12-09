import React, { PureComponent, Fragment } from 'react';
import AuthContext from '../Context/authContext';
import UserContext from '../Context/userContext'

import LoginBox from '../Components/LoginBox';
import LoggedIn from './LoggedIn';

import './App.css'
const debug = true;

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
    inventory:[{}]
  }

  authenticateUser = (logout) =>{
    let url = document.URL + "/authenticateUser";
    if(debug){
      url = "http://10.0.0.108:80/user"
      console.log("Entered authenticateUser");
    }
    console.log(url);

      const Http = new XMLHttpRequest();
      Http.open("POST", url);
      //Http.setRequestHeader("Content-Type", "application/json");
      //console.log(Http.request)
      let cred = {username:this.state.userCredentials[0],password:this.state.userCredentials[1]};
      
      
      Http.onreadystatechange = (e) => {
        let result = Http.response;
        if(result.authenticated === 'true' || logout === true || debug === true){
          this.setState({UserToken:JSON.parse(Http.response),
          userCredentials:["",""],
          tabs: [
            {name: "All Inventory", classes: "itemTab selectedItem"},
            {name: "Search", classes: "itemTab"},
            {name: "Item", classes: "itemTab"}
            ],
            currentSearch:[""]});
        console.log(JSON.parse(Http.response));
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
          inventory:this.state.inventory}}>
              
            <LoggedIn/>

        </UserContext.Provider>);
    
    else     
      item = (
        <AuthContext.Provider value = {
          {authenticated : this.state.UserToken.authenticated,
          updateCred : this.updateCred,
          authenticateUser : this.authenticateUser}}>
            
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