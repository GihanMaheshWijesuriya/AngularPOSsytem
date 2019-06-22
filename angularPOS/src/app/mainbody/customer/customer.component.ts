import {Component, OnInit} from '@angular/core';
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../dto/Customer";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  customerArray: Array<Customer> = [];
  headElements = ['Customer ID', 'First Name', 'Last Name', 'Customer Email', 'Customer Tel'];
  selectedCustomer: Customer = new Customer(0, '', '', '', '', '');

  success: boolean = false;
  error: boolean = false;

  constructor(private customerservice: CustomerService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.getAllCustomerData();
  }

  getAllCustomerData() {
    this.customerservice.getAllCustomerData()
      .subscribe((result) => {
        this.customerArray = result;
        setTimeout(() => {
          this.success = false;
        }, 1000);
      }, (error1 => {
        console.log(error1);
      }))
  }

  selectTableData(el: Customer) {
    this.selectedCustomer = Object.assign({}, el);
  }

  clearCustomer() {
    this.selectedCustomer = new Customer(0, '', '', '', '', '');
  }

  deleteCustomer() {
    this.spinner.show();
    this.customerservice.deletecustomer(this.selectedCustomer.cusid)
      .subscribe((result) => {
        setTimeout(() => {
          this.spinner.hide();
          this.success = true;
          this.getAllCustomerData();
          this.selectedCustomer = new Customer(0, '', '', '', '', '');
        }, 2000);
      }, (error1 => {
        setTimeout(() => {
          this.spinner.hide();
          this.error = true;
        }, 2000);
      }))
  }

  updateCustomer() {
    this.spinner.show();
    console.log(this.selectedCustomer);
    this.customerservice.updateCustomer(this.selectedCustomer)
      .subscribe((result) => {
        setTimeout(() => {
          this.spinner.hide();
          this.success = true;
          this.getAllCustomerData();
        }, 2000);
      }, (error1 => {
        console.log(error1);
        setTimeout(() => {
          this.spinner.hide();
          this.error = true;
        }, 2000);
      }))
  }

  searchByID(value: string) {
    let id = parseInt(value);
    for (let i = 0; i < this.customerArray.length; i++) {
      if (id == this.customerArray[i].cusid) {
        this.selectedCustomer = this.customerArray[i];
      }
    }
  }

  searchByEmail(value: string) {
    for (let i = 0; i < this.customerArray.length; i++) {
      if (value == this.customerArray[i].cusemail) {
        this.selectedCustomer = this.customerArray[i];
      }
    }
  }
}
