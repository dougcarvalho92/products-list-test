import React from "react";
import "./assets/styles/global.css";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Routes from "./routes";
import { AuthProvider } from "./contexts/auth";
import { Router } from "react-router-dom";
import history from "./history";

function App() {
  return (
    <AuthProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </AuthProvider>
  );
}

export default App;
