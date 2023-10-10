import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService} from 'src/app/account/account-service.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

currentUser$ : Observable<User>;

constructor(public accountService: AccountService) {
  
}
}
