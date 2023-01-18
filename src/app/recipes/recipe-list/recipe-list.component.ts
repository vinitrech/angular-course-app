import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {RecipesService} from "../../shared/RecipesService";

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = []

  constructor(private recipesService: RecipesService) {
  }

  ngOnInit() {
    this.recipes = this.recipesService.getRecipes()
  }
}
