import {Component, Input} from '@angular/core';
import {Recipe} from "../../../shared/recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = new Recipe("", "", "", []);
  @Input() index: number = 0;

  constructor() {
  }

}
