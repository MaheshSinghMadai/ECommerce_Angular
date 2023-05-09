import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/models/product';
import { ShopService } from '../shop.service';
import { BasketService } from 'src/app/basket/basket.service';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent implements OnInit{
  
  @Input() product: IProduct;

  constructor(private basketService: BasketService) {}
  
  ngOnInit() {
    
  }

  addItemToBasket(){
    return this.basketService.addItemToBasket(this.product);
  }



}
