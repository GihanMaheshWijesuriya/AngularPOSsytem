export class OrderDetail {
  constructor(public ordetailid: number, public itemid: number, public itemname: string, public unitprice: number
    , public qty: number, public totalprice: number) {
  }
}
