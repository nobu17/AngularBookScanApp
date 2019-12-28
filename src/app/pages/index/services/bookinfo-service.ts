import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookInfo } from '../../../models/books/bookInfo';
import { IsbnConverter } from '../../../util/isbn-converter';

@Injectable()
export class BookInfoService {
  private urlbase = 'https://api.openbd.jp/v1/get?isbn=';
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: null
  };
  constructor(private http: HttpClient) {}

  public async getBookIfnoAsync(isbn13: string): Promise<BookInfo> {
    const bookinfo = new BookInfo();
    bookinfo.isbn13 = isbn13;

    try {
      // console.log('isbn13:', isbn13);
      const result = await this.http
        .get(this.urlbase + isbn13, this.httpOptions)
        .toPromise();

      console.log('res', result);

      // get amazon link
      bookinfo.prdouctLink =
        'https://www.amazon.co.jp/dp/' + IsbnConverter.getIsbn10(isbn13);

      if (result && result[0]) {
        const response: any = result[0];
        if (response.summary) {
          bookinfo.author = response.summary.author;
          bookinfo.pubdate = response.summary.pubdate;
          bookinfo.title = response.summary.title;
          bookinfo.imageUrl = response.summary.cover;
        }
      }
    } catch (err) {
      console.error('error', err);
      bookinfo.isError = true;
    }

    if (!bookinfo.imageUrl) {
      bookinfo.imageUrl = './assets/no-image.png';
    }

    return bookinfo;
  }
}
