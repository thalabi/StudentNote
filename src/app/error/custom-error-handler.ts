import { ErrorHandler, Inject } from '@angular/core';
import { MessageService } from './message.service';


export class CustomErrorHandler implements ErrorHandler {

    constructor(@Inject(MessageService) private nessageService: MessageService) {
    }

    handleError(error: any): void {
        this.showErrorInConsole(error);
        // setTimeout(() => 
        //     this.nessageService.error(error.json().Message), 1);
        this.nessageService.error(error.name);
        this.nessageService.error(error.json().Message);
    }

    private showErrorInConsole(error: any) :void {
        if (console && console.group && console.error) {
            console.group("Error Log");
            console.error(error);
            console.error(error.message);
            console.error(error.stack);
            console.groupEnd();
        }
    }
}