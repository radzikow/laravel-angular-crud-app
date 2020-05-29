<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
  // -----------------------
  // Add a new product
  // -----------------------
  public function postProduct(Request $request)
  {
    $user = auth()->user();

    $product = new Product();

    $product->name = $request->input('name');
    $product->description = $request->input('description');
    $product->price = $request->input('price');

    $product->status = $request->input('status');

    // Save new product in db
    $product->save();

    // http status: 201 Created
    return response()->json(['product' => $product, 'user' => $user], 201);
  }

  // -----------------------
  // Get all products
  // -----------------------
  public function getProducts()
  {
    $products = Product::all();

    // http status: 200 OK
    return response()->json(['products' => $products], 200);
  }

  // -----------------------
  // Get product by id
  // -----------------------
  public function getProduct(Request $request, $id)
  {
    $product = Product::find($id);

    // http status: 200 OK
    return response()->json(['product' => $product], 200);
  }

  // -----------------------
  // Edit product
  // -----------------------
  public function putProduct(Request $request, $id)
  {
    $product = Product::find($id);

    if (!$product) {
      // http status: 404 Not Found
      return response()->json(['message' => 'Product not found', 404]);
    }

    $product->name = $request->input('name');
    $product->description = $request->input('description');
    $product->price = $request->input('price');
    $product->status = $request->input('status');

    // Update product in db
    $product->save();

    // http status: 200 OK
    return response()->json(['product' => $product], 200);
  }

  // -----------------------
  // Delete product
  // -----------------------
  public function deleteProduct($id)
  {
    $product = Product::find($id);
    $product->delete();

    // http status: 200 OK
    return response()->json(['message' => 'Product deleted.'], 200);
  }
}
