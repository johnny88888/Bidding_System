import { Injectable} from '@angular/core';
import { Router, ActivatedRoute, ParamMap, NavigationExtras } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private router: Router, private route: ActivatedRoute) {}

    navigate(path, data?, watchVariable?: BehaviorSubject<any>) {
        let navigationExtras: NavigationExtras;
        if(null != data){
            navigationExtras = {state:{passingParam:data}};
            console.log("navigationExtras");
            console.log(navigationExtras);
        }
        console.log(this.router)
        if (watchVariable) {
            watchVariable.subscribe(
                value => {
                    if (value && value != "Error") {
                        let url = data != null ? ["/index", path, data] : ["/index", path]
                        if(null != navigationExtras){
                            this.router.navigate(url, navigationExtras);
                        }else {
                            this.router.navigate(url);
                        }
                    } else if (value == "Error") {
                        console.log("service component invoke failed");
                    }
                }
            )
        }else{
            let url = data != null ? ["/index", path, data] : ["/index", path]
            if(null != navigationExtras){
                this.router.navigate(url, navigationExtras);
            }else {
                this.router.navigate(url);
            }
        }
    }

    getCurrentNavigation():any{
        return this.router.getCurrentNavigation().extras.state.passingParam;
    }



}


