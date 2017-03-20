import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from '../authentication.service';
import { MessageService } from './../../error/message.service';

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
    private authenticationService: AuthenticationService  ,
    private messageService: MessageService  
  ) { }

  ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
                  this.messageService.clear();
              },
              error => {
                
                // TODO replace with some type of error message
                  //this.alertService.error(error);
                  console.log(error);
                  console.log(error);
                  this.messageService.clear();
                  this.messageService.error(error);
                  this.loading = false;
              });
  }

}
