import { Component, OnInit } from '@angular/core';
import { User } from '../security/user';
import { UserPreference } from '../dto/UserPreference';

// import { AuthenticationService } from '../security/authentication.service';
// import { StudentService } from '../student.service';
import { SessionDataService } from '../session-data.service';
import { MenuItem } from 'primeng/primeng';


@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    user: User;
    userPreference: UserPreference;

    menuModel: MenuItem[] = [
        {
            label: 'Home',
            routerLink: '/',
            routerLinkActiveOptions: { exact: true }
        },
        {
            label: 'Print',
            routerLink: '/print',
            routerLinkActiveOptions: { exact: true }
        },
        {
            label: 'School Year',
            items: [
                { label: 'Switch', routerLink: '/schoolYearSelect', routerLinkActiveOptions: { exact: true } },
                { label: 'Students', routerLink: '/schoolYearStudents', routerLinkActiveOptions: { exact: true } },
                { label: 'Maintenance', routerLink: '/schoolYearCrud', routerLinkActiveOptions: { exact: true } }
            ]
        },
        {
            label: 'About',
            routerLink: '/about',
            routerLinkActiveOptions: { exact: true }
        },
        {
            label: 'Contact Us',
            routerLink: '/contact-us',
            routerLinkActiveOptions: { exact: true },
            badge: 'My Badge'
        },
        {
            label: 'Logout',
            routerLink: '/login',
            routerLinkActiveOptions: { exact: true }
        }
    ];

    constructor(
        // private authenticationService: AuthenticationService,
        // private studentService: StudentService,
        private sessionDataService: SessionDataService
    ) { }

    ngOnInit() {
        //this.user = JSON.parse(localStorage.getItem('currentUser'));
        //console.log("user: ", this.user);

        this.sessionDataService.userSubject
            //.map((data:User)=>{console.log(data})
            .subscribe(
            data => {
                this.user = data;
                console.log('user: ', this.user);
                this.showMenuItems(this.user != undefined && this.user != null);
            },
            error => console.error(error),
            () => console.log('completed')
            );

        this.sessionDataService.userPreferenceSubject
            //.map((data:User)=>{console.log(data})
            .subscribe(
            data => {
                this.userPreference = data;
                console.log('userPreference: ', this.userPreference);
            },
            error => console.error(error),
            () => console.log('completed')
            );

        // console.log('this.menuModel', this.menuModel);
        // console.log('this.user', this.user);
        // console.log('this.user', this.user != undefined && this.user != null);
        this.showMenuItems(false);
        // console.log('this.menuModel', this.menuModel);
    }

    private getMenuItem(array: any, label: string): any {
        return array.find(item => item.label === label);
    }

    public showMenuItems(show: boolean): void {
        //const topLevel = this.getMenuItem(this.menuModel, 'Top Level Menu');
        if (show) {
            //this.getMenuItem(this.menuModel, 'Home').visible = true;
            this.getMenuItem(this.menuModel, 'Print').visible = true;
            this.getMenuItem(this.menuModel, 'School Year').visible = true;
            this.getMenuItem(this.menuModel, 'Logout').visible = true;
        } else {
            //this.getMenuItem(this.menuModel, 'Home').visible = false;
            this.getMenuItem(this.menuModel, 'Print').visible = false;
            this.getMenuItem(this.menuModel, 'School Year').visible = false;
            this.getMenuItem(this.menuModel, 'Logout').visible = false;
        }
    }
}
