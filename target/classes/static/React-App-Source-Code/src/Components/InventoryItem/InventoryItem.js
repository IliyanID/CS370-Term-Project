import React from 'react'
import logo from '../../resources/r1.jpg';
import './InventoryItem.css';


const InventoryItem = (props) =>{

    return(
        <li className="item">
            <img className='image' src={logo}/>
            <div className='itemDes'>{props.description} ID:{props.id}</div>
        </li>
    );
}

export default InventoryItem;