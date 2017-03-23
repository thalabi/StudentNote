import { Injectable } from '@angular/core';
import { Message } from './message';

@Injectable()
export class MessageService {
    message: Message[];

    constructor() {
        this.message = [];
    }

    clear() {
        this.message = [];
    }
    success(detail: string, summary?: string): void {
        console.log('pushing message');
        this.message.push({
            severity: 'success', summary: summary, detail: detail
        });
    }

    info(detail: string, summary?: string): void {
        this.message.push({
            severity: 'info', summary: summary, detail: detail
        });
    }

    warning(detail: string, summary?: string): void {
        this.message.push({
            severity: 'warning', summary: summary, detail: detail
        });
    }

    error(detail: string, summary?: string): void {
        console.log('pushing message');
        this.message.push({
            severity: 'error', summary: summary, detail: detail
        });
    }
}