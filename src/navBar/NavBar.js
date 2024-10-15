import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const NavBar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(prevState => !prevState);
    };

    return (
        <nav className={"nav-container"}>
            <Link to="/">AUTO STORE</Link>
            <div className={"center-links"}>
                <ul>
                    <li>
                        <Link to={"/shop"}>SHOP</Link>
                    </li>
                    <li>
                        <Link to={"/services"}>SERVICES</Link>
                    </li>
                    <li>
                        <Link to={"/for-your-car"}>FOR YOUR CAR</Link>
                    </li>
                    <li>
                        <Link to={"/contact-us"}>CONTACT US</Link>
                    </li>
                </ul>
            </div>
            <div className={"search-bar"}>
                <div className={`search-box ${isSearchOpen ? 'active' : ''}`}>
                    <input type={"text"} placeholder={"Search here"}/>
                </div>
                <button className={"icon"} onClick={toggleSearch} style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                    {isSearchOpen ? <CloseIcon/> : <SearchIcon/>}
                </button>
            </div>

            <ul>
                <li>
                    <Link to={"/login"}>
                        <button style={{background: 'none', border: 'none', cursor: 'pointer'}}>
                            <LoginIcon/>
                        </button>
                    </Link>
                </li>
                <li>
                    <Link to={"/cart"}>
                        <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                            <ShoppingCartIcon />
                        </button>
                    </Link>
                </li>
            </ul>
        </nav>
    )
}
