import React, {useEffect, useRef} from "react";
import '../styles/login.css'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup}
from 'firebase/auth'
import { useNavigate, Link} from 'react-router-dom'
import '../styles/swal.css'
import { getAllByAltText } from "@testing-library/react";



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

const emailInput = useRef();
const passInput = useRef();
const eyeIcon = useRef();


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
    signInWithEmailAndPassword(auth, loginEmail, loginPass)
      .then(
        setFirstRend(true)
      ).catch( (error) =>{
        const er = JSON.stringify(error)
        console.log(er)
        if(er.includes("user-not-found")||er.includes('invalid-email')){
        showError('email')
      }else if(er.includes("wrong-password")){
        showError('password')
      }
    }
      )

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

const showError = (input) =>{
  if(input === 'email'){
  emailInput.current.style.outline = "solid	#8B0000"
  }else if(input === 'password'){
    passInput.current.style.outline = "solid	#8B0000"
  }else{
    passInput.current.style.outline = "solid #8B0000"
    emailInput.current.style.outline = "solid	#8B0000"
  }
}

const showOrHidePass = () =>{
  let type = passInput.current.type;
  let path = eyeIcon.current;
  let dPath = path.getAttribute('d');

  type === "password" ?
    passInput.current.type = "text"
    :
    passInput.current.type = "password";
    
  dPath === 'M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z' ?
    path.setAttribute('d', "M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z")
    :
    path.setAttribute('d', 'M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z')
   
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
         <div className="login-data">
               <label htmlFor="email">Email:</label>
               <input  id="email" className="login-mail" type="text" ref={emailInput} /> 
               <label htmlFor="pass">Password:</label>
               <input id="pass" className="login-pass" type="password" ref={passInput}></input> <svg onClick={showOrHidePass} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path ref={eyeIcon} d='M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z'
             /></svg>
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