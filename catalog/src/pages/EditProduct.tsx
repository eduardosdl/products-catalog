import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ProductService } from "../service/ProductService";
import { toast } from "react-toastify";

import { ProductForm } from "../components/ProductForm";
import { ProductRequest } from "../types/ProductRequest";

export function EditProduct() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (!id) {
      toast.error("ID do produto não fornecido ou inválido");
      navigate("/");
      return;
    }

    async function fetchProduct() {
      try {
        const data = await ProductService.getInstance().getProduct(
          id as string
        );
        setInitialData(data);
      } catch {
        toast.error("Erro ao buscar produto");
      }
    }

    fetchProduct();
  }, [id, navigate]);

  const handleSubmit = async (product: ProductRequest) => {
    try {
      await ProductService.getInstance().updateProduct(id as string, product);
      toast.success("Produto atualizado com sucesso!");
      navigate("/");
    } catch {
      toast.error("Erro ao atualizar produto");
    }
  };

  return (
    <ProductForm
      buttonLabel="Atualizar Produto"
      initialData={initialData}
      onSubmit={handleSubmit}
    />
  );
}
