import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();

  constructor(private httpClient : HttpClient) {}

  getBasket(id:string){
    return this.httpClient.get(this.baseUrl + 'basket?id= '+ id)
    .pipe(
      map((basket:IBasket) => {
        this.basketSource.next(basket);
        console.log(this.getCurrentBasketValue());
      })
      );
  }

  setBasket(basket: IBasket){
    return this.httpClient.post(this.baseUrl + 'basket', basket).subscribe((response: IBasket) =>{
      this.basketSource.next(basket);
    },
    error => {
      console.log(error);
    });
  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  addItemToBasket(item: IProduct , quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd,quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] 
  {
    const item = items.find(x => x.id === itemToAdd.id);
    if (item) item.quantity += quantity;
    else {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }
    return items;
  }


  private createBasket(): IBasket {
    const basket = new Basket();
    localStorage.setItem('basket_id', basket.id);
    return basket; 
  }

private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
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
}

