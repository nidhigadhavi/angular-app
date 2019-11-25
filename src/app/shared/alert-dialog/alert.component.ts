import { Component, OnInit } from '@angular/core';
import { AlertService } from '../utilityServices/AlertService';
import { Alert, AlertType } from '../utilityServices/models/Alert';


@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['./alert.component.scss']

})

export class AlertComponent {
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) { 
        console.log("INTO constructor...Alert");
    }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: Alert) => {
            if (!alert) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }

            // add alert to array
            this.alerts = [];
            this.alerts.push(alert);
            // setTimeout(() => {
            //     this.close(alert);
            // }, 3000);
        });
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }

        // return css class based on alert type
        switch (alert.type) {
            case AlertType.Success:
                return 'alert alert-success';
            case AlertType.Error:
                return 'alert alert-danger';
        }
    }

    close(alert: Alert) {
        this.alerts = this.alerts.filter(x => x !== alert);
    }
}