import React, { useState, FormEvent, useEffect, useContext } from "react";
import { useHistory, Link } from "react-router-dom";

import Input from "../../components/Input";

import "./styles.css";
import api from "../../services/api";
import { Context } from "../../contexts/auth";
function Register() {
  const history = useHistory();
  const { authenticated, handleCreateUser } = useContext(Context);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");

  function handleRegisterForm(e) {
    e.preventDefault();
    handleCreateUser(name, email, password, 1);
  }
  return (
    <div id="page-login-form" className="container">
      <main>
        <form onSubmit={handleRegisterForm}>
          <fieldset>
            <legend>Preencha os dados para cadastro</legend>
            <Input
              name="name"
              label="Nome"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <Input
              name="email"
              label="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />

            <Input
              name="password"
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Input
              name="password"
              label="Confirme a Senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirm(e.target.value);
              }}
            />
          </fieldset>

          <footer>
            <button type="submit" className="default-button">Cadastrar</button>
            <p>
              Já possui uma conta? <Link to="/">Login</Link>
            </p>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default Register;
