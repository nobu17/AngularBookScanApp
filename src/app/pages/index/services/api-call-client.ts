import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BookPrice } from '../../../models/books/bppkprice';

@Injectable()
export class ApiCallClient {
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    responseType: 'json',
    body: null
  };
  constructor(private http: HttpClient) {}

  public async getJsonAsync(url: string): Promise<any> {
    const result = await this.http.get(url, this.httpOptions).toPromise();
    console.log('res', result);
    const res = result as any;
    return res.data;
  }

  public async getBookInfoAsync(url: string, storeName: string) {
    const bookPrice = new BookPrice();
    bookPrice.storeName = storeName;
    bookPrice.isSoldOut = true;

    try {
      const obj = await this.getJsonAsync(url);
      if (obj) {
        if (obj) {
          const apiObj = obj.book;
          bookPrice.price = apiObj.price;
          bookPrice.shipping = apiObj.shipping;
          bookPrice.linkUrl = apiObj.linkUrl;
          bookPrice.isSoldOut = apiObj.isSoldOut;
          bookPrice.isError = apiObj.isError;
        }
      }
    } catch (err) {
      console.error('error:', err);
      bookPrice.isError = true;
    }
    return bookPrice;
  }
}
