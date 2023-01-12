import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  featureSelected: string = "recipes"

  onChangeFeatureSelected(feature: string): void{
    this.featureSelected = feature;
  }
}
