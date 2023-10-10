import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService} from 'src/app/account/account-service.service';
import { BasketService } from 'src/app/basket/basket.service';
import { Basket } from 'src/app/shared/models/basket';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit{

basket$ : Observable<Basket>;
currentUser$ : Observable<User>;

constructor(public basketService: BasketService,public accountService: AccountService) { }

ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }
}
