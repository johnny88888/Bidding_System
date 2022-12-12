import { Component, OnInit } from '@angular/core';
import { ItemDetailService } from './ItemDetail.service';
import { Subscription } from 'rxjs'
import * as _ from 'lodash';
import { ActivatedRoute, Router, ParamMap, NavigationExtras } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NavigationService } from '../../../shared/navigation.service'



@Component({
    selector: 'app-ItemDetail',
    templateUrl: './ItemDetail.component.html',
    styleUrls: ['./ItemDetail.component.css'],
    providers: [ ItemDetailService ]
})
export class ItemDetailComponent implements OnInit {

    outputSubscription: Subscription;
    private serviceReady:boolean = false;
    serviceReadySubscription: Subscription;
    // for store last time information
    static parameter_UID = "";
    static parameter_userID = "";
    static parameter_itemID = "";
    parameter_UID;
    parameter_userID;
    parameter_itemID;

    ngModel32: any = "";
    ngModel37: any = "";

    private passingParam:any | null = null;



    constructor(private service: ItemDetailService, private navigationService: NavigationService, private route: ActivatedRoute, private router: Router) {
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
                case 'getBiddingHistoryUIOutput':
                    let getBiddingHistoryData = operationStatus[outputOperation]["data"];
                    let getBiddingHistoryParsedJSON = this.parseJSON(getBiddingHistoryData);
                    let getBiddingHistoryHasRtnMsgProperty = getBiddingHistoryParsedJSON.hasOwnProperty('rtnMsg');

                    var privilege = "privilege";
                    var error = "error";
                    var notFound = "Not Found";
                    var authFail = "Authentication Failed"
                    var isInit = "isInit";

                    if (getBiddingHistoryData.toString().search(privilege) > 0) {
                        console.log("invoke success");
                        service.invokeStatus.next(true);
                        if (getBiddingHistoryHasRtnMsgProperty){
                            this.ngModel32 = getBiddingHistoryParsedJSON.rtnMsg;
                        }else {
                            this.ngModel32 = getBiddingHistoryParsedJSON;
                        }
                    }else if (getBiddingHistoryData.toString().search(error) > 0 && getBiddingHistoryData.toString().search(notFound) > 0) {
                        console.log("invoke fail, get error and not found message");
                        service.invokeStatus.next(false);
                    }else if (getBiddingHistoryData.toString().search(error) > 0 && getBiddingHistoryData.toString().search(authFail) > 0) {
                        console.log("invoke fail, get error and authentication fail message");
                        service.invokeStatus.next(false);
                    }else if (getBiddingHistoryData.toString().search(isInit) > 0){
                        console.log("invoke fail, return message is init message");
                        service.invokeStatus.next(false);
                    }else {
                        console.log("invoke success");
                        service.invokeStatus.next(true);
                        if (getBiddingHistoryHasRtnMsgProperty){
                            this.ngModel32 = getBiddingHistoryParsedJSON.rtnMsg;
                        }else {
                            this.ngModel32 = getBiddingHistoryParsedJSON;
                        }
                    }
                break;
                case 'getItemDetailUIOutput':
                    let getItemDetailData = operationStatus[outputOperation]["data"];
                    let getItemDetailParsedJSON = this.parseJSON(getItemDetailData);
                    let getItemDetailHasRtnMsgProperty = getItemDetailParsedJSON.hasOwnProperty('rtnMsg');

                    var privilege = "privilege";
                    var error = "error";
                    var notFound = "Not Found";
                    var authFail = "Authentication Failed"
                    var isInit = "isInit";

                    if (getItemDetailData.toString().search(privilege) > 0) {
                        console.log("invoke success");
                        service.invokeStatus.next(true);
                        if (getItemDetailHasRtnMsgProperty){
                            this.ngModel37 = getItemDetailParsedJSON.rtnMsg;
                        }else {
                            this.ngModel37 = getItemDetailParsedJSON;
                        }
                    }else if (getItemDetailData.toString().search(error) > 0 && getItemDetailData.toString().search(notFound) > 0) {
                        console.log("invoke fail, get error and not found message");
                        service.invokeStatus.next(false);
                    }else if (getItemDetailData.toString().search(error) > 0 && getItemDetailData.toString().search(authFail) > 0) {
                        console.log("invoke fail, get error and authentication fail message");
                        service.invokeStatus.next(false);
                    }else if (getItemDetailData.toString().search(isInit) > 0){
                        console.log("invoke fail, return message is init message");
                        service.invokeStatus.next(false);
                    }else {
                        console.log("invoke success");
                        service.invokeStatus.next(true);
                        if (getItemDetailHasRtnMsgProperty){
                            this.ngModel37 = getItemDetailParsedJSON.rtnMsg;
                        }else {
                            this.ngModel37 = getItemDetailParsedJSON;
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
            ItemDetailComponent.parameter_UID = params['UID'] == undefined ? ItemDetailComponent.parameter_UID : params['UID'];
            this.parameter_UID = ItemDetailComponent.parameter_UID;
            ItemDetailComponent.parameter_userID = params['userID'] == undefined ? ItemDetailComponent.parameter_userID : params['userID'];
            this.parameter_userID = ItemDetailComponent.parameter_userID;
            ItemDetailComponent.parameter_itemID = params['itemID'] == undefined ? ItemDetailComponent.parameter_itemID : params['itemID'];
            this.parameter_itemID = ItemDetailComponent.parameter_itemID;
            this.service.initialPage({
               'itemId': this.parameter_itemID,
               'bidderId': this.parameter_userID,
               'id': this.parameter_itemID,
                "getBiddingHistory": {
                    "request": null   ,
                    "itemId": null   ,
                    "id": null   
                    },
                "getItemDetail": {
                    "request": null   ,
                    "itemId": null   ,
                    "id": null   
                    }
            });
        });
        this.service.initialPage({
                'itemId': this.parameter_itemID,
                'bidderId': this.parameter_userID,
                'id': this.parameter_itemID,
                "getBiddingHistory": {
                    "request": null   ,
                    "itemId": null   ,
                    "id": null   
                    },
                "getItemDetail": {
                    "request": null   ,
                    "itemId": null   ,
                    "id": null   
                    }
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