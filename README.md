# ng2-page-transition
Simple Angular2 component to create a page transition animation on route changes.

## Features
All that this component does is listen for route changes and on NavigationStart it triggers an animation to fade out the current page and fade in the page on the new route. 
By default it also scrolls the page to the top on route changes, this can be disabled though.

## Install
```bash
$ npm install ng2-page-transition --save
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
