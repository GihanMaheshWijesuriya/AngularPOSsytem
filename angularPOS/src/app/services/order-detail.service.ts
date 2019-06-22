import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {SuperServiceService} from "./super-service.service";
import {OrderDetail} from "../dto/OrderDetail";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  super = new SuperServiceService();

  constructor(private http: HttpClient) {
  }


  saveOrderDetail(orderDetailArray: Array<OrderDetail>) {
    return this.http.post(this.super.getBaseUrl() + '/orderdetails', orderDetailArray);
  }
}
