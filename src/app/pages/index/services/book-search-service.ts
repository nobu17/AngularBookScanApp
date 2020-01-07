import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BookInfo } from '../../../models/books/bookInfo';

@Injectable()
export class BookSearchService {
  private urlbase = 'https://www.googleapis.com/books/v1/volumes?q=';
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    body: null
  };
  constructor(private http: HttpClient) {}

  public async getBookInfoAsync(isbn13: string): Promise<BookInfo> {
    const result = await this.http
      .get(
        this.urlbase + 'isbn:' + isbn13 + '&maxResults=40&langRestrict=ja',
        this.httpOptions
      )
      .toPromise();
    const books = this.getBookInfoFromBody(result);
    if (books.length > 0) {
      return books[0];
    } else {
      return null;
    }
  }

  public async getBookInfoListAsync(keyword: string): Promise<Array<BookInfo>> {
    // convert multiple search condition
    const actkeywords = keyword.replace(' ', '+').replace('　', '+');
    const result = await this.http
      .get(
        this.urlbase +
          actkeywords +
          '&maxResults=40&orderBy=newest&langRestrict=ja',
        this.httpOptions
      )
      .toPromise();

    return this.getBookInfoFromBody(result);
  }

  private getBookInfoFromBody(body: any): BookInfo[] {
    const list = new Array<BookInfo>();
    if (body) {
      const response: any = body;
      if (response.items) {
        const booklist: Array<any> = response.items;
        for (const book of booklist) {
          try {
            const bookinfo = new BookInfo();
            bookinfo.title = book.volumeInfo.title;
            if (book.volumeInfo.authors) {
              bookinfo.author = book.volumeInfo.authors.join('/');
            } else {
              bookinfo.author = '著者情報なし';
            }

            bookinfo.pubdate = book.volumeInfo.publishedDate;

            for (const iden of book.volumeInfo.industryIdentifiers) {
              // console.log('iden', iden);
              if (iden.type === 'ISBN_13') {
                bookinfo.isbn13 = iden.identifier;
                console.log('isbn13', bookinfo.isbn13);
              } else if (iden.type === 'ISBN_10') {
                // get amazon link
                bookinfo.prdouctLink =
                  'https://www.amazon.co.jp/dp/' + iden.identifier;
              }
            }
            if (
              book.volumeInfo.imageLinks &&
              book.volumeInfo.imageLinks.smallThumbnail
            ) {
              bookinfo.imageUrl = book.volumeInfo.imageLinks.smallThumbnail;
            }

            if (
              bookinfo.isbn13 &&
              list.findIndex(x => x.isbn13 === bookinfo.isbn13) === -1
            ) {
              list.push(bookinfo);
            }
          } catch (err) {
            console.error('json parse error!', err, book);
          }
        }
      }
    }
    return list;
  }
}
