import {Ingredient} from "./ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 1),
    new Ingredient("Tomatoes", 1)
  ]

  onIngredientAdded: EventEmitter<Ingredient[]> = new EventEmitter<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientAdded.emit(this.getIngredients())
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.onIngredientAdded.emit(this.getIngredients())
  }
}
