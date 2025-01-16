import axios, { AxiosInstance } from "axios";
import { Product } from "../types/Product";
import { ProductRequest } from "../types/ProductRequest";
import { PageProduct } from "../types/PageProduct";

export class ProductService {
  private static instance: ProductService;
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  public async getProducts(page: number, size: number): Promise<PageProduct> {
    const response = await this.apiClient.get("/products", {
      params: {
        page: page,
        size: size,
      },
    });
    return response.data;
  }

  public async getProduct(id: string): Promise<Product> {
    const response = await this.apiClient.get(`/products/${id}`);
    return response.data;
  }

  public async createProduct(product: ProductRequest): Promise<void> {
    await this.apiClient.post("/products", product);
  }

  public async updateProduct(
    id: string,
    product: ProductRequest
  ): Promise<void> {
    await this.apiClient.put(`/products/${id}`, product);
  }

  public async deleteProduct(id: string): Promise<void> {
    await this.apiClient.delete(`/products/${id}`);
  }
}
