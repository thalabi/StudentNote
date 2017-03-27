import { Component, OnInit } from '@angular/core';
import { MessageService } from './../error/message.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.messageService.clear();
  }

}
