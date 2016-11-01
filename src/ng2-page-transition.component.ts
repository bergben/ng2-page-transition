import { Component, animate, trigger, state, transition, style, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

@Component({
  selector: 'ng2-page-transition',
  template: '<div style="opacity:0;" [@ng2ElementState]="ng2PageTransition"><ng-content></ng-content></div>',
  animations: [
    trigger("ng2ElementState", [
      state("inactive", style({
        opacity: 0,
      })),
      state("active", style({
        opacity: 1,
      })),
      transition("* => active", animate("600ms ease-in")),
      transition("* => inactive", animate("300ms ease-out")),
    ])
  ]
})
export class Ng2PageTransition{
  @Input() scrollTop = true;
  ng2PageTransition: string = "inactive";
  constructor(private router: Router) {
    this.ng2PageTransition = "inactive";
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.ng2PageTransition = "inactive";
        setTimeout( () => {
            if(this.scrollTop){
              window.scrollTo(0, 0);
            }
            this.ng2PageTransition = "active";
        },300);
      }
    });
  }
}