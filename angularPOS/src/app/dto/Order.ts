export class Order {
  constructor(public orderid: number, public orderdate: string, public ordertime: string,
              public ordetailid: number, public cusid: number, public totalprice: number) {
  }
}
