package com.eduardosdl.productsapi.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductRequestDTO(
        @NotBlank String name,
        @NotBlank String description,
        @NotNull Double price,
        @NotNull Integer stock
) {
}