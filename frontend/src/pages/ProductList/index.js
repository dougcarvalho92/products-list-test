import React, { useState, useEffect } from "react";
import PageHeader from "../../components/PageHeader";
import ProductItem from "../../components/ProductItem";
import Input from "../../components/Input";

import "./styles.css";

import useDebounce from "../../hooks/useDebounce";
import api from "../../services/api";

function ProductList() {
  const token = localStorage.getItem("Auth:token");
  const [searchProducts, setSearchProducts] = useState("");
  const filtro = useDebounce(searchProducts, 700);
  const [productsList, setProductsList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFilter = () => {
    let filters = productsList.filter((item) => {
      let nome = item.name.toLowerCase().indexOf(filtro.toLowerCase());
      if (nome != -1) {
        return item;
      }
      return;
    });

    setFilteredList(filters);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    handleFilter();
  }, [filtro]);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      await api
        .get("products")
        .then((response) => {
          setProductsList(response.data);
          setFilteredList(response.data);
          setLoading(false);
        })
        .catch((erro) => {});
    }
    loadProducts();
  }, []);

  return (
    <div id="page-product-list" className="container">
      <PageHeader title="Lista de Produtos">
        <form id="search-products">
          <Input
            type="text"
            name="busca"
            label=""
            placeholder="Buscar Produtos"
            value={searchProducts}
            onChange={(e) => {
              setSearchProducts(e.target.value);
            }}
          />
        </form>
      </PageHeader>
      {loading ? (
        <div className="loading"></div>
      ) : (
        <main>
          {filteredList.length > 0 ? (
            filteredList.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))
          ) : (
            <div className="not-found">Nenhum produto encontrado</div>
          )}
        </main>
      )}
    </div>
  );
}

export default ProductList;
