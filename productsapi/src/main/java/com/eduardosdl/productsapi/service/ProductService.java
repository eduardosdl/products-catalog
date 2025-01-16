package com.eduardosdl.productsapi.service;

import com.eduardosdl.productsapi.dto.ProductRequestDTO;
import com.eduardosdl.productsapi.model.Product;
import com.eduardosdl.productsapi.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository repository;

    public Page<Product> getAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return repository.findAll(pageable);
    }

    public Product getById(UUID id) {
        return repository.findById(id).orElseThrow(() -> new EntityNotFoundException("Product not found"));
    }

    public Product create(ProductRequestDTO product) {
        try {
            Product newProduct = new Product(product);

            this.validateProductPrice(newProduct.getPrice());

            return repository.save(newProduct);
        } catch (IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error creating product");
        }
    }

    public Product update(UUID id, ProductRequestDTO product) {
        try {
            Product updatedProduct = this.getById(id);

            updatedProduct.update(product);

            this.validateProductPrice(updatedProduct.getPrice());

            return repository.save(updatedProduct);
        } catch (EntityNotFoundException | IllegalArgumentException e) {
            throw e;
        } catch (Exception e) {
            throw new RuntimeException("Error updating product");
        }
    }

    public void delete(UUID id) {
        try {
            repository.findById(id).ifPresent(repository::delete);
        } catch (Exception e) {
            throw new RuntimeException("Error deleting product");
        }
    }

    private void validateProductPrice(Double price) {
        if (price <= 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }
    }

}