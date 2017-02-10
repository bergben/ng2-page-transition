import { Component, animate, trigger, state, transition, style, Input } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import { defaultTransition } from './default-transition.animation';

@Component({
  selector: 'ng2-page-transition',
  template: '<div [@ng2ElementState]="animation.custom || animation.state"><ng-content></ng-content></div>',
  animations: [defaultTransition()],
})

export class Ng2PageTransition{
  @Input() scrollTop:boolean = true;
  @Input() onlyOnRoutes:string[] = [""];
  @Input() animation: any = {
      state: "leave",
      custom: false
  };
  constructor(private router: Router) {
    this.animation.state = "leave";
    router.events.subscribe((event) => {
      for(let i=0;i<this.onlyOnRoutes.length;i++){
        if(event.url && event.url.indexOf(this.onlyOnRoutes[i])>-1){
          if (event instanceof NavigationStart) {
            this.animation.state = "leave";
          }
          else if (event instanceof NavigationEnd) {
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
    });
  }
}