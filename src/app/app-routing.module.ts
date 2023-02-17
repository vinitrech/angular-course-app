import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const appRoutes: Routes = [{
    path: '', redirectTo: '/recipes', pathMatch: "full"
},
    {
        path: 'recipes',
        loadChildren: () => import('./recipes/recipes.module').then(module => module.RecipesModule)
        // this tells angular to lazy load the module
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('./shopping-list/shopping-list.module').then(module => module.ShoppingListModule)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(module => module.AuthModule)
    }]

@NgModule({
    imports: [
        // PreloadAllModules will load the initial bundle first, then download the other modules as soon as possible, when the user is navigating, for example
        RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}) // forRoot should be used only once, inside other modules it is correct to use forChild
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {

}
