import { Component, OnInit, OnChanges, OnDestroy, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as _ from 'lodash';

import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NavigationService } from '../../../shared/navigation.service'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';


@Component({
    selector: 'app-table96',
    templateUrl: './table96.component.html',
    styleUrls: ['./table96.component.css']
})
export class table96Component implements OnInit, OnChanges {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;
    @Output() onMessage = new EventEmitter<{}>();
    
    @Input() ngModel18: any = "";
    dataSource = new MatTableDataSource();
    obs: Observable<any>;



    constructor(private navigationService: NavigationService) {}



    ngOnInit(): void {
    }



    ngOnChanges(changes){
        this.dataSource.data = this.ngModel18;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.obs = this.dataSource.connect();
    }

    ngOnDestroy() {
        if (this.dataSource) {
            this.dataSource.disconnect();
        }
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

    applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
//      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }

}