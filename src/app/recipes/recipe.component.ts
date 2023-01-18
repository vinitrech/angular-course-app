import {Component, OnInit} from '@angular/core';
import {Recipe} from "../shared/recipe.model";
import {RecipesService} from "../shared/RecipesService";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: [RecipesService]
})
export class RecipeComponent implements OnInit {
  recipeClicked: Recipe | undefined;

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.recipesService.selectedRecipe.subscribe(
      (recipe: Recipe) => {
        this.recipeClicked = recipe;
      }
    );
  }
}
