import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "./ingredient.model";
import {ShoppingListService} from "./ShoppingListService";

@Injectable()
export class RecipesService {
  selectedRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  private recipes: Recipe[] = [
    {
      name: "Recipe 1",
      description: "This recipe 1 is made with fire and water",
      imagePath: "https://picsum.photos/100",
      ingredients: [
        new Ingredient("Ingredient 1", 1),
        new Ingredient("Ingredient 2", 2),
      ]
    },
    {
      name: "Recipe 2",
      description: "This recipe 2 is made with fire and water",
      imagePath: "https://picsum.photos/100",
      ingredients: [
        new Ingredient("Ingredient 3", 3),
        new Ingredient("Ingredient 4", 4),
      ]
    },
  ]

  getRecipes() {
    return this.recipes.slice(); // slice used to send a copy to the client, not the actual instance of the array
  }

  addIngredients(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
  }
}
