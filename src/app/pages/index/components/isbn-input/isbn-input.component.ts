import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ISBN13Validator } from './validator/isbn-validator';
import { BookInfo } from '../../../../models/books/bookInfo';
import { BookSearchService } from '../../services/book-search-service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-isbn-input',
  templateUrl: './isbn-input.component.html',
  styleUrls: ['./isbn-input.component.css']
})
export class IsbnInputComponent implements OnInit {
  formGroup = new FormGroup({
    searchKeyword: new FormControl('', [Validators.required]),
    isbn13: new FormControl('', [
      Validators.required,
      ISBN13Validator.matchISBN13
    ])
  });

  searchKeyword = '';
  bookinfo: BookInfo;
  isLoading = true;
  displaySearchDialog = false;
  displayScanDialog = false;
  displayPriceDialog = false;

  constructor(
    private bookSearchService: BookSearchService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.isLoading = false;
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  public onSubmit(): void {}

  public onSearchDialogOpen(): void {
    if (!this.formGroup.controls.searchKeyword.invalid) {
      this.displaySearchDialog = true;
    }
  }
  public onClosedSearchDialog(): void {
    this.displaySearchDialog = false;
  }
  public onBookSelected(bookinfo: BookInfo) {
    this.clearInfo();
    this.bookinfo = bookinfo;
    setTimeout(() => {
      this.displayPriceDialog = true;
    }, 10);
  }

  public onScanDialogOpen(): void {
    this.displayScanDialog = true;
  }
  public onPriceDialogOpen(): void {
    this.displayPriceDialog = true;
  }
  public onClosedScanDialog(): void {
    this.displayScanDialog = false;
  }
  public onClosedPriceDialog(): void {
    this.displayPriceDialog = false;
  }
  public async codeDetected(code: string): Promise<void> {
    this.clearInfo();
    try {
      this.isLoading = true;
      this.bookinfo = await this.bookSearchService.getBookInfoAsync(code);
      if (!this.bookinfo) {
        throw new Error('no book info');
      }
      setTimeout(() => {
        this.displayPriceDialog = true;
      }, 10);
    } catch (err) {
      console.error(err);
      this.confirmationService.confirm({
        message: '本の情報取が取得できませんでした。',
        accept: () => {}
      });
    } finally {
      this.isLoading = false;
    }
  }

  private clearInfo() {
    this.bookinfo = null;
  }
}
