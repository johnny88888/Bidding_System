import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { InjectableRxStompConfig, RxStompService, rxStompServiceFactory } from '@stomp/ng2-stompjs';
import { RxStompConfig } from './config/RxStompConfig';


// Import angular material modules
import { AngularMaterialModule } from "./angular-material.module";


// Import fortawesome module
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';


// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { IvyCarouselModule } from 'angular-responsive-carousel';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


// Import containers
import { DefaultLayoutComponent } from './containers';
import { SelabSidebarComponent } from './component/SelabSidebar/selabSidebar.component';
import { AsidebarComponent } from './component/Asidebar/asidebar.component';


import { input60Component } from "./component/Registration/input60/input60.component";
import { input61Component } from "./component/Registration/input61/input61.component";
import { input62Component } from "./component/Registration/input62/input62.component";
import { input63Component } from "./component/Registration/input63/input63.component";
import { ItemDetailComponent } from "./component/ItemDetail/ItemDetail/ItemDetail.component";
import { table123Component } from "./component/ItemDetail/table123/table123.component";
import { ReceiveMessageListComponent } from "./component/ReceiveMessageList/ReceiveMessageList/ReceiveMessageList.component";
import { button64Component } from "./component/Registration/button64/button64.component";
import { input89Component } from "./component/SendMessage/input89/input89.component";
import { text128Component } from "./component/ItemDetail/text128/text128.component";
import { RegistrationComponent } from "./component/Registration/Registration/Registration.component";
import { form49Component } from "./component/Login/form49/form49.component";
import { text129Component } from "./component/ItemDetail/text129/text129.component";
import { LaunchItemComponent } from "./component/LaunchItem/LaunchItem/LaunchItem.component";
import { table96Component } from "./component/ReceiveMessageList/table96/table96.component";
import { form88Component } from "./component/SendMessage/form88/form88.component";
import { table76Component } from "./component/Main/table76/table76.component";
import { SendMessageComponent } from "./component/SendMessage/SendMessage/SendMessage.component";
import { input105Component } from "./component/ItemDetail/input105/input105.component";
import { input50Component } from "./component/Login/input50/input50.component";
import { input51Component } from "./component/Login/input51/input51.component";
import { input74Component } from "./component/Main/input74/input74.component";
import { input145Component } from "./component/LaunchItem/input145/input145.component";
import { button53Component } from "./component/Login/button53/button53.component";
import { button75Component } from "./component/Main/button75/button75.component";
import { input90Component } from "./component/SendMessage/input90/input90.component";
import { input91Component } from "./component/SendMessage/input91/input91.component";
import { input142Component } from "./component/LaunchItem/input142/input142.component";
import { input141Component } from "./component/LaunchItem/input141/input141.component";
import { button106Component } from "./component/ItemDetail/button106/button106.component";
import { input144Component } from "./component/LaunchItem/input144/input144.component";
import { input143Component } from "./component/LaunchItem/input143/input143.component";
import { LoginComponent } from "./component/Login/Login/Login.component";
import { form127Component } from "./component/ItemDetail/form127/form127.component";
import { button146Component } from "./component/LaunchItem/button146/button146.component";
import { form104Component } from "./component/ItemDetail/form104/form104.component";
import { form59Component } from "./component/Registration/form59/form59.component";
import { form140Component } from "./component/LaunchItem/form140/form140.component";
import { button52Component } from "./component/Login/button52/button52.component";
import { text130Component } from "./component/ItemDetail/text130/text130.component";
import { MainComponent } from "./component/Main/Main/Main.component";
import { text131Component } from "./component/ItemDetail/text131/text131.component";
import { button92Component } from "./component/SendMessage/button92/button92.component";
import { form73Component } from "./component/Main/form73/form73.component";


const APP_CONTAINERS = [
    DefaultLayoutComponent
];


// Import coreUI module
import {
    AppAsideModule,
    AppBreadcrumbModule,
    AppHeaderModule,
    AppFooterModule,
    AppSidebarModule,
} from '@coreui/angular';


// Import routing module
import { AppRoutingModule } from './app.routing';



@NgModule({
imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    AngularMaterialModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    IvyCarouselModule,
],
declarations: [
    input60Component,
    input61Component,
    input62Component,
    input63Component,
    ItemDetailComponent,
    table123Component,
    ReceiveMessageListComponent,
    button64Component,
    input89Component,
    text128Component,
    RegistrationComponent,
    form49Component,
    text129Component,
    LaunchItemComponent,
    table96Component,
    form88Component,
    table76Component,
    SendMessageComponent,
    input105Component,
    input50Component,
    input51Component,
    input74Component,
    input145Component,
    button53Component,
    button75Component,
    input90Component,
    input91Component,
    input142Component,
    input141Component,
    button106Component,
    input144Component,
    input143Component,
    LoginComponent,
    form127Component,
    button146Component,
    form104Component,
    form59Component,
    form140Component,
    button52Component,
    text130Component,
    MainComponent,
    text131Component,
    button92Component,
    form73Component,
    SelabSidebarComponent,
    AsidebarComponent,
    AppComponent,
    ...APP_CONTAINERS,
],
entryComponents: [
],
providers: [
    {
        provide: LocationStrategy,
        useClass: HashLocationStrategy
    },
    {
        provide: InjectableRxStompConfig,
        useValue: RxStompConfig,
    },
    {
        provide: RxStompService,
        useFactory: rxStompServiceFactory,
        deps: [InjectableRxStompConfig],
    }
],
bootstrap: [ AppComponent ]
})

export class AppModule {
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas, far, fab);
  }
}