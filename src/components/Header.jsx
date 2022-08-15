import React from "react";
import '../styles/header.css'
import { useNavigate, Link } from "react-router-dom";
function Header() {
    const navegar = useNavigate();

    const addNote = () =>{
        navegar('/new', {replace: true})
    }
    return(
        <div className="head">
            <Link to='/' className="head-tit">
            <h1 >
                miNOTE
            </h1>
            </Link>
            <button onClick={addNote} className="head-btn">
                +
            </button>
        </div>
    )
}

export default Header;