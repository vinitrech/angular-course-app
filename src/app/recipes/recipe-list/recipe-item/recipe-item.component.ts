import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Recipe} from "../../../shared/recipe.model";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe: Recipe = {name: "", description: "", imagePath: ""};
  @Output() recipeItemClicked: EventEmitter<void> = new EventEmitter<void>();

  onRecipeItemClicked(){
    console.log("Recipe Item Clicked - recipe-item.component")
    this.recipeItemClicked.emit()
  }
}
