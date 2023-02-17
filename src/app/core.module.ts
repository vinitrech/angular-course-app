import {NgModule} from "@angular/core";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {LoggingService} from "./logging.service";

@NgModule({
    providers: [ // services and interceptors don't need to be exported
        { // Interceptors services should not be provided in root like other services, but like this
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ]
})
export class CoreModule {
}
