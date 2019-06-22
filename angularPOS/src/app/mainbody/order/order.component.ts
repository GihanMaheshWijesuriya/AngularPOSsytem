import {Component, OnInit, ViewChild} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../dto/Item";
import {OrderDetail} from "../../dto/OrderDetail";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  headElements = ['Item ID', 'Item Name', 'Unit Price', 'Qty', 'Total Price'];
  orderDetailArray: Array<OrderDetail> = [];
  itemArray: Array<Item> = [];
  selectedOrderDetail = new OrderDetail(null, null, '', null, null, null);
  @ViewChild('frmCustomer') frmCustomer: NgForm;
  constructor(private itemservice: ItemService) {
  }

  ngOnInit() {
    this.getAllItem();
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
}
