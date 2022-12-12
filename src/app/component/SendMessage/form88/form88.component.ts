import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../shared/navigation.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-form88',
    templateUrl: './form88.component.html',
    styleUrls: ['./form88.component.css']
})
export class form88Component implements OnInit, OnChanges {

    @Output() onMessage = new EventEmitter<{}>();
        @Input() unready: any;
    private _operation: string = "sendMessage";
    ngModel1: any = null;
    ngModel2: any = null;
    ngModel3: any = null;

    handleClick(e) {
        let message = {};
        message["operation"] = "form88";
        message["content"] =
        {

            "requestMessage": {
                "content": this.ngModel3,
                "receiverUsername": this.ngModel2,
                "senderId": this.paramVar1_UID,
                "title": this.ngModel1
                },
            "request": {
                }
        }
        this.onMessage.emit(message);
    }

    @Input() paramVar1_UID;


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