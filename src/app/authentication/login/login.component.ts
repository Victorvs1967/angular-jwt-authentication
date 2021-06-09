import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorisationService } from '../authorisation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authorisationService: AuthorisationService, private router: Router) { 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {
    const value = this.loginForm.value;

    if (value.email && value.password) {
      this.authorisationService.login(value.email, value.password)
        .subscribe(() => {
          console.log('User is logged in.');
          this.router.navigateByUrl('/');
        });
        
    }
  }
}
