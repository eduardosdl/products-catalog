import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { InputField } from "../InputField";
import { ProductRequest } from "../../types/ProductRequest";
import { toast } from "react-toastify";

import "./styles.css";

interface ProductFormProps {
  buttonLabel: string;
  onSubmit: (product: ProductRequest) => void;
  initialData: ProductRequest;
}

export function ProductForm({
  buttonLabel,
  onSubmit,
  initialData,
}: ProductFormProps) {
  const [name, setName] = useState<string>(initialData.name);
  const [description, setDescription] = useState<string>(
    initialData.description
  );
  const [price, setPrice] = useState<number>(initialData.price);
  const [stock, setStock] = useState<number>(initialData.stock);

  useEffect(() => {
    setName(initialData.name);
    setDescription(initialData.description);
    setPrice(initialData.price);
    setStock(initialData.stock);
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (price <= 0) {
      toast.error("O preço deve ser maior que 0.");
      return;
    }
    onSubmit({ name, description, price, stock });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">{buttonLabel}</h2>
      <Form onSubmit={handleSubmit} className="custom-form">
        <InputField
          label="Nome"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <InputField
          label="Descrição"
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <InputField
          label="Preço"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(parseFloat(e.target.value))}
          required
        />
        <InputField
          label="Quantidade"
          type="number"
          name="stock"
          value={stock}
          onChange={(e) => setStock(parseInt(e.target.value))}
          required
        />
        <Button variant="primary" type="submit" className="submit-button">
          {buttonLabel}
        </Button>
      </Form>
    </div>
  );
}
