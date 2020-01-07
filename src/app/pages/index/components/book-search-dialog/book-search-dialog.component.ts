import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BookInfo } from '../../../../models/books/bookInfo';
import { Dialog } from 'primeng/dialog/dialog';
import { BookSearchService } from '../../services/book-search-service';

@Component({
  selector: 'app-book-search-dialog',
  templateUrl: './book-search-dialog.component.html',
  styleUrls: ['./book-search-dialog.component.css']
})
export class BookSearchDialogComponent implements OnInit {
  @Input() display: boolean;
  @Input() keyword: string;
  @Output() closed: EventEmitter<BookInfo> = new EventEmitter();
  @Output() bookSelected: EventEmitter<BookInfo> = new EventEmitter();

  booklist: BookInfo[];
  isLoading: boolean;
  errorMessage: string;

  constructor(private bookSearchService: BookSearchService) {}

  ngOnInit() {
    this.booklist = new Array<BookInfo>();
    this.isLoading = true;
    this.errorMessage = '';
  }

  onBookSelectClicked(bookInfo: BookInfo) {
    // this.onHide();
    console.log('selected', bookInfo);
    this.bookSelected.emit(bookInfo);
  }

  async onShow(dialog: Dialog) {
    this.booklist = new Array<BookInfo>();
    this.isLoading = true;
    setTimeout(() => {
      dialog.maximize();
    }, 10);

    try {
      this.booklist = await this.bookSearchService.getBookInfoListAsync(
        this.keyword
      );
    } catch (err) {
      this.errorMessage = 'エラーが発生しました。画面をリロードしてください。';
      console.error(err);
    } finally {
      this.isLoading = false;
    }
  }

  onHide() {
    this.display = false;
    this.isLoading = false;
    this.errorMessage = '';
    this.closed.emit();
  }
}
