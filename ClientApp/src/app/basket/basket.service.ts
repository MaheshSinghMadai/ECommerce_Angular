import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Basket, BasketItem, BasketTotals } from '../shared/models/basket';
import { BehaviorSubject, map } from 'rxjs';
import { Product } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = 'https://localhost:7049/api';
  
  private basketSource = new BehaviorSubject<Basket>(null);
  basket$ = this.basketSource.asObservable();

  private basketTotalSource = new BehaviorSubject<BasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  constructor(private http: HttpClient) { }

  getBasket(id: number){
    return this.http.get(this.baseUrl + '/basket?id='+ id).pipe(
      map((basket: Basket) => {
        this.basketSource.next(basket);
      })
    )
  }

  setBasket(basket: Basket){
    return this.http.post(this.baseUrl + '/basket', basket).subscribe(
      (response:Basket) => {
        this.basketSource.next(response);
      },
      error => {
        console.log(error);
      }
    )
  }

  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  addItemToBasket(item: Product | BasketItem, quantity = 1) {
    if (this.isProduct(item)){
      item = this.mapProductItemToBasketItem(item);
      console.log(item);
    }
   
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, item, quantity);
    this.setBasket(basket);
  }

  removeItemFromBasket(id: number, quantity = 1) {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const item = basket.items.find(x => x.id === id);
    if (item) {
      item.quantity -= quantity;
      if (item.quantity === 0) {
        basket.items = basket.items.filter(x => x.id !== id);
      }
      if (basket.items.length > 0) this.setBasket(basket);
      else this.deleteBasket(basket);
    }
  }

  deleteBasket(basket: Basket) {
    return this.http.delete(this.baseUrl + 'basket?id=' + basket.id).subscribe({
      next: () => {
        this.deleteLocalBasket();
      }
    })
  }

  deleteLocalBasket() {
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
    localStorage.removeItem('basket_id');
  }

  private addOrUpdateItem(items: BasketItem[], itemToAdd: BasketItem, quantity: number): BasketItem[] {
    
    if (!items) {
      items = [];
    }

    const item = items.find(x => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }

  private createBasket(): Basket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket;
  }

  private mapProductItemToBasketItem(item: Product): BasketItem {
    return {
      id: item.id,
      productName: item.name,
      price: item.price,
      quantity: 0,
      pictureUrl: item.pictureUrl,
      brand: item.productBrand,
      type: item.productType
    }
  }

  private calculateTotals() {
    const basket = this.getCurrentBasketValue();
    if (!basket) return;
    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);
    const total = subtotal + basket.shippingPrice;
    this.basketTotalSource.next({shipping: basket.shippingPrice, total, subtotal});
  }

  private isProduct(item: Product | BasketItem): item is Product {
    return (item as Product).productBrand !== undefined;
  }
}
