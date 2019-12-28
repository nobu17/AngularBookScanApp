import { BookPrice } from '../../../../models/books/bppkprice';

export interface BookPriceService {
  GetBookPriceAsync(isbn13: string): Promise<BookPrice>;
}
