import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../dto/Item";
import {OrderDetail} from "../../dto/OrderDetail";
import {NgForm} from "@angular/forms";
import {OrderDetailService} from "../../services/order-detail.service";
import {OrderService} from "../../services/order.service";
import {Order} from "../../dto/Order";
import {Customer} from "../../dto/Customer";
import {CustomerService} from "../../services/customer.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  headElements = ['Item ID', 'Item Name', 'Unit Price', 'Qty', 'Total Price'];
  orderDetailArray: Array<OrderDetail> = [];
  itemArray: Array<Item> = [];
  cusArray: Array<Customer> = [];
  selectedOrderDetail = new OrderDetail(null, null, '', null, null, null);
  @ViewChild('frmCustomer') frmCustomer: NgForm;

  constructor(private customerservice: CustomerService, private itemservice: ItemService, private orderdetailservice: OrderDetailService, private orderservice: OrderService) {
  }

  ngOnInit() {
    this.getAllItem();
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.customerservice.getAllCustomerData()
      .subscribe((result) => {
        this.cusArray = result;
      }, (error1 => {
        console.log(error1);
      }))
  }
  getAllItem() {
    this.itemservice.getAllItemData()
      .subscribe((result) => {
        this.itemArray = result;
      }, (error1 => {
        console.log(error1);
      }))
  }


  selectValues(event: any) {
    let names = event.target.value;
    for (let i = 0; i < this.itemArray.length; i++) {
      if (names == this.itemArray[i].itemname) {
        this.selectedOrderDetail = new OrderDetail(null, this.itemArray[i].itemid, this.itemArray[i].itemname,
          this.itemArray[i].itemprice, 0, 0);
      }
    }
  }

  addData() {
    this.orderDetailArray.push(this.selectedOrderDetail);
  }

  changeTotal(value: string) {
    let qty = parseInt(value);
    let totprice = qty * this.selectedOrderDetail.unitprice;
    this.selectedOrderDetail.totalprice = totprice;
  }

  clearData() {
    this.orderDetailArray = [];
    this.selectedOrderDetail = new OrderDetail(null, null, '',
      null, null, null);
  }

  saveOrder() {
    this.orderdetailservice.saveOrderDetail(this.orderDetailArray)
      .subscribe((result) => {
      }, error1 => {
        console.log(error1)
      })
    let ordetailid = this.orderDetailArray.length + 1;
    let cusid = this.cusArray.length + 1;
    let totPrice = 0;
    for (let u = 0; u < this.orderDetailArray.length; u++) {
      totPrice += this.orderDetailArray[u].totalprice;
    }

    let orderobj = new Order(null, new Date().toLocaleDateString(), new Date().toTimeString().substring(0, 8),
      ordetailid, 1, totPrice);
    this.orderservice.saveOrder(orderobj)
      .subscribe((result) => {
        alert('Order Added Successfully');
      }, (error1 => {
        console.log(error1);
      }))
  }
}
