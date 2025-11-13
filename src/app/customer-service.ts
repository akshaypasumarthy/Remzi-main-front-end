import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Customer } from './customer.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

   baseUrl : String = "http://127.0.0.1:5000/api/"

  constructor(private httpClient : HttpClient) { }
  
    public addCustomerReview(full_name:any,email_address:any,phone_number:any,review:any,rating:any){
    return this.httpClient.post<Customer>(this.baseUrl+"create_review",{full_name,email_address,phone_number,review,rating})
    .pipe(map((Customer:any) =>{
      return Customer;
    }));
  }

  public get_all_positive_reviews(){
    return this.httpClient.get<any>(this.baseUrl+"positive_reviews").pipe(map((res:any)=>{
      return res.users
    }))
  }

}
