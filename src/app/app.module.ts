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

// app modules
import { IsbnInputComponent } from './pages/index/components/isbn-input/isbn-input.component';
import { ScanDialogComponent } from './pages/index/components/scan-dialog/scan-dialog.component';
import { PriceDialogComponent } from './pages/index/components/price-dialog/price-dialog.component';
import { BookinfoBoxComponent } from './pages/index/components/bookinfo-box/bookinfo-box.component';
import { BookpriceBoxComponent } from './pages/index/components/bookprice-box/bookprice-box.component';

// app services
import { BookInfoService } from './pages/index/services/bookinfo-service';
import { ScrapingClient } from './pages/index/services/scraping-client';
import { SurugayaService } from './pages/index/services/bookprice/surugaya-service';
import { BookOffService } from './pages/index/services/bookprice/bookoff-service';
import { BookPriceServiceFactory } from './pages/index/services/bookprice/bookservice-factory';

@NgModule({
  declarations: [
    AppComponent,
    IsbnInputComponent,
    ScanDialogComponent,
    PriceDialogComponent,
    BookinfoBoxComponent,
    BookpriceBoxComponent
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
    CardModule
  ],
  providers: [
    BookInfoService,
    ScrapingClient,
    SurugayaService,
    BookOffService,
    BookPriceServiceFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
