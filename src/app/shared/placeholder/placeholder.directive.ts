import {Directive, ViewContainerRef} from "@angular/core";

@Directive({
    selector: "[appPlaceholder]"
})
export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) { // viewContainerRef will contain a reference to the point where the directive is used;
    }
}

