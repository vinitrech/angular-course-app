import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipeComponent} from "./recipe.component";
import {AuthGuardService} from "../auth/auth-guard.service";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipesResolverService} from "../shared/recipesResolver.service";

const routes: Routes = [
    {
        path: '', component: RecipeComponent,
        canActivate: [AuthGuardService]
        , children: [{
            path: '', component: RecipeStartComponent
        },
            {path: 'new', component: RecipeEditComponent},
            {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
            {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)], // This is the correct use of forChild, not forRoot. forRoot can only be used on the root module. Any other routes are blended with them.
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}
