import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // form data
  public form = {
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    password_confirmation: null
  }

  // errors
  public error = [
    { firstname: [] },
    { lastname: [] },
    { email: [] },
    { password: [] }
  ];

  constructor(
    private auth: AuthService,
    private token: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onRegister(form: NgForm) {
    const newUser = {
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      password: form.value.password
    }
    this.auth.register(newUser).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(res) {
    this.token.handle(res.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(err) {
    this.error = err.error.errors;
  }

}
