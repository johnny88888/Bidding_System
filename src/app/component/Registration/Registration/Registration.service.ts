import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import { RxStompService } from '@stomp/ng2-stompjs';
import Swal from 'sweetalert2'

@Injectable()
export class RegistrationService {
    private _output = "output";
    private _pageInteraction = "pageInteraction";
    private _init = "init"
    private _pageName = "Registration";

    serviceStatus: BehaviorSubject<boolean> = new BehaviorSubject <boolean> (false);
    outputOperationStatus: BehaviorSubject<{}> = new BehaviorSubject < {} > ({});
    invokeStatus: BehaviorSubject<boolean> = new BehaviorSubject <boolean> (false);


    constructor(private rxStompService: RxStompService) {
        this.rxStompService.watch(`/user/${this._pageName}/${this._output}`).subscribe( response => {
            let message = JSON.parse(response['body']);
            let stateData = this.outputOperationStatus.getValue();
            let op = message['operation'];
            if (!(op in stateData)) {
                stateData[op] = {};
            }
            if(this.checkStatus(message['status_code'])){
                stateData[op]["data"] = message["content"];
                this.outputOperationStatus.next(stateData);
                this.serviceStatus.next(message['isConstructorInitialized']);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops something wrong!',
                    text: message['content'],
                    footer: '<a href>Why do I have this issue?</a>'
                })
                stateData[op]["data"] = "Error";
                this.outputOperationStatus.next(stateData);
            }
        });
    }


    initialPage(parameters){
        let controllerUrl = `/app/${this._pageName}/${this._init}`;
        this.rxStompService.publish(
        {
            destination: controllerUrl,
            body: JSON.stringify(parameters)
        });
    }

    onMessage(message:{}){
        let controllerUrl = `/app/${this._pageName}/${this._pageInteraction}/${message['operation']}UI`;
        this.rxStompService.publish(
        {
            destination: controllerUrl,
            body: JSON.stringify(message['content'])
        });
    }

    ngOnDestroy(){

    }

    checkStatus(status_code){
        // 200 series is ok
        if(Math.floor(status_code/100)==2){
            return true;
        }else{
            return false;
        }
    }

}