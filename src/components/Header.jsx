import React from "react";
import '../styles/header.css'
import { useNavigate, Link } from "react-router-dom";
import { signOut, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import '../styles/swal.css'


function Header(props) {
    const MySwal = withReactContent(Swal);
    const user = localStorage.getItem('user')
    const setUser = props.setUser;
    const setNotes = props.setNotes;
    const auth = getAuth();
    const navigate = useNavigate();

    const exitDoor = <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd" ><path d="M11 21h8v-2l1-1v4h-9v2l-10-3v-18l10-3v2h9v5l-1-1v-3h-8v18zm10.053-9l-3.293-3.293.707-.707 4.5 4.5-4.5 4.5-.707-.707 3.293-3.293h-9.053v-1h9.053z"/></svg>;

    const addNote = () =>{
        navigate('/new', {replace: true})
    }
    const goToFavs = () =>{
        let current = window.location.pathname;        
        current !== '/fav' ?
        navigate('/fav', {replace: true}):
        navigate('/', {replace: true})
    }

    const logOutAndReset = () =>{
        signOut(auth).then(() => {
            setNotes([]);
            localStorage.removeItem('user')
            setUser(null)
            navigate('/login', {replace: true})
    })}

    const logOut = () =>{
        MySwal.fire({
            customClass: {
                confirmButton: "confirm-btn",
                popup : "swal-cont",
            },
            confirmButtonText : <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff" viewBox="0 0 24 24"><path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/></svg> ,
            cancelButtonText :<svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="#fff"viewBox="0 0 24 24"><path d="M23 20.168l-8.185-8.187 8.185-8.174-2.832-2.807-8.182 8.179-8.176-8.179-2.81 2.81 8.186 8.196-8.186 8.184 2.81 2.81 8.203-8.192 8.18 8.192z"/></svg> ,
            title : exitDoor,
            showCancelButton: true }
        ).then( (result) => {
            if(result.isConfirmed){
                logOutAndReset()
            }
            }).catch( (error) =>{
                console.log(error)
            })
        }
        
         
    
    return(
        <div className="head">
            <Link to='/' className="head-tit">
            <h1 >
                miNOTE
            </h1>
            </Link>
            <div className="head-btns">
                <button onClick={goToFavs} className="fav-btn">
                   { window.location.pathname !== '/fav' ?
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg> :
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
                   }
                </button>
                <button onClick={addNote} className="new-btn">
                    +
                </button>
                <button className="logout" onClick={logOut}> 
                   {exitDoor}
                </button>
            </div>
        </div>
    )
}

export default Header;