import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  }

  public error = null;

  constructor(
    private token: TokenService,
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  onLogin(form: NgForm) {
    const user = {
      email: form.value.email,
      password: form.value.password
    }
    this.auth.login(user).subscribe(
      res => this.handleResponse(res),
      err => this.handleError(err)
    );
  }

  handleResponse(res) {
    console.log(res);
    this.token.handle(res.access_token);
    this.auth.changeAuthStatus(true);
    this.router.navigateByUrl('/profile');
  }

  handleError(err) {
    this.error = err.error.error;
  }
}
