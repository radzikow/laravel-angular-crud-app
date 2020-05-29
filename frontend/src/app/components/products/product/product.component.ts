import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  products: Product[];

  editStatus: boolean = false;

  newName: string = '';
  newDescription: string = '';
  newPrice: number = null;
  newStatus: number = null;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) { }

  public productId: number;

  public product: Product = {
    id: null,
    name: '',
    description: '',
    price: null,
    status: null
  }

  ngOnInit(): void {
    // get product id
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productId = id;

    // get product by id
    this.getProductById(this.productId);
  }

  getProductById(id: number) {
    return this.productService.getProduct(id)
      .subscribe(
        (product) => {
          this.product.id = product.product.id;
          this.product.name = product.product.name;
          this.product.description = product.product.description;
          this.product.price = product.product.price;
          this.product.status = product.product.status;
        },
        (error: Response) => console.log(error)
      );
  }

  onEdit(product: Product) {
    console.log('Start editing.');
    this.editStatus = true;

    this.newName = product.name;
    this.newDescription = product.description;
    this.newPrice = product.price;
    this.newStatus = product.status;
  }

  onUpdate() {
    const product: Product = {
      id: this.productId,
      name: this.newName,
      description: this.newDescription,
      price: this.newPrice,
      status: this.newStatus,
    }
    this.productService.updateProduct(product)
      .subscribe(
        (product) => {
          this.product = product.product;

          this.newName = '';
          this.newDescription = '';
          this.newPrice = null;
          this.newStatus = null;

          console.log('Product updated successfully');
        }

      );
    this.editStatus = false;
  }

  onCancel() {
    console.log('Cancel editing.');
    this.editStatus = false;

    this.newName = '';
    this.newDescription = '';
    this.newPrice = null;
    this.newStatus = null;
  }

  onDelete(product: Product) {
    this.productService.deleteProduct(product.id)
      .subscribe(
        (res) => {
          console.log('Product deleted.');
          console.log(res);

          alert('Product deleted.')
          this.router.navigateByUrl('/products');
        },
        (err) => console.log(err)
      );
  }

}
