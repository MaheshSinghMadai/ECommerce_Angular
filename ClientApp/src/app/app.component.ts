import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account-service.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { 
  title = 'Ecommerce';

  constructor(private accountService: AccountService) { }
  ngOnInit(): void {

  }
  
  
}


