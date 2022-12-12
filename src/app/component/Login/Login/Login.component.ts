import { Component, OnInit } from '@angular/core';
import { LoginService } from './Login.service';
import { Subscription } from 'rxjs'
import * as _ from 'lodash';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavigationService } from '../../../shared/navigation.service'



@Component({
    selector: 'app-Login',
    templateUrl: './Login.component.html',
    styleUrls: ['./Login.component.css'],
    providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

    outputSubscription: Subscription;
    private serviceReady:boolean = false;
    serviceReadySubscription: Subscription;
    // for store last time information

    ngModel22: any = "";




    constructor(private service: LoginService, private navigationService: NavigationService, private route: ActivatedRoute, private router: Router) {
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
                case 'loginUIOutput':
                    let loginData = operationStatus[outputOperation]["data"];
                    let loginParsedJSON = this.parseJSON(loginData);
                    let loginHasRtnMsgProperty = loginParsedJSON.hasOwnProperty('rtnMsg');

                    var privilege = "privilege";
                    var error = "error";
                    var notFound = "Not Found";
                    var authFail = "Authentication Failed"
                    var isInit = "isInit";

                    if (loginData.toString().search(privilege) > 0) {
                        console.log("invoke success");
                        service.invokeStatus.next(true);
                        if (loginHasRtnMsgProperty){
                            this.ngModel22 = loginParsedJSON.rtnMsg;
                        }else {
                            this.ngModel22 = loginParsedJSON;
                        }
                    }else if (loginData.toString().search(error) > 0 && loginData.toString().search(notFound) > 0) {
                        console.log("invoke fail, get error and not found message");
                        service.invokeStatus.next(false);
                    }else if (loginData.toString().search(error) > 0 && loginData.toString().search(authFail) > 0) {
                        console.log("invoke fail, get error and authentication fail message");
                        service.invokeStatus.next(false);
                    }else if (loginData.toString().search(isInit) > 0){
                        console.log("invoke fail, return message is init message");
                        service.invokeStatus.next(false);
                    }else {
                        console.log("invoke success");
                        service.invokeStatus.next(true);
                        if (loginHasRtnMsgProperty){
                            this.ngModel22 = loginParsedJSON.rtnMsg;
                        }else {
                            this.ngModel22 = loginParsedJSON;
                        }
                    }
                    this.navigate('Main', {UID: loginParsedJSON.userId}, service.invokeStatus);
                break;

                default:
                    console.log("[Warning] No " + outputOperation + " operation in outputPort");
                    break;
                }
            }
        });
    }



    ngOnInit(): void {
        this.service.initialPage({});
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