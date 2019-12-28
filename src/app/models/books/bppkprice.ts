export class BookPrice {
  constructor() {
    this.isError = false;
    this.isSoldOut = true;
  }
  public storeName: string;
  public price: number;
  public shipping: number;
  public linkUrl: string;
  public isSoldOut: boolean;
  public isError: boolean;
}
