import { Component, OnInit } from '@angular/core';
import { User } from './../security/user';

import { AuthenticationService } from './../security/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit() {
      //this.user = JSON.parse(localStorage.getItem('currentUser'));
      //console.log("user: ", this.user);

      this.authenticationService.userSubject
        //.map((data:User)=>{console.log(data})
        .subscribe(
          data => {
            this.user = data;
            console.log('user: ', this.user);
          },
          error => console.error(error),
          () => console.log('completed')
        );  
  }

}
