import { Component, animate, trigger, state, transition, style, Input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel } from '@angular/router';
import { defaultPageTransition } from './default-transition.animation';

@Component({
  selector: 'ng2-page-transition',
  template: '<div [@ng2ElementState]="animation.custom || animation.state"><ng-content></ng-content></div>',
  animations: [defaultPageTransition()],
})

export class Ng2PageTransition{
  @Input() scrollTop:boolean = true;
  @Input() onlyOnRoutes:string[] = [""];
  @Input() animation: any = {
      state: "leave",
      custom: false,
      enterDelay: 0
  };
  delayPromise:Promise<any>;
  constructor(private router: Router) {
    this.animation.state = "leave";
    router.events.subscribe((event) => {
      for(let i=0;i<this.onlyOnRoutes.length;i++){
        if(event.url && event.url.indexOf(this.onlyOnRoutes[i])>-1){
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
          return;
        }
      }
    });
  }
}