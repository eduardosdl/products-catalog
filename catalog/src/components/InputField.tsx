import React from "react";
import { Form } from "react-bootstrap";

interface InputFieldProps {
  label: string;
  type: string;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function InputField({
  label,
  type,
  name,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <Form.Group controlId={`form${name}`} className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
      />
    </Form.Group>
  );
}
