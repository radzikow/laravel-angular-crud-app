<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
  /**
   * Create a new AuthController instance.
   *
   * @return void
   */
  public function __construct()
  {
    $this->middleware('auth:api', ['except' => ['login', 'register']]);
  }

  // -----------------------
  // Login user (returns token)
  // -----------------------
  // @return \Illuminate\Http\JsonResponse
  public function login(Request $request)
  {
    // Validate user credentials
    $request->validate([
      'email' => 'required|email',
      'password' => 'required',
    ]);

    // Get user credentials
    $credentials = request(['email', 'password']);

    // Generate a token for the user if the credentials are valid
    if (!$token = auth()->attempt($credentials)) {
      return response()->json(['error' => 'Error occured! Invalid e-mail or password.'], 401);
    }

    // Return token
    return $this->respondWithToken($token);
  }

  // -----------------------
  // Register a new user
  // -----------------------
  public function register(Request $request)
  {
    // Validate user data
    $request->validate([
      'firstname' => 'required',
      'lastname' => 'required',
      'email' => 'required|email|unique:users',
      'password' => 'required|min:3',
    ]);

    // Create new user
    $user = new User([
      'firstname' => $request->input('firstname'),
      'lastname' => $request->input('lastname'),
      'email' => $request->input('email'),
      'password' => $request->input('password'),
    ]);

    // Add new user to db
    $user->save();

    // Login user and return token
    return $this->login($request);
  }

  // -----------------------
  // Show authenticated user
  // -----------------------
  // @return \Illuminate\Http\JsonResponse
  public function me()
  {
    // Return authenticated user
    return response()->json(auth()->user());
  }

  // -----------------------
  // Logout user (invalidate the token)
  // -----------------------
  // @return \Illuminate\Http\JsonResponse
  public function logout()
  {
    auth()->logout();

    // Return message
    return response()->json(['message' => 'User logged out successfully.'], 201);
  }

  // -----------------------
  // Refresh a token
  // -----------------------
  // @return \Illuminate\Http\JsonResponse
  public function refresh()
  {
    return $this->respondWithToken(auth()->refresh());
  }

  // -----------------------
  // Get the token array structure
  // -----------------------
  // @param  string $token
  // @return \Illuminate\Http\JsonResponse
  protected function respondWithToken($token)
  {
    return response()->json([
      // return token
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60,
      // return user data
      'user' => auth()->user(),
      // return message
      'message' => 'User logged in with token successfully.'
    ], 201);
  }
}
