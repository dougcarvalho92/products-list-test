import React, { useState, useEffect, useContext } from "react";
import PageHeader from "../../components/PageHeader";
import api from "../../services/api";
import "./styles.css";
import {
  Table,
  ButtonGroup,
  DropdownButton,
  Dropdown,
  Button,
} from "react-bootstrap";
import { Context } from "../../contexts/auth";
import { Link } from "react-router-dom";
import history from "../../history";
import { confirmAlert } from "react-confirm-alert";

function AdminPanel() {
  const { user } = useContext(Context);
  const status = ["Pendente", "Em Análise", "Aprovado", "Reprovado"];
  const [productsList, setProductsList] = useState([]);

  async function loadProducts() {
    await api
      .get("product")
      .then((response) => {
        setProductsList(response.data);
        console.log(response.data);
      })
      .catch((erro) => {});
  }
  const handleDeleteProduct = (id) => {
    confirmAlert({
      title: "Confirme a solicitação ",
      message: `Tem certeza que deseja remover o produto ${id}?`,
      buttons: [
        {
          label: "Sim",
          onClick: async () =>
            await api
              .delete("product/" + id)
              .then((response) => {
                console.log(response.data);
                loadProducts();
              })
              .catch((erro) => {}),
        },
        {
          label: "Não",
          onClick: () => console.log("Click No"),
        },
      ],
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div id="admin-product-list" className="container">
      <PageHeader title="Painel Administrativo" back={false}></PageHeader>

      <main>
        <button
          onClick={() => history.push("/add-product")}
          className="default-button"
       
        >
          Adicionar
        </button>
        <hr />
        {productsList.length > 0 ? (
          <Table striped bordered hover responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {productsList.map((product) =>
                (user.user.id === product.user_id) | (user.user.level === 0) ? (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{status[product.status]}</td>
                    <td>
                      <ButtonGroup>
                        <DropdownButton
                          as={ButtonGroup}
                          title="Ações"
                          id="bg-nested-dropdown"
                        >
                          <Dropdown.Item
                            as={Link}
                            to={{
                              pathname: "/add-product",
                              product: product,
                            }}
                          >
                            Editar
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            Remover
                          </Dropdown.Item>
                        </DropdownButton>
                      </ButtonGroup>
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )}
            </tbody>
          </Table>
        ) : (
          <div>Nenhum produto encontrado</div>
        )}
      </main>
    </div>
  );
}

export default AdminPanel;
