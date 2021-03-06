import { Component, OnInit } from '@angular/core';
import { MessageService } from './../error/message.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

    constructor(
        private messageService: MessageService
    ) { }

    ngOnInit() {
        this.messageService.clear();
    }

}
