import { useState } from 'react';
import { Register } from './components/register';
import { Login } from './components/login';
import { HashRouter } from "react-router-dom";
import Home from './components/Home';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

export function App() {
  const [view, setView] = useState("register");
  
  function ChangeView(){
    switch(view) {
      case 'register':
        setView('login');
        break;
      case 'login':
        setView('Home');
        break;
      default:
        setView('register');
    }
  }
  
  function renderView(ev) {
    switch (view) {
      case "register":
        return <Register />;
      case "login":
        return <Login />;
      case "Home":
        return <Home />;
      default:
        return <Register />;
    }
  }
  
  return (
    <HashRouter>
      <>
        <div className="appContainer">{renderView()}</div>
        <div className="text-center">
          <button type="button" className="btn btn-success" onClick={ChangeView}>Change</button>
        </div>
      </>
    </HashRouter>
  )
}

export default App;

