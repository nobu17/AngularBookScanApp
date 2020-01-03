import { Component, OnInit, Input } from '@angular/core';
import { BookInfo } from '../../../../models/books/bookInfo';


@Component({
  selector: 'app-bookinfo-box',
  templateUrl: './bookinfo-box.component.html',
  styleUrls: ['./bookinfo-box.component.css']
})
export class BookinfoBoxComponent implements OnInit {
  @Input() bookinfo: BookInfo;
  constructor() {
  }

  ngOnInit() {
  }
  onAmazonLink() {
    window.open(this.bookinfo.prdouctLink, '_blank');
  }
}
