import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product';
import { NgForm } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let product: Product = {
      id: null,
      name: form.value.name,
      description: form.value.description,
      price: form.value.price,
      status: form.value.status
    }
    this.productService.addProduct(product)
      .subscribe(
        () => alert('Product created.')
      );
    form.resetForm();
  }

}
