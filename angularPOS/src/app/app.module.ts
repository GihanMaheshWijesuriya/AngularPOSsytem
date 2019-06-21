import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {MainbodyComponent} from './mainbody/mainbody.component';
import {FooterbarComponent} from './footerbar/footerbar.component';
import {DashboardComponent} from './mainbody/dashboard/dashboard.component';
import {CustomerComponent} from './mainbody/customer/customer.component';
import {ItemComponent} from './mainbody/item/item.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppRoutingModule} from "./app-routing.module";
import {OrderComponent} from './mainbody/order/order.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    MainbodyComponent,
    FooterbarComponent,
    DashboardComponent,
    CustomerComponent,
    ItemComponent,
    OrderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
