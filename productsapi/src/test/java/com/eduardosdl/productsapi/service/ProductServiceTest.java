package com.eduardosdl.productsapi.service;

import com.eduardosdl.productsapi.dto.ProductRequestDTO;
import com.eduardosdl.productsapi.model.Product;
import com.eduardosdl.productsapi.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

class ProductServiceTest {
    @Mock
    private ProductRepository repository;

    @Autowired
    @InjectMocks
    private ProductService service;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    @DisplayName("Should return all products")
    void getAll() {
        Product product = new Product();
        Product product2 = new Product();

        when(repository.findAll()).thenReturn(Arrays.asList(product, product2));

        var products = service.getAll();

        assertEquals(2, products.size());
    }

    @Test
    @DisplayName("Should return a product by id")
    void getById() {
        ProductRequestDTO productData = new ProductRequestDTO("product", "description", 10.0, 1);
        Product product = new Product(productData);

        when(repository.findById(product.getId())).thenReturn(java.util.Optional.of(product));

        var productFound = service.getById(product.getId());

        assertEquals(product, productFound);
    }

    @Test
    @DisplayName("Should return a error if product not found")
    void getByIdWhenIdIsInvalid() {
        UUID id = UUID.randomUUID();

        when(repository.findById(id)).thenReturn(java.util.Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> service.getById(id));
    }

    @Test
    @DisplayName("Should create a product")
    void create() {
        ProductRequestDTO productData = new ProductRequestDTO("product", "description", 10.0, 1);
        Product product = new Product(productData);

        when(repository.save(any(Product.class))).thenReturn(product);

        var productCreated = service.create(productData);

        assertEquals(product, productCreated);
    }

    @Test
    @DisplayName("Should return a error if product price is invalid")
    void createWhenPriceIsInvalid() {
        ProductRequestDTO productData = new ProductRequestDTO("product", "description", 0.0, 1);

        assertThrows(IllegalArgumentException.class, () -> service.create(productData));
    }

    @Test
    @DisplayName("Should return a product by id to update")
    void update() {
        ProductRequestDTO productData = new ProductRequestDTO("product", "description", 10.0, 1);
        Product product = new Product(productData);

        when(repository.findById(product.getId())).thenReturn(java.util.Optional.of(product));
        when(repository.save(any(Product.class))).thenReturn(product);

        var productUpdated = service.update(product.getId(), productData);

        assertEquals(product, productUpdated);
    }

    @Test
    @DisplayName("Should return a error if product not found to update")
    void updateWhenIdIsInvalid() {
        UUID id = UUID.randomUUID();
        ProductRequestDTO productData = new ProductRequestDTO("product", "description", 10.0, 1);

        when(repository.findById(id)).thenReturn(java.util.Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> service.update(id, productData));
    }

    @Test
    @DisplayName("Should return a error if product price is invalid to update")
    void updateWhenPriceIsInvalid() {
        ProductRequestDTO productData = new ProductRequestDTO("product", "description", 0.0, 1);
        Product product = new Product(productData);

        when(repository.findById(product.getId())).thenReturn(java.util.Optional.of(product));

        assertThrows(IllegalArgumentException.class, () -> service.update(product.getId(), productData));
    }

    @Test
    @DisplayName("Should return success to delete product")
    void delete() {
        UUID id = UUID.randomUUID();

        when(repository.findById(id)).thenReturn(java.util.Optional.of(new Product()));

        assertDoesNotThrow(() -> service.delete(id));
    }

    @Test
    @DisplayName("Should return success to delete product")
    void deleteWhenIdIsInvalid() {
        UUID id = UUID.randomUUID();

        when(repository.findById(id)).thenReturn(java.util.Optional.empty());

        assertDoesNotThrow(() -> service.delete(id));
    }
}