import React from 'react';
import { NavLink } from 'react-router-dom';

function NavBar(props){

    return(
        <div className="w3-green w3-top w3-center">
            <NavLink to='/'><div className="w3-btn">Home</div></NavLink>
            <NavLink to='/jackets'><div className="w3-btn">Jackets</div></NavLink>
            <NavLink to='/shirts'><div className="w3-btn">Shirts</div></NavLink>
            <NavLink to='/accessories'><div className="w3-btn">Accessories</div></NavLink>
        </div>
    );
}

export default NavBar;