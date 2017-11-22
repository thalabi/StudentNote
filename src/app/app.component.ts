import { Component, OnInit } from '@angular/core';
import { Student } from './dto/Student';
import { StudentService } from './student.service';
import { MessageService } from './error/message.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    version: string;

    constructor(
        private studentService: StudentService,
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.studentService.getVersion().subscribe({
            next: version => {
                this.version = version;
                console.log('version: ', this.version);
            },
            error: error => {
                console.error(error);
                this.messageService.clear();
                this.messageService.error(error);
            }
        });
    }
}
