import React from "react";
import {Outlet, Link, useNavigate} from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => { // console.warn('apple');
        localStorage.clear();
        navigate('/Signup');
    }
    return (
    <div> {auth ? <ul className="nav-ul">
            <li>
                <Link to="/home">Home</Link>
            </li>

            <li>
                <Link to="/products">Products</Link>
            </li>
            <li>
                <Link to="/add-products">Add Products</Link>
            </li>
            <li>
                <Link to="/profile">Profile</Link>
            </li>
            <li>
                <Link onClick={logout}
                    to="/Signup">Logout({JSON.parse(auth).name})</Link>
            </li>
            </ul>
            :<ul className="nav-ul nav-right">
                <li>
                    <Link to="/Signup">Signup</Link>
                </li>
                <li>
                    <Link to="/login">login</Link>
                </li>
            </ul>
            }
    </div>
    
    )
}
export default Nav;
