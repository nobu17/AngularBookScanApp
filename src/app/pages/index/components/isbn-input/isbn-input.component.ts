import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
// prime modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

import { ISBN13Validator } from './validator/isbn-validator';

@Component({
  selector: 'app-isbn-input',
  templateUrl: './isbn-input.component.html',
  styleUrls: ['./isbn-input.component.css']
})
export class IsbnInputComponent implements OnInit {
  formGroup = new FormGroup({
    isbn13: new FormControl('', [
      Validators.required,
      ISBN13Validator.matchISBN13
    ])
  });

  isbn13 = '';
  displayScanDialog = false;
  displayPriceDialog = false;
  constructor() {}

  ngOnInit() {}

  // convenience getter for easy access to form fields
  get f() {
    return this.formGroup.controls;
  }

  public onSubmit(): void {}
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
    this.isbn13 = code;
  }
}
