import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {LoggingService} from "../logging.service";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent
    ],
    imports: [
        FormsModule,
        ShoppingListRoutingModule,
        SharedModule
    ],
    // Services provided in Lazy-loaded modules create a separate instance for the module
    // providers: [
    //     LoggingService
    // ]
})
export class ShoppingListModule {
}
