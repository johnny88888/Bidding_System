import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../shared/navigation.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-form49',
    templateUrl: './form49.component.html',
    styleUrls: ['./form49.component.css']
})
export class form49Component implements OnInit, OnChanges {

    @Output() onMessage = new EventEmitter<{}>();
        @Input() unready: any;
    private _operation: string = "login";
    ngModel13: any = null;
    ngModel14: any = null;

    handleClick(e) {
        let message = {};
        message["operation"] = "form49";
        message["content"] =
        {

            "account": {
                "username": this.ngModel13,
                "password": this.ngModel14
                }
        }
        this.onMessage.emit(message);
    }

    @Input() ngModel18: any = "";


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