import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent {
  isMenuCollapsed: boolean = true
  @Output() featureSelected: EventEmitter<string> = new EventEmitter<string>();

  onSelect(feature: string) {
    this.isMenuCollapsed = true
    this.featureSelected.emit(feature);
  }
}
