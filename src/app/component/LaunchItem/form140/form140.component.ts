import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../shared/navigation.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-form140',
    templateUrl: './form140.component.html',
    styleUrls: ['./form140.component.css']
})
export class form140Component implements OnInit, OnChanges {

    @Output() onMessage = new EventEmitter<{}>();
        @Input() unready: any;
    private _operation: string = "launchItem";
    ngModel8: any = null;
    ngModel9: any = null;
    ngModel10: any = null;
    ngModel11: any = null;
    ngModel12: any = null;

    handleClick(e) {
        let message = {};
        message["operation"] = "form140";
        message["content"] =
        {

            "request": {
                },
            "item": {
                "name": this.ngModel8,
                "bidEndDate": this.ngModel9,
                "id": 1,
                "reservePrice": this.ngModel10,
                "startPrice": this.ngModel11,
                "description": this.ngModel12
                }
        }
        this.onMessage.emit(message);
    }

    @Input() paramVar2_UID;


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