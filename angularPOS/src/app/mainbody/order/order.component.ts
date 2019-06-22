import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../dto/Item";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  elements: any = [
    {id: 1, first: 'Mark', last: 'Otto', handle: '@mdo'},
    {id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat'},
    {id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter'},
  ];

  headElements = ['Orderdtl ID', 'Item ID', 'Item Name', 'Unit Price', 'Qty', 'Total Price'];

  itemArray: Array<Item> = [];

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

}
