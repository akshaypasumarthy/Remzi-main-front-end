import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators ,ReactiveFormsModule} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer-service';
import { first  } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customer-review',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './customer-review.html',
  styleUrl: './customer-review.css',
  standalone:true
})
export class CustomerReviewComponent implements OnInit {
  ngOnInit(): void {
  }

  customerReviewForm: FormGroup;

    constructor(
    private fb: FormBuilder,
    private router: Router,
    private customerService: CustomerService
  ) {
    this.customerReviewForm = this.fb.group({
      full_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      review: ['', Validators.required],
      rating : ['',[Validators.required,Validators.min(1),Validators.max(5),Validators.pattern('[0-9]')]],
    });
  }


  postdata() {
    console.log(this.customerReviewForm.value)
    if (this.customerReviewForm.valid) {
        this.customerService
          .addCustomerReview(
            this.customerReviewForm.value.full_name,
            this.customerReviewForm.value.email_address,
            this.customerReviewForm.value.phone_number,
            this.customerReviewForm.value.review,
            this.customerReviewForm.value.rating
          )
          .pipe(first())
          .subscribe((data:any) => {
            this.router.navigate(['']);
          });
      
     
    }
  }
}
