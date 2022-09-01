import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDW_hg8Zbngw2tvRH-rWjgdJXunrQFqmek",
  authDomain: "minote-cf0e1.firebaseapp.com",
  projectId: "minote-cf0e1",
  storageBucket: "minote-cf0e1.appspot.com",
  messagingSenderId: "454154376558",
  appId: "1:454154376558:web:bbff2a2ffe39c258139d7f",
  measurementId: "G-DK9097HGCB"
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App app={app}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
