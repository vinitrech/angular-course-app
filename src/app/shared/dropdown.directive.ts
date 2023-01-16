import {Directive, ElementRef, HostBinding, HostListener, Renderer2, ViewChild} from "@angular/core";
import {Element} from "@angular/compiler";

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  isOpen: boolean = false;

  @HostListener('click') onClick() {
    this.isOpen = !this.isOpen;
    console.log("Open dropdown: " + this.isOpen);
  }
}
