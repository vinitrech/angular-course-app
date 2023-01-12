import {Component} from '@angular/core';
import {Recipe} from "../shared/recipe.model";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {
  recipeClicked: Recipe | undefined;

  onRecipeClicked(recipe: Recipe) {
    this.recipeClicked = recipe;
  }
}
