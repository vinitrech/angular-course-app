import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeComponent} from "./recipes/recipe.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";

const appRoutes: Routes = [{
  path: '', redirectTo: '/recipes', pathMatch: "full"
},
  {
    path: 'shopping-list', component: ShoppingListComponent
  },
  {
    path: 'recipes', component: RecipeComponent, children: [{
      path: '', component: RecipeStartComponent
    }, {
      path: ':id', component: RecipeDetailComponent
    }]
  }]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
