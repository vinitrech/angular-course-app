import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeComponent} from "./recipes/recipe.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "./shared/recipesResolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuardService} from "./auth/auth-guard.service";

const appRoutes: Routes = [{
  path: '', redirectTo: '/recipes', pathMatch: "full"
},
  {
    path: 'shopping-list', component: ShoppingListComponent
  },
  {
    path: 'recipes', component: RecipeComponent,
    canActivate: [AuthGuardService]
    , children: [{
      path: '', component: RecipeStartComponent
    },
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
      {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}]
  },
  {
    path: 'auth', component: AuthComponent
  }]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {

}
