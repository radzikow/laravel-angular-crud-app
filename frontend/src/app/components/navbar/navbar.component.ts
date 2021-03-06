import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public loggedIn: boolean;

  constructor(
    private auth: AuthService,
    private router: Router,
    private token: TokenService
  ) { }

  // ---------------------
  // Check user status
  ngOnInit(): void {
    this.auth.authStatus.subscribe(value => {
      this.loggedIn = value;
    });
  }

  // ---------------------
  // Logout user
  logout(event: MouseEvent) {
    event.preventDefault();
    // remove token form local storage
    this.token.remove();
    // change auth status and navbar links
    this.auth.changeAuthStatus(false);
    // navigate to login page
    this.router.navigateByUrl('/login');
  }
}
