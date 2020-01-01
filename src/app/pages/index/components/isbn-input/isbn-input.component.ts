import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

import { ISBN13Validator } from './validator/isbn-validator';
import { BookInfo } from '../../../../models/books/bookInfo';

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
  isbn13 = '';
  bookinfo: BookInfo;
  displaySearchDialog = false;
  displayScanDialog = false;
  displayPriceDialog = false;
  constructor() {}

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  public onSubmit(): void {}

  public onSearchDialogOpen(): void {
    this.displaySearchDialog = true;
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
  public codeDetected(code: string): void {
    this.clearInfo();
    this.isbn13 = code;
    setTimeout(() => {
      this.displayPriceDialog = true;
    }, 10);
  }

  private clearInfo() {
    this.isbn13 = '';
    this.bookinfo = null;
  }
}
