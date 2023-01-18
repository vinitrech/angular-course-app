import {Component, Input} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../../shared/RecipesService";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe = new Recipe("", "", "", [])

  constructor(private recipeService: RecipesService){}

  addToShoppingList(){
    this.recipeService.addIngredients(this.recipe.ingredients);
  }
}
