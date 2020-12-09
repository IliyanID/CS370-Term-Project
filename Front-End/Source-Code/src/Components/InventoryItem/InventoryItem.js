import React from 'react'
import logo from '../../resources/r1.jpg';
import './InventoryItem.css';


const InventoryItem = (props) =>{
    let imageClass = "image";
    let desClass = "itemDes";
    if (props.type === "addItem"){
        imageClass = "addItemImage";
        desClass = "addItemDes";
        console.log("Got here");
    }
    return(
        <li className="item">
            <img className={imageClass} src={logo}/>
    <div className={desClass}>{props.description} ID:{props.id}{(imageClass === "image")?<button onClick={() =>{props.deleteInventory(props.id)}} className="button">Remove</button>:null}</div>
        </li>
    );
}

export default InventoryItem;