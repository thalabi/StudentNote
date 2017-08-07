import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from '../authentication.service';
import { StudentService } from '../../student.service';
import { MessageService } from './../../error/message.service';
import { SessionDataService } from '../../session-data.service';
import { Observable } from "rxjs/Observable";
import { UserPreference } from '../../domain/UserPreference';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private studentService: StudentService,
    private messageService: MessageService,
    private sessionDataService: SessionDataService  
  ) { }

  ngOnInit() {
        // reset login status
        //this.authenticationService.logout();
        this.sessionDataService.userSubject.next(null);
        this.sessionDataService.userPreferenceSubject.next(null);
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.messageService.clear();
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
        .subscribe({
              next: user => {
                  console.log('user: ', user);
                  // store user details in SessionDataService
                  this.sessionDataService.user = user;
                  this.sessionDataService.userSubject.next(user);
                  this.router.navigate([this.returnUrl]);
                  console.log('before calll getUserPrefernce');
                  this.studentService.getUserPreference();
                  console.log('after calll getUserPrefernce');
                  this.messageService.clear();
              },
              error: error => {
                
                  console.log(error);
                  this.messageService.clear();
                  // test
                  // this.messageService.success(error);
                  // this.messageService.info(error);
                  // this.messageService.warning(error);
                  this.messageService.error(error);
                  this.loading = false;
              }
        });
          
  // }

  // login() {
  //     this.loading = true;
  //     let obs1$: Observable<any> = this.authenticationService.login(this.model.username, this.model.password);
  //     //let obs2$: Observable<any> = this.authenticationService.login(this.model.username, this.model.password);
  //     let obs2$: Observable<UserPreference> = this.studentService.getUserPreference2();
  //     Observable.concat(obs1$, obs2$)
  //       .subscribe({
  //             next: user => {
  //                 console.log('user: ', user);
  //                 // this.sessionDataService.user = user;
  //                 // this.sessionDataService.userSubject.next(user);
  //                 // this.router.navigate([this.returnUrl]);
  //                 // this.messageService.clear();
  //             },
  //             error: error => {
                
  //                 console.log(error);
  //                 this.messageService.clear();
  //                 // test
  //                 // this.messageService.success(error);
  //                 // this.messageService.info(error);
  //                 // this.messageService.warning(error);
  //                 this.messageService.error(error);
  //                 this.loading = false;
  //             }
  //       });
          
  }

}
