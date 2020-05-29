import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  // Base URL
  baseUrl: string = 'http://localhost:8000/api';


  // -----------------------
  // Add new product
  // -----------------------
  addProduct(product: Product): Observable<any> {
    const body = JSON.stringify(product);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      })
    }
    return this.http.post(`${this.baseUrl}/product`, body, httpOptions);
  }

  // -----------------------
  // Get all products
  // -----------------------
  getProducts(): Observable<any> {
    return this.http.get(`${this.baseUrl}/products`).pipe(
      map(res => res),
      catchError(err => err)
    );
  }

  // -----------------------
  // Get product by id
  // -----------------------
  getProduct(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/product/${id}`).pipe(
      map(res => res),
      catchError(err => err)
    );
  }

  // -----------------------
  // Edit product
  // -----------------------
  updateProduct(product: Product): Observable<any> {
    const body = JSON.stringify(product);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put(`${this.baseUrl}/product/${product.id}`, body, httpOptions).pipe(
      map(res => res),
      catchError(err => err)
    );
  }

  // -----------------------
  // Delete product
  // -----------------------
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/product/${id}`).pipe(
      map(res => res),
      catchError(err => err)
    );
  }
}
