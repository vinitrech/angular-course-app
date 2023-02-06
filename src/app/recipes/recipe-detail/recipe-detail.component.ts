import {Component, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../../shared/recipesService";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe = new Recipe("", "", "", []);
  id: number = 0;

  constructor(private recipeService: RecipesService, private activeRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // this.recipe = this.recipeService.getRecipe(+this.activeRoute.snapshot.params['id']) not needed if there is a 'subscribe' observable being used for this paramter

    this.activeRoute.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipe(+params['id'])
      this.id = +params['id'];
    })
  }

  addToShoppingList() {
    this.recipeService.addIngredients(this.recipe.ingredients);
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["../"], {relativeTo: this.activeRoute});
  }
}
