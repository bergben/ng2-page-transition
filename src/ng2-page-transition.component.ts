import { Component, animate, trigger, state, transition, style, Input, Inject, forwardRef} from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { defaultPageTransition } from './default-transition.animation';

@Component({
  selector: 'ng2-page-transition',
  template: '<div [@ng2ElementState]="animation.custom || animation.state"><ng-content></ng-content></div>',
  animations: [defaultPageTransition()],
})

export class Ng2PageTransitionComponent{
  @Input() scrollTop:boolean = true;
  @Input() onlyOnRoutes:string[] = [""];
  @Input() ignoreOnRoutes:string[] = [""];
  @Input() animation: any = {
      state: "leave",
      custom: false,
      enterDelay: 0
  };
  delayPromise:Promise<any>;
  constructor(@Inject(forwardRef(() => Router)) private router: Router) {
    this.animation.state = "leave";
    router.events.subscribe(event => this.routerSubscription(event));
  }
  private routerSubscription(event:any){
    if(this.shouldTriggerForRoute(event.url)){
      if (event instanceof NavigationStart) {
        this.animation.state = "leave";
        this.delayPromise = new Promise((resolve, reject) => {
                window.setTimeout(()=>{
                    resolve(true);
                }, this.animation.enterDelay);
            }
        );
      }
      else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        if(typeof this.delayPromise !=="undefined"){
          this.delayPromise.then(()=>{
              this.animation.state = "out";
              if(this.scrollTop){
                window.scrollTo(0, 0);
              }
              setTimeout(()=>{
                this.animation.state = "enter";
              },0);
          });
        }
        else{
            this.animation.state = "out";
            if(this.scrollTop){
              window.scrollTo(0, 0);
            }
            setTimeout(()=>{
              this.animation.state = "enter";
            },0);
        }
      }
    }
  }
  private shouldTriggerForRoute(url:string):boolean{
    return this.passesOnlyOnRoutes(url) && this.passesIgnoreOnRoutes(url);
  }
  private passesOnlyOnRoutes(url:string):boolean{
      if(!url){
        return false;
      }
      for(let i=0;i<this.onlyOnRoutes.length;i++){
        if(url.indexOf(this.onlyOnRoutes[i])>-1){
          return true;
        }
      }
      return false;
  }
  private passesIgnoreOnRoutes(url:string):boolean{
      if(!url){
        return false;
      }
      let filteredRoutes=this.ignoreOnRoutes.filter(route => { return url.indexOf(route)>-1});
      if(filteredRoutes.length && filteredRoutes.length>0){
        return false;
      }
      return true;
  }
}