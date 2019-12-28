import { ScrapingClient } from '../scraping-client';
import { BookPriceService } from './interface';
import { BookPrice } from '../../../../models/books/bppkprice';
import { Injectable } from '@angular/core';

@Injectable()
export class BookOffService implements BookPriceService {
  private requestBaseUrl =
    'https://www.bookoffonline.co.jp/display/L001,st=u,bg=12,q={0}';
  private productBaseUrl = 'https://www.bookoffonline.co.jp';

  private parser: DOMParser;

  constructor(private webClient: ScrapingClient) {
    this.parser = new DOMParser();
  }

  public async GetBookPriceAsync(isbn13: string): Promise<BookPrice> {
    const bookPrice = new BookPrice();
    bookPrice.storeName = 'BookOff';
    bookPrice.isSoldOut = true;

    try {
      const htmls = await this.webClient.getHtmlAsync(
        this.requestBaseUrl.replace('{0}', isbn13)
      );
      // console.log('html:', htmls);
      if (htmls) {
        const strhtml: string = htmls as string;
        const doc = this.parser.parseFromString(strhtml, 'text/html');
        const price = doc.querySelector('td.mainprice');

        if (price) {
          const trimPrice = price.textContent
            .replace('￥', '')
            .replace(',', '')
            .split('（税込）')[0]
            .trim();

          bookPrice.price = Number(trimPrice);
          bookPrice.isSoldOut = false;

          const link = doc.querySelector('div.list_l a');
          if (link) {
            bookPrice.linkUrl = this.productBaseUrl + link.getAttribute('href');
          }
        }
      }
    } catch (err) {
      bookPrice.isSoldOut = true;
      console.error('error:', err);
    }
    return bookPrice;
  }
}
