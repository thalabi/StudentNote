import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message';


@Component({
    selector: 'error',
    template: `
        <p *ngFor="let message of getMessages(); let i = index">{{message.severity}} {{message.summary}} {{message.detail}}</p>
    `
})
export class ExceptionComponent{
    constructor(private notification: MessageService) {
    }

    getMessages(): Message[] {
        return this.notification.message;
    }
}