import {Component, EventEmitter, Output} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe("Recipe 1", "This recipe 1 is made with fire and water", "https://picsum.photos/100"),
    new Recipe("Recipe 2", "This recipe 2 is made with fire and water", "https://picsum.photos/200"),
    new Recipe("Recipe 3", "This recipe 3 is made with fire and water", "https://picsum.photos/300"),
    new Recipe("Recipe 4", "This recipe 4 is made with fire and water", "https://picsum.photos/400"),
    new Recipe("Recipe 5", "This recipe 5 is made with fire and water", "https://picsum.photos/500")
  ]

  @Output() recipeClicked: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  onRecipeClicked(recipe: Recipe){
    this.recipeClicked.emit(recipe)
  }
}
