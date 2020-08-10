import React, { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";

import "./styles.css";
import api from "../../services/api";
import history from "../../history";
import Select from "../../components/Select";
import { Context } from "../../contexts/auth";

import Dropzone from "react-dropzone";

function ProductForm(props) {
  const { user } = useContext(Context);
  const location = useLocation();
  const [name, setName] = useState("");
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState();

  useEffect(() => {
    async function loadData() {
      if (location.product) {
        let product = location.product;
        setName(product.name);
        setPreview(product.image_url);

        var filename = product.image_url.substring(
          product.image_url.lastIndexOf("/images/") + 8,
          product.image_url.lastIndexOf(".")
        );
        await fetch(product.image_url)
          .then((res) => res.blob())
          .then((blob) => {
            const file = new File([blob], filename, {
              type: blob.type,
              lastModifiedDate: new Date(),
            });

            setImage(file);
          });

        setPrice(product.price);
        setDescription(product.description);
        setStatus(parseInt(product.status));
      }
    }
    loadData();
  }, []);

  async function handleUploadFile(e) {
    e.preventDefault();
    let formData = new FormData();

    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("status", status);
    if (location.product) {
      formData.append("product_id", location.product.id);
      formData.append("image_name", location.product.image_url);
    }
    formData.append("file", image);
    await api
      .post("product", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then(() => {
        if (location.product) {
          alert("Atualizado realizado com sucesso!");
          history.push("/admin-panel");
        } else {
          alert("Cadastro realizado com sucesso!");
          setName("");
          setImage(null);
          setPrice(null);
          setDescription("");
          history.push("/admin-panel");
        }
      })
      .catch(() => {
        alert("Erro no cadastro!");
      });
  }

  return (
    <div id="page-product-form" className="container">
      {!location.product ? (
        <PageHeader title="Cadastro de Produtos" />
      ) : (
        <PageHeader title="Edição de Produtos" />
      )}
      <main>
        <form onSubmit={handleUploadFile}>
          <fieldset>
            <legend>Seus dados</legend>
            {image && (
              <img src={URL.createObjectURL(image)} alt="preview" id="preview_image" />
            )}
            <Dropzone
              onDrop={(files) => setImage(files[0])}
              multiple={false}
              accept="image/jpeg, image/png"
            >
              {({ getRootProps, getInputProps, acceptedFiles }) => (
                <div
                  {...getRootProps({
                    className: "dropzone",
                    onDrop: (event) => {
                      event.stopPropagation();
                    },
                  })}
                >
                  <input {...getInputProps()} />
                  <p>Selecione um arquivo ou arraste para cá.</p>
                </div>
              )}
            </Dropzone>

            <Input
              name="name"
              label="Nome"
              value={name}
              required
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <Input
              name="price"
              label="Preço"
              required
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <Select
              name="status"
              label="Status"
              required
              value={status}
              options={
                user.user.level === 0
                  ? [
                      {
                        label: "Pendente",
                        value: 0,
                      },
                      {
                        label: "Em Análise",
                        value: 1,
                      },
                      {
                        label: "Aprovado",
                        value: 2,
                      },
                      {
                        label: "Reprovado",
                        value: 3,
                      },
                    ]
                  : [
                      {
                        label: "Pendente",
                        value: 0,
                      },
                      {
                        label: "Em Análise",
                        value: 1,
                      },
                    ]
              }
              onChange={(e) => {
                setStatus(parseInt(e.target.value));
              }}
            />

            <Textarea
              name="description"
              label="Descrição"
              required
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </fieldset>

          <footer>
            <p>
              Importante <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar Cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
}

export default ProductForm;
