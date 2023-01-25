import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../../shared/RecipesService";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe("", "", "", []);

  constructor(private recipeService: RecipesService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    // this.recipe = this.recipeService.getRecipe(+this.activeRoute.snapshot.params['id']) not needed if there is a 'subscribe' observable being used for this paramter

    this.activeRoute.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipe(+params['id'])
    })
  }

  addToShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }
}
