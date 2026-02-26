import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Dashboard from './Dashboard';
import Launch from "./Launch"
import Shuttle from "./Shuttle"
import reportWebVitals from './reportWebVitals';

function getAutoComponent() {
  const now = new Date();
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();

  // sat 12:25am -> 2:25 am
  if(day === 6 && minutes >= 25 && minutes <= 145) return Shuttle;

  // sat 7:50am -> 9:40 am
  // if(day === 6 && minutes >= 470 && minutes <= 580) return Shuttle;

  if(day === 4 && minutes >= 922) return Shuttle;

  // sun 12:15am -> 2:20am
  if(day === 0 && minutes >= 15 && minutes <= 140) return Shuttle;

  // sun 8:30am -> 10:00am 
  // if(day === 0 && minutes >= 510 && minutes <= 600) return Shuttle;
  
  return Dashboard;
}

// TODO: Make this an env variable.
// TODO: enforce that this is one of the 4 allowed options below!
const mode: string = 'auto';

let ComponentToRender;

switch (mode) {
  case "launch":
    ComponentToRender = Launch;
    break;
  case "shuttle":
    ComponentToRender = Shuttle;
    break;
  case "dashboard":
    ComponentToRender = Dashboard;
    break;
  case "auto":
    ComponentToRender = getAutoComponent();
    break;
  default:
    ComponentToRender = getAutoComponent();
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ComponentToRender />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
