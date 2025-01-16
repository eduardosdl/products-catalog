import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button, Table } from "react-bootstrap";

import { Product } from "../../types/Product";
import { ProductService } from "../../service/ProductService";

import "./styles.css";

export function Home() {
  const navigation = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts() {
    const data = await ProductService.getInstance().getProducts();
    setProducts(data);
  }

  useEffect(() => {
    getProducts();
  }, []);

  async function deleteProduct(id: string) {
    try {
      await ProductService.getInstance().deleteProduct(id);
      setProducts((prevState) =>
        prevState.filter((product) => product.id !== id)
      );
    } catch {
      toast.error("Erro ao excluir produto");
    }
  }

  return (
    <div className="home-container">
      <div className="header-container">
        <h2>Produtos</h2>
        <Button
          variant="primary"
          className="add-button"
          onClick={() => navigation("/new")}
        >
          Adicionar Produto
        </Button>
      </div>
      <div className="table-container">
        <Table striped bordered hover responsive className="custom-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descricao</th>
              <th>Preco</th>
              <th>Quantidade</th>
              <th>Acoes</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => navigation(`/edit/${product.id}`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteProduct(product.id)}
                  >
                    Excluir
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
