import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from '../authentication.service';
import { StudentService } from '../../student.service';
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
    private authenticationService: AuthenticationService,
    private studentService: StudentService,
    private messageService: MessageService  
  ) { }

  ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        this.messageService.clear();
  }

  login() {
      this.loading = true;
      this.authenticationService.login(this.model.username, this.model.password)
        .subscribe({
              next: data => {
                  this.router.navigate([this.returnUrl]);
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
  }

}
