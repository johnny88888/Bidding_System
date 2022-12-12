import { Component, OnInit, Input, Output, EventEmitter, OnChanges, forwardRef } from '@angular/core';
import * as _ from 'lodash';

import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationService } from '../../../shared/navigation.service'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
    selector: 'app-input60',
    templateUrl: './input60.component.html',
    styleUrls: ['./input60.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => input60Component),
            multi: true
        }
    ]
    })

export class input60Component implements ControlValueAccessor {

    constructor() { }

    onChange: any = () => {}
    onTouch: any = () => {}
    val = ""

    set value(val : any) {
    if (val !== undefined && this.val !== val) {
        this.val = val
        this.onChange(val)
        this.onTouch(val)
        }
    }

    writeValue(value: any) {
        this.value = value
    }

    registerOnChange(fn: any) {
        this.onChange = fn
    }

    registerOnTouched(fn: any) {
        this.onTouch = fn
    }
}