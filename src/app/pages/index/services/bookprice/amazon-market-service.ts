import { ApiCallClient } from '../api-call-client';
import { BookPriceService } from './interface';
import { BookPrice } from '../../../../models/books/bppkprice';
import { Injectable } from '@angular/core';

@Injectable()
export class AmazonMarketService implements BookPriceService {
  private gql =
    '{book(isbn13:\\"{isbn}\\" storeType:{store}){isbn13 price shipping linkUrl isSoldOut isError}}';

  private apiUrl =
    'https://9mw27yk1xj.execute-api.ap-northeast-1.amazonaws.com/test/oldprice?query=';

  constructor(private webClient: ApiCallClient) {}

  public async GetBookPriceAsync(isbn13: string): Promise<BookPrice> {
    const url =
      this.apiUrl +
      encodeURIComponent(
        this.gql.replace('{isbn}', isbn13).replace('{store}', 'AmazonMarket')
      );
    console.log('url', url);
    const bookPrice = await this.webClient.getBookInfoAsync(url, 'Amazon');
    console.log('bookPrice:', bookPrice);

    return bookPrice;
  }
}
