import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../shared/navigation.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-form59',
    templateUrl: './form59.component.html',
    styleUrls: ['./form59.component.css']
})
export class form59Component implements OnInit, OnChanges {

    @Output() onMessage = new EventEmitter<{}>();
        @Input() unready: any;
    private _operation: string = "register";
    ngModel4: any = null;
    ngModel5: any = null;
    ngModel6: any = null;
    ngModel7: any = null;

    handleClick(e) {
        let message = {};
        message["operation"] = "form59";
        message["content"] =
        {

            "user": {
                "username": this.ngModel4,
                "phone": this.ngModel6,
                "email": this.ngModel7,
                "password": this.ngModel5
                }
        }
        this.onMessage.emit(message);
    }



    constructor(private navigationService: NavigationService , public dialog: MatDialog) {}



    ngOnInit(): void {
    }



    ngOnChanges(changes){
    }

    transmitMessage(message) {
        this.onMessage.emit(message);
    }

    navigate(path, data?, watchedSubject?: BehaviorSubject<any>) {
        this.navigationService.navigate(path, data, watchedSubject)
    }

    evaluateValue(object: Object, path: string) {
        return _.get(object, path, "")
    }

}