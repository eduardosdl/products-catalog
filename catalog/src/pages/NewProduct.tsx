import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ProductForm } from "../components/ProductForm";

import { ProductService } from "../service/ProductService";
import { ProductRequest } from "../types/ProductRequest";

export function NewProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (product: ProductRequest) => {
    try {
      await ProductService.getInstance().createProduct(product);
      toast.success("Produto criado com sucesso!");
      navigate("/");
    } catch {
      toast.error("Erro ao criar produto");
    }
  };

  return (
    <ProductForm
      buttonLabel="Criar Produto"
      initialData={{ name: "", description: "", price: 0, stock: 0 }}
      onSubmit={handleSubmit}
    />
  );
}
