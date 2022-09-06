import React, {useEffect} from "react";
import '../styles/login.css'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged}
from 'firebase/auth'
import {Navigate, useNavigate} from 'react-router-dom'


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
        <form action="">
            <span id="msg"></span>
            <input id="email" className="login-mail" type="text" />
            <input id="pass" className="login-pass" type="password" />
            <button type='submit' onClick={loginInWithMailAndPass}> ok </button>
            <button type='submit' onClick={createAccount}> create </button>
        </form>
        </>
    )
}

export default Login;