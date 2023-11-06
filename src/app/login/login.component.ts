import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../login-service.service';
import { Router } from '@angular/router';
import { from } from 'rxjs'; // Import the 'from' operator

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  errorMessage: string = ''; // Initialize it with an empty string

  constructor(private loginService: LoginServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  loginUser() {
    this.loginService.login(this.username, this.password)
      .then((response) => {
        if (response.authenticated) {
          // Successful login; navigate to the home page
          this.router.navigate(['/home']);
        } else {
          // Handle authentication failure
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      })
      .catch((error) => {
        console.error('Error during login:', error);
        this.errorMessage = 'An error occurred during login. Please try again later.';
      });
  }

}
