import {Component, OnInit} from '@angular/core';
import {Recipe} from "../shared/recipe.model";
import {RecipesService} from "../shared/RecipesService";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

  }
}
