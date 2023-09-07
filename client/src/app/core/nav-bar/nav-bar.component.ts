import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketItem } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})

export class NavBarComponent implements OnInit{

  basket$: Observable<IBasket>;
  currentUser$: Observable<IUser>;



  constructor(public basketService: BasketService, private accountService : AccountService) {}
  ngOnInit(){
    this.basket$ = this.basketService.basket$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  getCount(items: IBasketItem[]=[]) {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
