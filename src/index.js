import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'toasted-notes/src/styles.css';
import './scss/estilos.css'
import * as serviceWorker from './serviceWorker';


ReactDOM.render(

  <App />
  ,
  document.getElementById('root')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
