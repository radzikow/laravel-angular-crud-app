import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    // Get all products
    // this.onGetProducts();
  }

  onGetProducts() {
    return this.productService.getProducts()
      .subscribe(
        (products) => {
          this.products = products.products
        },
        (err) => console.log(err)
      );
  }

  onSelect(product: Product) {
    this.router.navigate(['/products', product.id]);
  }

  onDelete(product: Product) {
    this.productService.deleteProduct(product.id)
      .subscribe(
        (res) => {
          console.log('Product deleted.');
          console.log(res);

          const position = this.products.findIndex(
            // Get the index of the first element in the array that has same id
            (deletedProduct: Product) => {
              return deletedProduct.id == product.id;
            }
          );
          // Remove element on specified position
          this.products.splice(position, 1);
          alert('Product deleted.')
        },
        (err) => console.log(err)
      );
  }
}
