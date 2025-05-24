import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';

/**
 * Entry Point
 * 
 * This is the main entry point of the React application.
 * It renders the root <App /> component inside the HTML element with id="root".
 * 
 * Web vitals reporting is included and can be customized for performance tracking.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();