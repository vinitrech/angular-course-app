import {
    Component,
    ComponentFactoryResolver,
    createComponent,
    OnDestroy,
    ViewChild,
    ViewContainerRef
} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnDestroy {
    isLoginMode: boolean = true;
    isLoading: boolean = false;
    @ViewChild(PlaceholderDirective) alertPlaceholder !: PlaceholderDirective; // ViewChild will search for the first occurrence of the informed type
    alertCloseSubscription: Subscription = new Subscription();

    // error: string = '';

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnDestroy(): void {
        if (this.alertCloseSubscription) {
            this.alertCloseSubscription.unsubscribe();
        }
    }

    // closeModal() {
    //     this.error = '';
    // }

    private showErrorAlert(message: string) {
        this.alertPlaceholder.viewContainerRef.clear();
        const alertComponent = this.alertPlaceholder.viewContainerRef.createComponent<AlertComponent>(AlertComponent);

        alertComponent.instance.message = message;
        this.alertCloseSubscription = alertComponent.instance.close.subscribe(() => {
            this.alertCloseSubscription.unsubscribe();
            this.alertPlaceholder.viewContainerRef.clear();
        });
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(formValue: NgForm) {
        if (!formValue.valid) {
            return
        }

        const email = formValue.value.email;
        const password = formValue.value.password;

        this.isLoading = true;
        // this.error = '';

        let authObservable: Observable<AuthResponseData>;

        if (this.isLoginMode) {
            authObservable = this.authService.login(email, password);
        } else {
            authObservable = this.authService.signup(email, password);
        }

        authObservable.subscribe({ // Subscribe now takes only 1 argument, other signatures are deprecated. Pass an object specifying the next, error and complete callbacks.
            next: (responseData) => {
                console.log(responseData);
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            },
            error: (errorMessage) => {
                // this.error = errorMessage
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        })

        formValue.reset();
    }
}
