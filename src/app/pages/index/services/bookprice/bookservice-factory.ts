import { BookPriceService } from './interface';
import { SurugayaService } from './surugaya-service';
import { BookOffService } from './bookoff-service';
import { Injectable } from '@angular/core';

@Injectable()
export class BookPriceServiceFactory {
  constructor(
    private surugaya: SurugayaService,
    private bookoff: BookOffService
  ) {}

  public getBookPriceService(store: string): BookPriceService {
    switch (store) {
      case 'surugaya':
        return this.surugaya;
      case 'bookoff':
        return this.bookoff;
      default:
        throw new Error('not supported store');
    }
    return null;
  }
}
