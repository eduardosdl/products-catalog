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
  const [page, setPage] = useState(0);
  const [size] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  async function getProducts(page: number, size: number) {
    const data = await ProductService.getInstance().getProducts(page, size);
    setProducts(data.content);
    setTotalPages(data.totalPages);
  }

  useEffect(() => {
    getProducts(page, size);
  }, [page, size]);

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

  function handleNextPage() {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  }

  function handlePreviousPage() {
    if (page > 0) {
      setPage(page - 1);
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
        <Table striped hover responsive className="custom-table">
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
                    className="me-2"
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
      <div className="d-flex justify-content-center mt-3 gap-2">
        <Button
          variant="outline-primary"
          onClick={handlePreviousPage}
          disabled={page === 0}
        >
          Anterior
        </Button>
        <Button onClick={handleNextPage} disabled={page === totalPages - 1}>
          Próxima
        </Button>
      </div>
    </div>
  );
}
