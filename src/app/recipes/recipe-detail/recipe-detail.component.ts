import {Component, Input} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";

@Component({
  selector: 'app-recipes-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe = new Recipe("", "", "")
}
