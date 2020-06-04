import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let product: Product = {
      id: null,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      status: (form.value.status == '1') ? 1 : 0
    }
    this.productService.addProduct(product)
      .subscribe(
        () => alert('Product created.')
      );
      // clear form
    form.resetForm();
  }
}
