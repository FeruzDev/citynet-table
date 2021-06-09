import React from 'react';
import {Link} from "react-router-dom";

const TopNavbar = () => {
    return (
        <div className="TopNavbar">
            <Link to='/home' className="navbar-brand"  ><img src="/img/clogo.png" alt=""/></Link>


                <a className="nav-link d-flex justify-content-center align-items-center"   > Выйти</a>

        </div>
    );
};

export default TopNavbar;