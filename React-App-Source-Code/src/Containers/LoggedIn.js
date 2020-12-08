import React, {Fragment, useContext, useEffect, useState} from 'react';
import UserContext from '../Context/userContext';

import './LoggedIn.css';
import InventoryItem from '../Components/InventoryItem/InventoryItem';




const LoggedIn = (props) =>{
    const [count, setCount] = useState([{inventory:{description:"",id:"",displayed:false,url:"",username:""}}]);

    useEffect(() => {
        getInventory();
      });


      const getInventory = () =>{
    

        const Http = new XMLHttpRequest();
        let url = "http://10.0.0.108:80/inventory";
        Http.open("GET",url);
        Http.send();
        Http.onreadystatechange = (e) => {
          //console.log(JSON.parse(Http.response));
         setCount({inventory:JSON.parse(Http.response)})
        }
    }

    const userContext = count.inventory

    let inventory=count
    console.log(inventory);
    //console.log(currentSearch,currentSearch.join(' '));

    let selectedInventory = inventory.map(item =>{
        return userContext.currentSearch.map(
            index =>{
                if(index === item.id.toString() && item.displayed === false)
                {
                    item.displayed = true;
                    return <InventoryItem description={item.description} id={item.id} key={item.id}/>;
                }
                else    
                    return null;
            }
        )
    });

    let totalInventory = inventory.map(item =>{
        return <InventoryItem description={item.description} id={item.id} key={item.id}/>
    });

    let itemSelector=(
        <ul className='itemSelector'>
        <ul onClick={() => {userContext.itemTab(0)}} className={userContext.tabs[0].classes}>All Inventory</ul>
        <ul onClick={() => {userContext.itemTab(1)}} className={userContext.tabs[1].classes}>Search</ul>
        <ul onClick={() => {userContext.itemTab(2)}} className={userContext.tabs[2].classes}>Item</ul>
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