import { Component, OnInit } from '@angular/core';
// import { ParameterService } from '../../shared/parameter.service';

@Component({
        selector: 'app-selabsidebar',
        templateUrl: './selabSidebar.component.html',
        styleUrls: ['./selabSidebar.component.css']
    })
export class SelabSidebarComponent implements OnInit {
//    constructor(private parameterService : ParameterService) {}
    constructor() {}

    parameter_UIDRxjs: any = null;
    parameter_UID = "";

    navItems = [
                    {
                name:'theme018ae', children:
                [
                            { name:'SendMessage', url:"SendMessage", icon: 'icon-cloud'},
                            { name:'ReceiveMessageList', url:"ReceiveMessageList", icon: 'icon-cloud'},
                            { name:'Registration', url:"Registration", icon: 'icon-cloud'},
                            { name:'LaunchItem', url:"LaunchItem", icon: 'icon-cloud'},
                            { name:'Login', url:"Login", icon: 'icon-cloud'},
                            { name:'Main', url:"Main", icon: 'icon-cloud'},
                            { name:'ItemDetail', url:"ItemDetail", icon: 'icon-cloud'},
                ]
            },
    ]


    ngOnInit(): void {
//        this.parameter_UIDRxjs = this.parameterService.parameter_UID$.subscribe((resp) => {
            // 更新
//            this.parameter_UID = resp;
//        });
    }

    ngOnDestroy(): void {
        // 取消訂閱
//        if (!!this.parameter_UIDRxjs) this.parameter_UIDRxjs.unsubscribe();
    }

}