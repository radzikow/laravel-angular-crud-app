import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-list-public',
  templateUrl: './product-list-public.component.html',
  styleUrls: ['./product-list-public.component.scss']
})
export class ProductListPublicComponent implements OnInit {

  products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    return this.productService.getProducts()
      .subscribe(
        (products) => {
          this.products = products.products
        },
        (err) => console.log(err)
      );
  }


}
