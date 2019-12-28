import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookInfoService } from '../../services/bookinfo-service';
import { BookInfo } from '../../../../models/books/bookInfo';
import { BookPriceServiceFactory } from '../../services/bookprice/bookservice-factory';
import { BookPrice } from 'src/app/models/books/bppkprice';
import { BookPriceService } from '../../services/bookprice/interface';
import { promise } from 'protractor';

@Component({
  selector: 'app-price-dialog',
  templateUrl: './price-dialog.component.html',
  styleUrls: ['./price-dialog.component.css']
})
export class PriceDialogComponent implements OnInit {
  @Input() display: boolean;
  @Input() isbn13: string;
  @Output() closed: EventEmitter<void> = new EventEmitter();

  bookinfo: BookInfo;
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
  }

  async onShow() {
    this.display = true;
    console.log('start showDialog');
    this.bookinfo = await this.bookInfoService.getBookIfnoAsync(this.isbn13);
    console.log('books', this.bookinfo);

    const sTask = this.surugayaService.GetBookPriceAsync(this.isbn13);
    const bTask = this.bookoffService.GetBookPriceAsync(this.isbn13);

    [this.surugayaInfo, this.bookoffInfo] = await Promise.all([sTask, bTask]);
  }
  onHide() {
    this.display = false;
    this.closed.emit();
  }

  ngOnInit() {}
}
