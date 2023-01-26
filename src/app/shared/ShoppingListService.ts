import {Ingredient} from "./ingredient.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 1),
    new Ingredient("Tomatoes", 1)
  ]

  onIngredientAdded: Subject<Ingredient[]> = new Subject<Ingredient[]>();

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientAdded.next(this.getIngredients())
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.onIngredientAdded.next(this.getIngredients())
  }
}
