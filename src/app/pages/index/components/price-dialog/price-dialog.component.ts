import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookInfoService } from '../../services/bookinfo-service';
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
  @Input() isbn13: string;
  @Input() bookinfo: BookInfo;
  @Output() closed: EventEmitter<void> = new EventEmitter();

  amazonInfo: BookPrice;
  amazonMarketService: BookPriceService;
  surugayaInfo: BookPrice;
  surugayaService: BookPriceService;
  bookoffInfo: BookPrice;
  bookoffService: BookPriceService;

  constructor(
    private bookInfoService: BookInfoService,
    private factory: BookPriceServiceFactory
  ) {
    this.surugayaService = this.factory.getBookPriceService('surugaya');
    this.bookoffService = this.factory.getBookPriceService('bookoff');
    this.amazonMarketService = this.factory.getBookPriceService('amazon');
  }

  async onShow(dialog: Dialog) {
    // this.display = true;
    setTimeout(() => {
      dialog.maximize();
    }, 10);
    this.resetInfo();
    // if bookinfo is not setted, get from api
    if (!this.bookinfo) {
      // console.log('start showDialog', dialog);
      this.bookinfo = await this.bookInfoService.getBookIfnoAsync(this.isbn13);
      // console.log('books', this.bookinfo);
    } else {
      this.isbn13 = this.bookinfo.isbn13;
    }
    const aTask = this.amazonMarketService.GetBookPriceAsync(this.isbn13);
    const sTask = this.surugayaService.GetBookPriceAsync(this.isbn13);
    const bTask = this.bookoffService.GetBookPriceAsync(this.isbn13);

    [this.amazonInfo, this.surugayaInfo, this.bookoffInfo] = await Promise.all([
      aTask,
      sTask,
      bTask
    ]);
  }
  onHide() {
    this.display = false;
    this.closed.emit();
  }

  ngOnInit() {
    const bookinfo = new BookInfo();
    bookinfo.author = 'loading...';
    bookinfo.prdouctLink = 'dummy';
    bookinfo.title = 'loading...';
    // bookinfo.imageUrl = './aasets/no-image.png';

    this.bookinfo = bookinfo;
  }

  private resetInfo(): void {
    // this.bookinfo = null;
    this.amazonInfo = null;
    this.surugayaInfo = null;
    this.bookoffInfo = null;
  }
}
