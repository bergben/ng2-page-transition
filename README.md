[![Join the chat at https://gitter.im/bergben/bergben](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bergben/bergben?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# ng2-page-transition
Simple Angular2 component to create a page transition animation on route changes.

## Features
All that this component does is listen for route changes and on NavigationStart it triggers an animation to fade out the current page and fade in the page on the new route. 
By default it also scrolls the page to the top on route changes, this can be disabled though.

## Install
```bash
$ npm install ng2-page-transition --save
```
Add web-animations-js if you haven't done so already to support all browsers (see https://angular.io/docs/ts/latest/guide/animations.html) 

```bash
$ npm install web-animations-js --save
```

## Usage
### Import the component
```TypeScript
// app.module.ts
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router'; //Router is required for the component to work
import {BrowserModule} from '@angular/platform-browser';
import { Ng2PageTransition } from "ng2-page-transition"; // <-- import the component
import {MyComponent} from './my.component';

@NgModule({
    imports: [BrowserModule,
              RouterModule.forRoot() //Router is required
             ],
    declarations: [MyComponent, Ng2PageTransition],  // <-- include it in your app module
    bootstrap: [MyComponent]
})
export class MyAppModule {}
```

### Wrap content in your template
```html
<!-- my.component.html -->
<ng2-page-transition>
    <router-outlet></router-outlet>
    Some other content
</ng2-page-transition>
```

## Options
### scrollTop
By default the component scrolls to top on route changes, you can disable this by setting `[scrollTop]="false"`
```html
<!-- my.component.html -->
<ng2-page-transition [scrollTop]="false">
    <router-outlet></router-outlet>
    Some other content
</ng2-page-transition>
```
### onlyOnRoutes
By default the transition will take place on any route change. You can activate the transition only on routes that contain one or more certain strings:  
```html
<!-- my.component.html -->
<ng2-page-transition [onlyOnRoutes]="['blog']">
    <router-outlet></router-outlet>
    Some other content
</ng2-page-transition>
```
onlyOnRoutes takes an array of strings, in the example above the transition would only happen on any route containing "blog" in the url.

### Custom transition
If you want a different animation than the default fade out and in then you can do that like so:
```html
<!-- my.component.html -->
<ng2-page-transition [animation]="customAnimation">
    <div [@ng2ElementState]="customAnimation.state">
        Some other content
    </div>
</ng2-page-transition>
```
```TypeScript
 //my.component.ts
 [...]
 import { customTransition } from './custom-transition.animation';

@Component({
  selector: 'my-component', 
  [...]
  animations: [customTransition()],
})
export class MyComponent {
  customAnimation:any = {custom:true, state:""};
}
```

```TypeScript
 //custom-transition.animation.ts
import {trigger, state, animate, style, transition, AnimationEntryMetadata} from '@angular/core';

export function customTransition():AnimationEntryMetadata {
  return slideOutAndIn();
}

function slideOutAndIn():AnimationEntryMetadata {
  return trigger('ng2ElementState', [
    state('leave', style({
        position:'fixed', 
        width:'100%'
    })),
    state('enter', style({
        position:'fixed', 
        width:'100%'
    })),
    transition('* => enter', [
        style({transform: 'translateX(100%)'}),
        animate('0.5s ease-in-out', style({transform: 'translateX(0%)'}))
    ]),
    transition('* => leave', [
      style({transform: 'translateX(0%)'}),
      animate('0.5s ease-in-out', style({transform: 'translateX(-100%)'}))
    ]),
  ]);
}
```
`customAnimation.state` has three possible states: "enter", "leave" and "out". "out" is set on the router event NavigationEnd (see https://github.com/bergben/ng2-page-transition/blob/master/src/ng2-page-transition.component.ts#L36)

#### enterDelay
You can wait for the leaving animation to complete:
```TypeScript
 //my.component.ts
 [...]
  customAnimation:any = {custom:true, state:"", enterDelay: 500};
```
In this case the entering animation would be delayed by 500 ms, allowing the leaving animation which takes 500ms to complete.


## To-do
 - Provide a demo
