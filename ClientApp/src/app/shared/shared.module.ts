import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import {  CarouselModule } from 'ngx-bootstrap/carousel';
import { ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { BasketSummaryComponent } from './basket-summary/basket-summary.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    TextInputComponent,
    OrderTotalsComponent,
    BasketSummaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    RouterModule
  ],
  exports:[
    PaginationModule,
    CarouselModule,
    ReactiveFormsModule,
    BsDropdownModule,
    OrderTotalsComponent,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
