import {Injectable} from "@angular/core";
import {HttpClient,} from "@angular/common/http";
import {RecipesService} from "./recipesService";
import {Recipe} from "./recipe.model";
import {map, tap} from "rxjs";
import {environment} from "../../environment";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipesService: RecipesService) { // HttpClient requires HttpClientModule to be imported in AppModule
    }

    storeRecipes() {
        const recipes = this.recipesService.getRecipes();
        this.httpClient.put(environment.apiUrl, recipes).subscribe(response => {
            console.log(response);
        });
    }

    fetchRecipes() {
        return this.httpClient.get<Recipe[]>(environment.apiUrl)
            .pipe(map(recipes => { // map is an operator, it operates on the array, and not each element
                    return recipes.map(recipe => { // this map loops each item to perform operations
                        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
                    });
                }),
                tap(recipes => {
                    this.recipesService.setRecipes(recipes);
                }));
    }
}
