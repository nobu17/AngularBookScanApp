import { ScrapingClient } from '../scraping-client';
import { BookPriceService } from './interface';
import { BookPrice } from '../../../../models/books/bppkprice';
import { Injectable } from '@angular/core';

@Injectable()
export class SurugayaService implements BookPriceService {
  private requestBaseUrl =
    'https://www.suruga-ya.jp/search?category=&search_word={0}&inStock=On';
  private productBaseUrl = 'https://www.suruga-ya.jp';

  private parser: DOMParser;

  constructor(private webClient: ScrapingClient) {
    this.parser = new DOMParser();
  }

  public async GetBookPriceAsync(isbn13: string): Promise<BookPrice> {
    const bookPrice = new BookPrice();
    bookPrice.storeName = '駿河屋';
    bookPrice.isSoldOut = true;

    try {
      const htmls = await this.webClient.getHtmlAsync(
        this.requestBaseUrl.replace('{0}', isbn13)
      );
      console.log('html:', htmls);
      if (htmls) {
        const strhtml: string = htmls as string;
        const doc = this.parser.parseFromString(strhtml, 'text/html');
        const price = doc.querySelector(
          'div.item_price p.price_teika span.text-red strong'
        );
        if (price) {
          const trimPrice = price.textContent
            .replace('￥', '')
            .replace(',', '')
            .trim();

          bookPrice.price = Number(trimPrice);
          bookPrice.isSoldOut = false;

          const link = doc.querySelector('p.title a');
          if (link) {
            bookPrice.linkUrl = this.productBaseUrl + link.getAttribute('href');
          }
        }
      }
    } catch (err) {
      console.error('error:', err);
      bookPrice.isError = true;
    }

    return bookPrice;
  }
}
