import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RequestResetComponent } from './components/password/request-reset/request-reset.component';
import { ResponseResetComponent } from './components/password/response-reset/response-reset.component';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { NewProductComponent } from './components/products/new-product/new-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { ProductComponent } from './components/products/product/product.component';
import { ProductListPublicComponent } from './components/products/product-list-public/product-list-public.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'request-reset-password', component: RequestResetComponent },
  { path: 'response-reset-password', component: ResponseResetComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductComponent },
  { path: 'new-product', component: NewProductComponent },
  { path: 'edit-product', component: EditProductComponent },
  { path: 'products-public', component: ProductListPublicComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
