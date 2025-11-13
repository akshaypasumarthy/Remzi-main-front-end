import { Component } from '@angular/core';
import { FormBuilder,FormGroup,Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminService } from '../admin-service';
import { Router } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-admin-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLogin {

  
  allReviews: Customer[] = [];
  mode: 'login' | 'register' = 'login';
  loginForm: FormGroup;
  registerForm: FormGroup;
  message = '';

 
  
  constructor(private fb: FormBuilder, private adminService: AdminService,private router:Router) {
    this.loginForm = this.fb.group({
      email_address: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      password: ['', Validators.required]
    });


  }
    switchMode(mode: 'login' | 'register') {
    this.mode = mode;
    this.message = '';
  }
  

  onSubmit() {
    if (this.mode === 'login' && this.loginForm.valid) {
      this.adminService.loginAdmin(this.loginForm.value.email_address,
        this.loginForm.value.password
      ).subscribe({
        next: res => {this.message = '✅ Login successful!';
          this.router.navigate(['/admin-home'])
        },
        error: err => this.message = '❌ Login failed. Please check credentials.'
      });
    } 
     if (this.mode === 'register' && this.registerForm.valid) {
      this.adminService.registerAdmin(this.registerForm.value.full_name,
        this.registerForm.value.email_address,
        this.registerForm.value.phone_number,
        this.registerForm.value.password
      ).subscribe({
        next: res => this.message = '✅ Registration successful!',
        error: err => this.message = '❌ Registration failed. Please try again.'
      });
    }
  }


}
