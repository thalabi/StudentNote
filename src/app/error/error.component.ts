import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message';


@Component({
    selector: 'error',
    template: `
        <p *ngFor="let message of getMessages(); let i = index">
            <ngb-alert *ngIf="message.severity == 'error'" [dismissible]="false" type="danger">{{message.summary}} {{message.detail}}</ngb-alert>
            <ngb-alert *ngIf="message.severity != 'error'" [dismissible]="false" [type]="message.severity">{{message.summary}} {{message.detail}}</ngb-alert>
        </p>
    `
})
export class ExceptionComponent {
    constructor(private notification: MessageService) {
    }

    getMessages(): Message[] {
        return this.notification.message;
    }
}