/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App/App";
export {};
declare global {
  interface Window {
    MyWidget: any;
  }
}

// uncomment next lines after prod
// && need uncomment some lines in app.js
/* export const init = (selector: HTMLElement): void => {
  ReactDOM.render(<App />, selector);
} */

// commented next lines after prod
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
