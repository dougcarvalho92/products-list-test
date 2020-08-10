import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "./pages/Login";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import ProductForm from "./pages/ProductForm";
import AdminPanel from "./pages/AdminPanel";

import { Context } from "./contexts/auth";
function CustomRoute({ isPrivate, logout, ...rest }) {
  const { loading, authenticated, handleLogout } = useContext(Context);
  if (logout) {
    handleLogout();
  }
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}

const Routes = () => {
  return (
    <Switch>
      <CustomRoute path="/" exact component={Login} />
      <CustomRoute path="/register" component={Register} />
      <CustomRoute path="/products" isPrivate component={ProductList} />
      <CustomRoute path="/add-product" isPrivate component={ProductForm} />
      <CustomRoute path="/admin-panel" isPrivate component={AdminPanel} />
      <CustomRoute path="/logout" logout />
    </Switch>
  );
};

export default Routes;
