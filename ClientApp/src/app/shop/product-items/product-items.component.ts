import { Component, Input, OnInit } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent implements OnInit {

@Input() product: Product | any ;

constructor(private basketService: BasketService) { }
  ngOnInit(): void {
    
  }

  addItemToBasket() {
    this.product && this.basketService.addItemToBasket(this.product);
  }
}
