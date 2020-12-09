import React, {Fragment, useContext, useEffect, useState} from 'react';
import UserContext from '../Context/userContext';

import './LoggedIn.css';
import InventoryItem from '../Components/InventoryItem/InventoryItem';





const LoggedIn = (props) =>{
    let debug = false;


    const [count, setCount] = useState([{inventory:{description:"",id:"",displayed:"false",url:"",username:""}}]);
    const [addItem, setAddItem] = useState({id:"ID",description:"Description",stock:"Stock"});
    const [update, setUpdate] = useState(false);
    const userContext = useContext(UserContext)
    let mounted = false;
    useEffect(() => {
        mounted = true;
        getInventory();
        
        return () => mounted = false;
      },[]);
        
      useEffect(() => {
        mounted = true;
        getInventory();
        
        return () => mounted = false;
      },[update]);

  

      const getInventory = () =>{
    

        const Http = new XMLHttpRequest();

        let url;
        if(debug === true)
            url = "http://10.0.0.108:80/inventory/" + userContext.UserToken.userToken;
        else
            url = window.location.href + "inventory/" + userContext.UserToken.userToken;

        console.log(url);
        Http.open("GET",url);
        Http.send();
        
        Http.onreadystatechange = (e) => {
          console.log(JSON.parse(Http.response)[22]);
          let temp = JSON.parse(Http.response);
          let result = [];
          for(let i = 0; temp[i] !== undefined; i++){
              result.push(temp[i]);
          }
         setCount(result)
         console.log(count);
        }
    }

    const addInventory = () =>{
        const Http = new XMLHttpRequest();
        let url;
        if(debug === true)
            url = "http://10.0.0.108:80/inventory/"   + userContext.UserToken.userToken;
        else
            url = window.location.href + "inventory/" + userContext.UserToken.userToken;


        Http.open("POST",url);
        let data = {id:addItem.id, description:addItem.description, displayed:false, url:"http"};
       // console.log(JSON.stringify(data));
        Http.send(JSON.stringify(data));
        
        Http.onreadystatechange = (e) => {
            alert("Inventory Added");
            setUpdate(!update);
        }
    }

    const removeInventory = (id) =>{
        let url;
        if(debug === true)
            url = "http://10.0.0.108:80/inventory/" + userContext.UserToken.userToken;
        else
            url = window.location.href  + "inventory/" + userContext.UserToken.userToken + "/" + id;

        //const Http = new XMLHttpRequest();
        //let url = "http://10.0.0.108:80/inventory/" + userContext.UserToken.userToken + "/" + id;
        // Http.open("DELETE",url);
       
        // Http.send();
        // console.log("Remove URL: " + url);
        // Http.onreadystatechange = (e) => {
        //     console.log("got to remove");
        //     console.log(Http.response);
        //     setUpdate(true);
        // }

        return fetch(url, {
            method: 'delete'
          }).then(response =>
            response.json().then(json => {
                alert("Inventory Removed");
                setUpdate(!update);
               
              return json;
            })
          );
    }


    const inventory = count;
    

   

    let selectedInventory = inventory.map(item =>{
        return userContext.currentSearch.map(
            index =>{
                
                if(index == item.id && item.displayed == false)
                {
                    console.log(item.id);
                    item.displayed = true;
                    return <InventoryItem description={item.description} id={item.id} key={item.id}/>;
                }
                else    
                    return null;
            }
        )
    });
    //console.log(selectedInventory);

    let totalInventory = inventory.map(item =>{
        return <InventoryItem description={item.description} id={item.id} key={item.id} deleteInventory={removeInventory}/>
    });

    let itemSelector=(
        <ul className='itemSelector'>
        <ul onClick={() => {userContext.itemTab(0)}} className={userContext.tabs[0].classes}>All Inventory</ul>
        <ul onClick={() => {userContext.itemTab(1)}} className={userContext.tabs[1].classes}>Search</ul>
        <ul onClick={() => {userContext.itemTab(2)}} className={userContext.tabs[2].classes}>Add Item</ul>
        <ul onClick={() =>{userContext.logout(true)}} className='itemTab'>Logout</ul>
    </ul>
    );
    







    let itemArea = null;
    if(userContext.tabs[0].classes.includes("selectedItem"))
    {
        itemArea = (
            <ul className='itemArea'>
                {itemSelector}
                {totalInventory}    
            </ul>
        ); 
    }

    else if(userContext.tabs[1].classes.includes("selectedItem"))
    {
        itemArea = (
            <ul className='itemArea'>
                {itemSelector}
                <input onChange={userContext.updateSearch} className='searchBar' type="text" value={userContext.currentSearch.join(' ')}></input>
                {selectedInventory}
            </ul>
        ); 
    }

    else if(userContext.tabs[2].classes.includes("selectedItem"))
    {
        itemArea = (
            <ul className='itemArea'>
                {itemSelector}   
                    <input onChange={(e)=>setAddItem({stock:addItem.stock,description:addItem.description,id:e.target.value})} className ="searchBar"  placeholder={addItem.id}/>     
                    <input onChange={(e)=>setAddItem({stock:addItem.stock,description:e.target.value,id:addItem.id})} className ="searchBar" placeholder={addItem.description}/>   
                    <input onChange={(e)=>setAddItem({stock:e.target.value.stock,description:addItem.description,id:e.target.value})} className ="searchBar" placeholder={addItem.stock}/>  
                    <button onClick={addInventory}className="button"type="button">Submit</button>
                <InventoryItem type="addItem" description={addItem.description} id={addItem.id}/>
            </ul>
        ); 
    }

    return(
        <Fragment>
            <ul className="header">
                <li className="headerTitle" >Inventory</li>
                <li className="headerProfile" >Profile</li>
            </ul>
            {itemArea}   
        </Fragment>
    );
  
}

export default LoggedIn;