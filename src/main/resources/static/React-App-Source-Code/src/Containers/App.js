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
    authenticated: false,
    currentSearch:[""]
  }

  authenticateUser = (logout) =>{
    if(debug)
      console.log("Entered authenticateUser");

    var xhr = new XMLHttpRequest()
    let requestURL = (window.location.href +'/user?userName='+ this.state.userCredentials[0] + '&passWord=' + this.state.userCredentials[1]);

    xhr.addEventListener('load', () => {
        if(xhr.responseText === 'true' || logout === true || debug === true)
          this.setState({authenticated:!this.state.authenticated,
          userCredentials:["",""],
          tabs: [
            {name: "All Inventory", classes: "itemTab selectedItem"},
            {name: "Search", classes: "itemTab"},
            {name: "Item", classes: "itemTab"}
          ],
        currentSearch:[""]});

        if(debug)
          console.log("Request URL: " + requestURL + "\nRequest Responese: " + xhr.responseText);
    })
    
    xhr.open('GET', requestURL);
    xhr.send()
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
    if(this.state.authenticated)
      item = (
        <UserContext.Provider value = {
          {logout : this.authenticateUser,
          itemTab : this.updateSelectedTab,
          updateSearch : this.updateSearch,
          tabs : this.state.tabs,
          currentSearch : this.state.currentSearch}}>
              
            <LoggedIn/>

        </UserContext.Provider>);
    
    else     
      item = (
        <AuthContext.Provider value = {
          {authenticated : this.state.authenticated,
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