import React, {useRef} from "react";
import '../styles/login.css'
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function Register (props) {

    const app = props.app;
    const auth = getAuth(app)

    const MySwal = withReactContent(Swal)

    const email = useRef();
    const pass = useRef();
    const passConfirm = useRef();
    const eyeIcon = useRef();
    const eyeIconConfirm = useRef();

    const setFirstRend = props.setFirstRend;

    const showError = (input) =>{
        if(input === 'email'){
        email.current.style.outline = "solid	#8B0000"
        }else if(input === 'password'){
          pass.current.style.outline = "solid	#8B0000"
          passConfirm.current.style.outline = "solid	#8B0000"
          setTimeout(eliminateOutlineColor, 3500)
        }
      }

    const eliminateOutlineColor = () =>{
      const input = document.querySelectorAll('input')
      input.forEach( (element) =>{
        element.style.outline = "none"
      })
    }

    const createAccount = async (e) => {
        e.preventDefault();

        if(pass.current.value === passConfirm.current.value){
        createUserWithEmailAndPassword(auth, email.current.value, pass.current.value)
          .then(
            setFirstRend(true)
          ).catch( (error) =>{
            const er = JSON.stringify(error)
            if(er.includes('email-already-in-use')){
              MySwal.fire({
                title:'The email is already in use',
              customClass: {
                confirmButton: "confirm-btn",
                popup : "swal-cont",
                }})
            showError('email')
            }
          })
        
    
        }else{
          MySwal.fire({
            title:"The passwords don't match",
          customClass: {
            confirmButton: "confirm-btn",
            popup : "swal-cont",
            }})
            showError('password')
        }
    }

    const showOrHidePass = (e) =>{
        console.log(e.target.ref)

        let type = pass.current.type;
        let typeConf = passConfirm.current.type;

        let path = eyeIcon.current;
        let dPath = path.getAttribute('d');

        let pathConf = eyeIconConfirm.current;
        let dPathConf = pathConf.getAttribute('d');

        
      
        type === "password" ?
          pass.current.type = "text"
          :
          pass.current.type = "password";
          
        dPath === 'M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z' ?
          path.setAttribute('d', "M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z")
          :
          path.setAttribute('d', 'M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z')

          typeConf === "password" ?
          passConfirm.current.type = "text"
          :
          passConfirm.current.type = "password";
          
        dPathConf === 'M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z' ?
          pathConf.setAttribute('d', "M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z")
          :
          pathConf.setAttribute('d', 'M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z')
         


      }

    return(
        <>
        <div className="log-head">
            <div className="log-dot"> 
            <div className="log-title"><Link to="/login">miNOTE</Link></div>
            </div>
        </div>
    <form action="">
     <div className="login-data">
          <label htmlFor="email">Email:</label>
            <input  id="email" className="login-mail" type="text" ref={email}/> 
         <div className="password-column">
          <div>
            <label htmlFor="pass">Password:</label>
              <input id="pass" className="login-pass" type="password" ref={pass}></input> 
                <svg onClick={showOrHidePass} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path ref={eyeIcon} d='M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z'/></svg>
          </div>
          <div>
            <label htmlFor="pass-confirm">Repeat password:</label>
              <input id="pass-confirm" className="login-pass" type="password" ref={passConfirm }></input> 
                <svg onClick={showOrHidePass} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path ref={eyeIconConfirm} d='M11.885 14.988l3.104-3.098.011.11c0 1.654-1.346 3-3 3l-.115-.012zm8.048-8.032l-3.274 3.268c.212.554.341 1.149.341 1.776 0 2.757-2.243 5-5 5-.631 0-1.229-.13-1.785-.344l-2.377 2.372c1.276.588 2.671.972 4.177.972 7.733 0 11.985-8.449 11.985-8.449s-1.415-2.478-4.067-4.595zm1.431-3.536l-18.619 18.58-1.382-1.422 3.455-3.447c-3.022-2.45-4.818-5.58-4.818-5.58s4.446-7.551 12.015-7.551c1.825 0 3.456.426 4.886 1.075l3.081-3.075 1.382 1.42zm-13.751 10.922l1.519-1.515c-.077-.264-.132-.538-.132-.827 0-1.654 1.346-3 3-3 .291 0 .567.055.833.134l1.518-1.515c-.704-.382-1.496-.619-2.351-.619-2.757 0-5 2.243-5 5 0 .852.235 1.641.613 2.342z'/></svg>
          </div>
         </div>
         
      </div>
      <div className="login-btns">
        <button type='submit' onClick={createAccount}>create account</button>
      </div>
      <a target='blank' href="https://www.linkedin.com/in/lautaro-rocha/">designed and developed by @lautaroRocha</a>
    </form>

    </>
    )
}

export default Register;