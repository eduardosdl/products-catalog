package com.eduardosdl.productsapi.model;

import com.eduardosdl.productsapi.dto.ProductRequestDTO;
import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String description;

    private Double price;

    private Integer stock;

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Product() {
    }

    public Product(UUID id, String name, String description, Double price, Integer stock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
    }

    public Product(ProductRequestDTO productData) {
        this.name = productData.name();
        this.description = productData.description();
        this.price = productData.price();
        this.stock = productData.stock();
    }

    public void update(ProductRequestDTO productData) {
        this.name = productData.name();
        this.description = productData.description();
        this.price = productData.price();
        this.stock = productData.stock();
    }
}