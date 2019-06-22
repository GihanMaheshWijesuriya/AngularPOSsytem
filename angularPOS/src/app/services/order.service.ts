import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SuperServiceService} from "./super-service.service";
import {Order} from "../dto/Order";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  super = new SuperServiceService();

  constructor(private http: HttpClient) {
  }

  saveOrder(orderobj: Order) {
    return this.http.post(this.super.getBaseUrl() + '/orders', orderobj)
  }
}
