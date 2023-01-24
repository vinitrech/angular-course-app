import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../../shared/recipe.model";
import {RecipesService} from "../../../shared/RecipesService";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = new Recipe("", "", "", []);

  constructor() {
  }

}
