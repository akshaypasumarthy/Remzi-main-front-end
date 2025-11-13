import { Component,OnInit } from '@angular/core';
import { AdminService } from '../admin-service';
import { Customer } from '../customer.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-view',
  imports: [CommonModule],
  
  templateUrl: './admin-view.html',
  styleUrl: './admin-view.css'
})
export class AdminView {

  
  allReviews: Customer[] = [];
  constructor (private adminService:AdminService){}
     ngOnInit(): void {
  
      this.all_reviews();
    }

    all_reviews(){
    this.adminService.get_all_reviews().subscribe({
      next:(reviews)=>{
        this.allReviews = reviews
        console.log(this.allReviews)
      }
    })
  }
}
