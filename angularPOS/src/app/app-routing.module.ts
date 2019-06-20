import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {MainbodyComponent} from "./mainbody/mainbody.component";
import {DashboardComponent} from "./mainbody/dashboard/dashboard.component";
import {CustomerComponent} from "./mainbody/customer/customer.component";
import {ItemComponent} from "./mainbody/item/item.component";
import {OrderComponent} from "./mainbody/order/order.component";

const routes: Routes = [
  {path: '', redirectTo: '/main', pathMatch: 'full'},
  {
    path: 'main', component: MainbodyComponent, children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'customer', component: CustomerComponent},
      {path: 'item', component: ItemComponent},
      {path: 'order', component: OrderComponent},
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule {
}

