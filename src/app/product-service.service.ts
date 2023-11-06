import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  manufacturer: string;
}

@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {

  private baseUrl = 'http://localhost:1313'; // Your Spring Boot API endpoint for adding products

  constructor(private http: HttpClient) {}

  // Add a product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/products`, product);
  }

  // Fetch all categories
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories/show`);
  }

  // Fetch all manufacturers
  getAllManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(`${this.baseUrl}/manufacturers`);
  }
}

export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  manufacturer: string;
}

export interface Category {
  categoryId: number;
  name: string;
}

export interface Manufacturer {
  manufacturerId: number;
  name: string;
}