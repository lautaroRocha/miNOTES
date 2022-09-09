import React, {useEffect} from "react";
import '../styles/login.css'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup}
from 'firebase/auth'
import { useNavigate, Link} from 'react-router-dom'



function Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="50"
      height="50"
      viewBox="0 0 46 46"
    >
      <defs>
        <rect id="path-2" width="40" height="40" x="0" y="0" rx="2"></rect>
      </defs>
      <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
        <g transform="translate(-1 -1)">
          <g filter="url(#filter-1)" transform="translate(4 4)">
            <g>
              <use fill="#FFF" xlinkHref="#path-2"></use>
              <use xlinkHref="#path-2"></use>
              <use xlinkHref="#path-2"></use>
              <use xlinkHref="#path-2"></use>
            </g>
          </g>
          <g transform="translate(15 15)">
            <path
              fill="#4285F4"
              d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
            ></path>
            <path
              fill="#34A853"
              d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
            ></path>
            <path
              fill="#FBBC05"
              d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
            ></path>
            <path
              fill="#EA4335"
              d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
            ></path>
            <path d="M0 0h18v18H0V0z"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

function Login(props) {

    
const provider = new GoogleAuthProvider();

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

const loginWithGoogle = () =>{
signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const googleUser = result.user;
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
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
            <div className="login-go">
                    {<Icon />} <span onClick={loginWithGoogle}>Access with Google</span>
            </div>
            <a>OFFLINE VERSION</a>
        </form>

        </>
    )
}

export default Login;