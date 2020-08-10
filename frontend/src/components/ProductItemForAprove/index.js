import React from "react";

import api from "../../services/api";
import "./styles.css";
import Products from "../../interfaces/Products";
import Select from "../Select";

const ProductItemForAprove = ({ product,...props}) => {
  const token = localStorage.getItem("Auth:token");

  return (
    <article className="product-item">
      <img src={product.image_url} alt={product.name} />
      <p>
        <strong>{product.name}</strong>
        <p>{product.description}</p>
      </p>
      <p>
        <Select
          name="status"
          label=""
          options={[
            {
              value: "pendente",
              label: "Pendente",
            },
            {
              value: "analise",
              label: " Em Análise",
            },
            {
              value: "aprovado",
              label: "Aprovado",
            },
            {
              value: "reprovado",
              label: "Reprovado",
            },
          ]}
        />
      </p>
      <p>
        <button>Salvar</button>
      </p>
    </article>
  );
};

export default ProductItemForAprove;
