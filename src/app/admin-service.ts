import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Admin } from './admin.model';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl : String = "http://127.0.0.1:5000/api/"

  
  constructor(private httpClient : HttpClient) { }

  public registerAdmin(full_name:any,email_address:any,phone_number:any,password:any){
    return this.httpClient.post<Admin>(this.baseUrl+"admin",{full_name,email_address,phone_number,password})
    .pipe(map((Admin:any)=>{
      return Admin;
    }));
  }

  public loginAdmin(email_address:any,password:any){
    return this.httpClient.post<Admin>(this.baseUrl+"admin_login",{email_address,password})
    .pipe(map(response => response));
  }

    public get_all_reviews(){
    return this.httpClient.get<any>(this.baseUrl+"all_reviews").pipe(map((res:any)=>{
      return res.users
    }))
  }
  
}
