import { Injectable } from '@angular/core';
import { decode } from 'punycode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private iss = {
    login: 'http://localhost:8000/api/login',
    register: 'http://localhost:8000/api/register'
  }

  handle(token) {
    this.set(token);
  }

  // ---------------------
  // Save token to localStorage
  // -----------------------
  set(token) {
    localStorage.setItem('token', token);
  }

  // -----------------------
  // Get token from localStorage
  // -----------------------
  get(): string {
    return localStorage.getItem('token');
  }

  // ---------------------
  // Remove token from localStorage
  // -----------------------
  remove() {
    localStorage.removeItem('token');
  }

  // ---------------------
  // Check if token is valid/if user is logged in
  // -----------------------
  isValid(): boolean {
    const token: string = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
      }
    }
    return false;
  }

  // ---------------------
  // Get token payload
  // -----------------------
  payload(token: string) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  // ---------------------
  // Decode token payload
  // -----------------------
  decode(payload) {
    // atob method - decode base-64 encoded string
    return JSON.parse(atob(payload));
  }

  // ---------------------
  // Check if user is logged in
  // -----------------------
  loggedIn(): boolean {
    return this.isValid();
  }
}
