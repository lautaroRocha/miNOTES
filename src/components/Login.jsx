import React, {useEffect} from "react";
import '../styles/login.css'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged}
from 'firebase/auth'
import {Navigate, useNavigate, Link} from 'react-router-dom'
import Footer from "./Footer";

function Login(props) {

const setFirstRend = props.setFirstRend;
const setUser = props.setUser;
const navigate = useNavigate();

const app = props.app;
const auth = getAuth(app)

const loginInWithMailAndPass = async (e) => {
    e.preventDefault();
    const loginEmail = document.querySelector('#email').value;
    const loginPass = document.querySelector('#pass').value;
    const userCredentials = await signInWithEmailAndPassword(auth, loginEmail, loginPass)
    setFirstRend(true)

}

const createAccount = async (e) => {
    e.preventDefault();
    const loginEmail = document.querySelector('#email').value;
    const loginPass = document.querySelector('#pass').value;

    const userCredentials = await createUserWithEmailAndPassword(auth, loginEmail, loginPass)

    console.log(userCredentials.user)

}

const useMonitorAuthState = async () => {
    useEffect(() =>{
        onAuthStateChanged(auth, user =>{
            if (user){
                setUser(user)
                localStorage.setItem('user', JSON.stringify(user));
                navigate('/', {replace:true})
            }
        })
    })
    
    
}


useMonitorAuthState()


    return(
        <>
            <div className="log-head">
                <div className="log-dot"> 
                <div className="log-title">miNOTE</div>
                </div>
            </div>

        <form action="">
            <span id="msg"></span>
         <div className="login-data">
               <label htmlFor="email">Email:</label>
               <input id="email" className="login-mail" type="text" />
               <label htmlFor="pass">Password:</label>
               <input id="pass" className="login-pass" type="password" />
         </div>
            <div className="login-btns">
                <button type='submit' onClick={loginInWithMailAndPass}>login</button>
                <Link to="">register</Link>
            </div>

            <a>OFFLINE VERSION</a>
        </form>

        </>
    )
}

export default Login;