import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../shared/navigation.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-form104',
    templateUrl: './form104.component.html',
    styleUrls: ['./form104.component.css']
})
export class form104Component implements OnInit, OnChanges {

    @Output() onMessage = new EventEmitter<{}>();
        @Input() unready: any;
    private _operation: string = "placeBidPrice";
    ngModel16: any = null;

    handleClick(e) {
        let message = {};
        message["operation"] = "form104";
        message["content"] =
        {
            "itemId": this.paramVar6_itemID,

            "request": {
                },
            "bidData": {
                "bidderId": this.paramVar6_userID,
                "itemId": this.paramVar6_itemID,
                "bidPrice": this.ngModel16
                }
        }
        this.onMessage.emit(message);
    }

    @Input() paramVar6_UID;
    @Input() paramVar6_userID;
    @Input() paramVar6_itemID;


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