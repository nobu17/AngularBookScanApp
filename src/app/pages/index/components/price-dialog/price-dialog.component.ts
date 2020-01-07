import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookInfo } from '../../../../models/books/bookInfo';
import { BookPriceServiceFactory } from '../../services/bookprice/bookservice-factory';
import { BookPrice } from 'src/app/models/books/bppkprice';
import { BookPriceService } from '../../services/bookprice/interface';
import { Dialog } from 'primeng/dialog/dialog';

@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.css']
})
export class PriceDialogComponent implements OnInit {
  @Input() display: boolean;
  @Input() bookinfo: BookInfo;
  @Output() closed: EventEmitter<void> = new EventEmitter();

  amazonInfo: BookPrice;
  amazonMarketService: BookPriceService;
  surugayaInfo: BookPrice;
  surugayaService: BookPriceService;
  bookoffInfo: BookPrice;
  bookoffService: BookPriceService;

  constructor(private factory: BookPriceServiceFactory) {
    this.surugayaService = this.factory.getBookPriceService('surugaya');
    this.bookoffService = this.factory.getBookPriceService('bookoff');
    this.amazonMarketService = this.factory.getBookPriceService('amazon');
  }

  onShow(dialog: Dialog) {
    // this.display = true;
    setTimeout(() => {
      dialog.maximize();
    }, 10);
    this.resetInfo();
    const aTask = this.amazonMarketService.GetBookPriceAsync(
      this.bookinfo.isbn13
    );
    const sTask = this.surugayaService.GetBookPriceAsync(this.bookinfo.isbn13);
    const bTask = this.bookoffService.GetBookPriceAsync(this.bookinfo.isbn13);

    aTask.then(res => {
      this.amazonInfo = res;
    });

    sTask.then(res => {
      this.surugayaInfo = res;
    });

    bTask.then(res => {
      this.bookoffInfo = res;
    });
  }
  onHide() {
    this.display = false;
    this.closed.emit();
  }

  ngOnInit() {
    const bookinfo = new BookInfo();
    this.bookinfo = bookinfo;
  }

  private resetInfo(): void {
    // this.bookinfo = null;
    this.amazonInfo = null;
    this.surugayaInfo = null;
    this.bookoffInfo = null;
  }
}
