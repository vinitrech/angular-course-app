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
  startedEditing: Subject<number> = new Subject<number>();

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientAdded.next(this.getIngredients())
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1); // slice returns a piece of the array, but it doesn't affect the original array. splice changes the original array by removing, replacing, or adding values and returns the affected values
    this.onIngredientAdded.next(this.getIngredients());
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.onIngredientAdded.next(this.getIngredients())
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.onIngredientAdded.next(this.ingredients.slice());
  }
}
