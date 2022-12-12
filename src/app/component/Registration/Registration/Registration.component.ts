import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './Registration.service';
import { Subscription } from 'rxjs'
import * as _ from 'lodash';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavigationService } from '../../../shared/navigation.service'



@Component({
    selector: 'app-Registration',
    templateUrl: './Registration.component.html',
    styleUrls: ['./Registration.component.css'],
    providers: [ RegistrationService ]
})
export class RegistrationComponent implements OnInit {

    outputSubscription: Subscription;
    private serviceReady:boolean = false;
    serviceReadySubscription: Subscription;
    // for store last time information
    static parameter_UID = "";
    parameter_UID;


    private passingParam:any | null = null;



    constructor(private service: RegistrationService, private navigationService: NavigationService, private route: ActivatedRoute, private router: Router) {
            if ( null != this.router.getCurrentNavigation().extras.state){
                this.passingParam = this.router.getCurrentNavigation().extras.state.passingParam;
            }else {
                this.passingParam = null;
            }
        //this.passingParam = this.navigationService.getCurrentNavigation();
        //console.log("Get passing param!!! " , this.passingParam);

        this.serviceReadySubscription = this.service.serviceStatus.subscribe(
            status => this.serviceReady = status
        );

        this.outputSubscription = service.outputOperationStatus.subscribe(
            operationStatus => {
                for (const outputOperation in operationStatus) {
                switch (outputOperation) {
                // catch operations output in the page, use local variable to store it

                default:
                    console.log("[Warning] No " + outputOperation + " operation in outputPort");
                    break;
                }
            }
        });
    }



    ngOnInit(): void {
        this.route.params.subscribe(params => {
            RegistrationComponent.parameter_UID = params['UID'] == undefined ? RegistrationComponent.parameter_UID : params['UID'];
            this.parameter_UID = RegistrationComponent.parameter_UID;
            this.service.initialPage({
            });
        });
        this.service.initialPage({
        });
    }



    ngOnDestroy() {
        this.outputSubscription.unsubscribe();
        this.serviceReadySubscription.unsubscribe();
    }

    parseJSON(data:string){
        let output
        try{
            output = JSON.parse(data)
            for(let key of Object.keys(output)){
                if(this.isJson(output[key])){
                    output[key] = this.parseJSON(output[key])
                }
            }
        }catch(error){
            output = data
        }
        return output
    }

    isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    transmitMessage(message) {
        this.service.onMessage(message);
    }

    evaluateValue(object: Object, path: string) {
        return _.get(object, path, "")
    }

    navigate(path, data?, watchVariable?: BehaviorSubject<any>) {
        this.navigationService.navigate(path, data, watchVariable)
    }
}