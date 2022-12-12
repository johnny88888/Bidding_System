import { Component, OnInit } from '@angular/core';
import { MainService } from './Main.service';
import { Subscription } from 'rxjs'
import * as _ from 'lodash';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavigationService } from '../../../shared/navigation.service'



@Component({
    selector: 'app-Main',
    templateUrl: './Main.component.html',
    styleUrls: ['./Main.component.css'],
    providers: [ MainService ]
})
export class MainComponent implements OnInit {

    outputSubscription: Subscription;
    private serviceReady:boolean = false;
    serviceReadySubscription: Subscription;
    // for store last time information
    static parameter_UID = "";
    parameter_UID;

    ngModel25: any = "";

    private passingParam:any | null = null;



    constructor(private service: MainService, private navigationService: NavigationService, private route: ActivatedRoute, private router: Router) {
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
                case 'searchItemUIOutput':
                    let searchItemData = operationStatus[outputOperation]["data"];
                    let searchItemParsedJSON = this.parseJSON(searchItemData);
                    let searchItemHasRtnMsgProperty = searchItemParsedJSON.hasOwnProperty('rtnMsg');

                    var privilege = "privilege";
                    var error = "error";
                    var notFound = "Not Found";
                    var authFail = "Authentication Failed"
                    var isInit = "isInit";

                    if (searchItemData.toString().search(privilege) > 0) {
                        console.log("invoke success");
                        service.invokeStatus.next(true);
                        if (searchItemHasRtnMsgProperty){
                            this.ngModel25 = searchItemParsedJSON.rtnMsg;
                        }else {
                            this.ngModel25 = searchItemParsedJSON;
                        }
                    }else if (searchItemData.toString().search(error) > 0 && searchItemData.toString().search(notFound) > 0) {
                        console.log("invoke fail, get error and not found message");
                        service.invokeStatus.next(false);
                    }else if (searchItemData.toString().search(error) > 0 && searchItemData.toString().search(authFail) > 0) {
                        console.log("invoke fail, get error and authentication fail message");
                        service.invokeStatus.next(false);
                    }else if (searchItemData.toString().search(isInit) > 0){
                        console.log("invoke fail, return message is init message");
                        service.invokeStatus.next(false);
                    }else {
                        console.log("invoke success");
                        service.invokeStatus.next(true);
                        if (searchItemHasRtnMsgProperty){
                            this.ngModel25 = searchItemParsedJSON.rtnMsg;
                        }else {
                            this.ngModel25 = searchItemParsedJSON;
                        }
                    }
                break;

                default:
                    console.log("[Warning] No " + outputOperation + " operation in outputPort");
                    break;
                }
            }
        });
    }



    ngOnInit(): void {
        this.route.params.subscribe(params => {
            MainComponent.parameter_UID = params['UID'] == undefined ? MainComponent.parameter_UID : params['UID'];
            this.parameter_UID = MainComponent.parameter_UID;
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