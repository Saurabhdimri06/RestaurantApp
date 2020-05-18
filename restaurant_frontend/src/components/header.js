import React from 'react'
import restaurant from "../restaurant_image.jpg"
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ListIcon from '@material-ui/icons/List';

class Header extends React.Component{
    render(){
        return(
            <div>
                <div className='header'>
                    <img src={restaurant} className="header_img" alt="Restaurant Photo" />
                </div>
                <div className="header_items">
                    <ul>
                        <li><a href="/"><HomeIcon />Home</a></li>
                        <li><a href="/menu"><ListIcon />Menu</a></li>
                        <li><a href="/orders"><InfoIcon />Orders</a></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Header