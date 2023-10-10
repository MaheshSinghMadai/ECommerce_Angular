import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketTotals } from '../../models/basket';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-order-totals',
  templateUrl: './order-totals.component.html',
  styleUrls: ['./order-totals.component.css']
})
export class OrderTotalsComponent implements OnInit {

  basketTotal$ : Observable<BasketTotals>;
  constructor(public basketService: BasketService) {
    
  }
  ngOnInit(): void {
    this.basketTotal$ = this.basketService.basketTotal$;
  }
}
