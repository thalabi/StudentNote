import { Component, OnInit } from '@angular/core';
import { User } from '../security/user';
import { UserPreference } from '../domain/UserPreference';

import { AuthenticationService } from '../security/authentication.service';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: User;
  userPreference: UserPreference;

  constructor(
    private authenticationService: AuthenticationService,
    private studentService: StudentService
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

      this.studentService.userPreferenceSubject
        //.map((data:User)=>{console.log(data})
        .subscribe(
          data => {
            this.userPreference = data;
            console.log('userPreference: ', this.userPreference);
          },
          error => console.error(error),
          () => console.log('completed')
        );  


      }

}
