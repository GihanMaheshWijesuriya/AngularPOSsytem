import {Injectable} from '@angular/core';
import {SuperServiceService} from "./super-service.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../dto/Item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  super = new SuperServiceService();

  constructor(private http: HttpClient) {
  }

  getAllItemData(): Observable<any> {
    return this.http.get(this.super.getBaseUrl() + '/items');
  }

  deleteItem(itemid: number) {
    return this.http.delete(this.super.getBaseUrl() + '/items?itemid=' + itemid);
  }

  updateItem(selectedItem: Item) {
    console.log(selectedItem);
    return this.http.put(this.super.getBaseUrl() + '/items', selectedItem);
  }

  saveItem(selectedItem: Item) {
    return this.http.post(this.super.getBaseUrl() + '/items', selectedItem);
  }
}
