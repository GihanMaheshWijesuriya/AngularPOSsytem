import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SuperServiceService} from "./super-service.service";
import {Customer} from "../dto/Customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  super = new SuperServiceService();

  constructor(private http: HttpClient) {
  }

  getAllCustomerData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/customers');
  }

  saveCustomer(selectedCustomer: Customer) {
    return this.http.post(this.super.getBaseUrl() + '/customers', selectedCustomer);
  }

  deletecustomer(cusid: number) {
    return this.http.delete(this.super.getBaseUrl() + '/customers?cusid=' + cusid);
  }

  updateCustomer(selectedCustomer: Customer) {
    return this.http.put(this.super.getBaseUrl() + '/customers', selectedCustomer);
  }
}
