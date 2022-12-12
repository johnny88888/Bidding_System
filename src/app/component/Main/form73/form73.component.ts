import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../shared/navigation.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-form73',
    templateUrl: './form73.component.html',
    styleUrls: ['./form73.component.css']
})
export class form73Component implements OnInit, OnChanges {

    @Output() onMessage = new EventEmitter<{}>();
        @Input() unready: any;
    private _operation: string = "searchItem";
    ngModel15: any = null;

    handleClick(e) {
        let message = {};
        message["operation"] = "form73";
        message["content"] =
        {

            "request": {
                },
            "keyword": {
                "value": this.ngModel15
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