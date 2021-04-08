import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
// import logo from '../../images/logo.png';
import './Header.css';
import { Button } from '@material-ui/core';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { isSignedIn } = loggedInUser;
    return (
        <div className="header">
            <Link to="/"> <img className="header__logo"
                src="https://i.ibb.co/Pt4kvt8/logo.jpg" alt="/" />
            </Link>
            <div className="header__search">
                <input className="header__searchInput" placeholder="search for product" type="text" />
            </div>

            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/inventory">Manage Inventory</Link>
                {
                    isSignedIn && <Button variant="contained" color="primary" onClick={() => setLoggedInUser({})}>Sign Out</Button>
                }
                {
                    !isSignedIn && <Button variant="contained" color="primary" onClick={() => setLoggedInUser({})}>Sign In</Button>
                }

            </nav>
        </div>
    );
};

export default Header;