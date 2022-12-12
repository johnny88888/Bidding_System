import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import * as _ from 'lodash';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../shared/navigation.service'
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-form127',
    templateUrl: './form127.component.html',
    styleUrls: ['./form127.component.css']
})
export class form127Component implements OnInit, OnChanges {

    @Output() onMessage = new EventEmitter<{}>();
    

    @Input() ngModel38: any = "";


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