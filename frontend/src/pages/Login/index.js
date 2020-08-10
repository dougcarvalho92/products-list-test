import React, { useState, FormEvent, useContext } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import "./styles.css";
import { Context } from "../../contexts/auth";

function Login() {
  const { authenticated, handleLogin } = useContext(Context);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleLoginForm = (e) => {
    e.preventDefault();
    handleLogin(credentials);
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  return (
    <div id="page-login-form" className="container">
      <main>
        <form onSubmit={handleLoginForm}>
          <fieldset>
            <legend>Preencha os dados para acessar</legend>

            <Input
              name="username"
              label="Email"
              type="email"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />

            <Input
              name="password"
              label="Senha"
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </fieldset>

          <footer>
            <button type="submit" className="default-button ">
              Entrar
            </button>
            <p>
              Não possui conta? <br />
              <Link to="/register">Registre-se</Link>
            </p>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Login;
