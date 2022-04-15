import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Workbox } from "workbox-window";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// Check if service workers are supported
if ("serviceWorker" in navigator) {
  // register workbox service worker
  const workboxSW = new Workbox("/src-sw.js");
  workboxSW.register();
} else {
  console.error("Service workers are not supported in this browser.");
}
