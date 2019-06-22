import {Component, OnInit, ViewChild} from '@angular/core';
import {NgxSpinnerService} from "ngx-spinner";
import {CustomerService} from "../../services/customer.service";
import {Customer} from "../../dto/Customer";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  hidepane: boolean;
  customerArray: Array<Customer> = [];
  success: boolean = false;
  error: boolean = false;

  headElements = ['Customer ID', 'First Name', 'Last Name', 'Customer Email', 'Customer Tel'];
  selectedCustomer: Customer = new Customer(null, '', '', '', '', '');
  // @ViewChild('txtId') txtId: ElementRef;
  @ViewChild('frmCustomer') frmCustomer: NgForm;

  constructor(private spinner: NgxSpinnerService, private customerservice: CustomerService) {
    this.hidepane = true;
    this.getAllCustomerData();
  }

  ngOnInit() {
  }

  showsigninpane() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    this.hidepane = false;

  }

  showsignuppane() {
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 2000);
    this.hidepane = true;
  }

  getAllCustomerData() {
    this.customerservice.getAllCustomerData()
      .subscribe((result) => {
        this.customerArray = result;
      }, (error1 => {
        console.log(error1);
      }))
  }

  saveCustomer() {
    this.spinner.show();
    this.customerservice.saveCustomer(this.selectedCustomer)
      .subscribe((result) => {
        setTimeout(() => {
          this.spinner.hide();
          this.success = true;
          this.getAllCustomerData();
        }, 2000);
      }, (error1 => {
        setTimeout(() => {
          this.spinner.hide();
          this.error = true;
        }, 2000);
      }))
  }
}
