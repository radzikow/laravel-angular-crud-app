<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
  'middleware' => 'api',
], function ($router) {

  // Login user
  Route::post('login', 'AuthController@login');

  // Add a new user
  Route::post('register', 'AuthController@register');

  // Logout user
  Route::post('logout', 'AuthController@logout');

  // Refresh token
  Route::post('refresh', 'AuthController@refresh');

  // Get authenticated user
  Route::post('me', 'AuthController@me');
});

// Add a new product
Route::post('/product', 'ProductController@postProduct')->middleware('api');

// Get all products
Route::get('/products', 'ProductController@getProducts');

// Get product
Route::get('/product/{id}', 'ProductController@getProduct');

// Edit product
Route::put('/product/{id}', 'ProductController@putProduct')->middleware('api');

// Delete product
Route::delete('/product/{id}', 'ProductController@deleteProduct')->middleware('api');
