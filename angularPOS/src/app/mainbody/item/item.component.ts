import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../services/item.service";
import {Item} from "../../dto/Item";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  itemArray: Array<Item> = [];
  success: boolean = false;
  error: boolean = false;

  headElements = ['Item ID', 'Item Name', 'Item Price', 'Item Qty'];
  selectedItem: Item = new Item(0, '', 0, 0);

  constructor(private itemservice: ItemService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems() {
    this.itemservice.getAllItemData()
      .subscribe((result) => {
        this.itemArray = result;
        console.log(this.itemArray);
        this.success = false;
      }, (error1 => {
        console.log(error1);
      }))
  }

  selectTableData(el: Item) {

    this.selectedItem = Object.assign({}, el);
    console.log("selectedItemms");

    console.log(this.selectedItem);
  }

  itemClear() {
    this.selectedItem = new Item(null, '', null, null);
  }

  itemDelete() {
    this.spinner.show();
    this.itemservice.deleteItem(this.selectedItem.itemid)
      .subscribe((result) => {
        setTimeout(() => {
          this.spinner.hide();
          this.success = true;
          this.getAllItems();
          this.selectedItem = new Item(null, '', null, null);
        }, 2000);
      }, (error1 => {
        setTimeout(() => {
          this.spinner.hide();
          this.error = true;
        }, 2000);
      }));
  }

  itemUpdate(qty) {
    this.spinner.show();
    console.log("OKKKKKKK");

    console.log(this.selectedItem)
    var val = this.selectedItem;
    this.itemservice.updateItem(new Item(val.itemid, val.itemname, val.itemprice, parseInt(qty)))
      .subscribe((result) => {
        setTimeout(() => {
          this.spinner.hide();
          this.success = true;
          this.getAllItems();
        }, 2000);
      }, (error1 => {
        setTimeout(() => {
          this.spinner.hide();
          this.error = true;
        }, 2000);
      }))
  }

  itemSave(qty) {
    this.spinner.show();
    var val = this.selectedItem;
    this.itemservice.saveItem(new Item(val.itemid, val.itemname, val.itemprice, parseInt(qty)))
      .subscribe((result) => {
        setTimeout(() => {
          this.spinner.hide();
          this.success = true;
          this.getAllItems();
        }, 2000);
      }, (error1 => {
        setTimeout(() => {
          this.spinner.hide();
          this.error = true;
        }, 2000);
      }))
  }

  searchByID(value: string) {
    let idd = parseInt(value);
    for (let i = 0; i < this.itemArray.length; i++) {
      if (idd == this.itemArray[i].itemid) {
        this.selectedItem = this.itemArray[i];
      }
    }
  }

  searchByName(value: string) {
    for (let i = 0; i < this.itemArray.length; i++) {
      if (value == this.itemArray[i].itemname) {
        this.selectedItem = this.itemArray[i];
      }
    }
  }
}
