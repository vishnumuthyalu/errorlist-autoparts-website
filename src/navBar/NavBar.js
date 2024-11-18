import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './NavBar.css';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import LoginIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {query} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

export const NavBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(prevState => !prevState);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && query.trim()) {
            e.preventDefault(); // Prevent form submission or page refresh
            navigate(`/search?query=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className={"nav-container"}>
            <Link to="/">
                <img src={`${process.env.PUBLIC_URL}/logo2_new.png`} alt="Auto Store Logo" className="nav-logo" />
            </Link>
            <p className="logo-text"> GEARBOX SUPPLY</p>
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
                    <input type={"text"} placeholder={"Search here"} onChange={(e) => setQuery(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>
                <button className={"icon"} onClick={toggleSearch}
                        style={{background: 'none', border: 'none', cursor: 'pointer'}}>
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
