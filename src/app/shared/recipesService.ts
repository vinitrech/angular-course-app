import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "./ingredient.model";
import {ShoppingListService} from "./shoppingListService";
import {Subject} from "rxjs";

@Injectable({providedIn: 'root'})
export class RecipesService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  // private recipes: Recipe[] = [
  //   {
  //     name: "Recipe 1",
  //     description: "This recipe 1 is made with fire and water",
  //     imagePath: "https://picsum.photos/100",
  //     ingredients: [
  //       new Ingredient("Ingredient 1", 1),
  //       new Ingredient("Ingredient 2", 2),
  //     ]
  //   },
  //   {
  //     name: "Recipe 2",
  //     description: "This recipe 2 is made with fire and water",
  //     imagePath: "https://picsum.photos/100",
  //     ingredients: [
  //       new Ingredient("Ingredient 3", 3),
  //       new Ingredient("Ingredient 4", 4),
  //     ]
  //   },
  // ]

  private recipes: Recipe[] = [];

  getRecipe(id: number) {
    return this.recipes[id];
  }

  getRecipes() {
    return this.recipes.slice(); // slice used to send a copy to the client, not the actual instance of the array
  }

  addIngredients(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }
}
