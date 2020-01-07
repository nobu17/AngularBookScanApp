import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// prime modules
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

// app modules
import { IsbnInputComponent } from './pages/index/components/isbn-input/isbn-input.component';
import { ScanDialogComponent } from './pages/index/components/scan-dialog/scan-dialog.component';
import { PriceDialogComponent } from './pages/index/components/price-dialog/price-dialog.component';
import { BookinfoBoxComponent } from './pages/index/components/bookinfo-box/bookinfo-box.component';
import { BookpriceBoxComponent } from './pages/index/components/bookprice-box/bookprice-box.component';

// app services
import { BookInfoService } from './pages/index/services/bookinfo-service';
import { BookSearchService } from './pages/index/services/book-search-service';
import { ScrapingClient } from './pages/index/services/scraping-client';
import { ApiCallClient } from './pages/index/services/api-call-client';
import { SurugayaService } from './pages/index/services/bookprice/surugaya-service';
import { AmazonMarketService } from './pages/index/services/bookprice/amazon-market-service';
import { BookOffService } from './pages/index/services/bookprice/bookoff-service';
import { BookPriceServiceFactory } from './pages/index/services/bookprice/bookservice-factory';
import { BookSearchDialogComponent } from './pages/index/components/book-search-dialog/book-search-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    IsbnInputComponent,
    ScanDialogComponent,
    PriceDialogComponent,
    BookinfoBoxComponent,
    BookpriceBoxComponent,
    BookSearchDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    DialogModule,
    ButtonModule,
    ProgressSpinnerModule,
    CardModule,
    DataViewModule,
    ConfirmDialogModule
  ],
  providers: [
    BookInfoService,
    BookSearchService,
    ScrapingClient,
    ApiCallClient,
    SurugayaService,
    AmazonMarketService,
    BookOffService,
    BookPriceServiceFactory,
    ConfirmationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
