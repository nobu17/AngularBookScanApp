import { Component, OnInit, Input } from '@angular/core';
import { BookPrice } from '../../../../models/books/bppkprice';

@Component({
  selector: 'app-bookprice-box',
  templateUrl: './bookprice-box.component.html',
  styleUrls: ['./bookprice-box.component.css']
})
export class BookpriceBoxComponent implements OnInit {
  @Input() storeName: string;
  @Input() bookPrice: BookPrice;
  constructor() {}

  ngOnInit() {}
  onProductLink() {
    if (this.bookPrice.linkUrl) {
      window.open(this.bookPrice.linkUrl, '_blank');
    }
  }
}
