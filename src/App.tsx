/* eslint-disable @typescript-eslint/no-explicit-any */
import logo from './logo.svg';
import React from "react";
import './index.css'

function App(): any {
  const link = document.createElement("link");
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', 'https://blablabla2.netlify.app/main.css')
  document.head.appendChild(link)
  return (
    <div className="Weather-widget-app">
      <h1>My React and TypeScript App!</h1>
      <img src={logo} alt='logo'/>
    </div>
  );
}

export default App;
