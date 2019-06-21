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
}
