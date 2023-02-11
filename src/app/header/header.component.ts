import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/user.model";

@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {
  loggedUserSubscription: Subscription = new Subscription();
  isMenuCollapsed: boolean = true;
  isAuthenticated: boolean = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {

  }

  ngOnInit() {
    this.loggedUserSubscription = this.authService.loggedUser.subscribe((user) => {
      this.isAuthenticated = !!user; // checks if user is not null
    });
  }

  ngOnDestroy() {
    this.loggedUserSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe()
  }

  onLogout() {
    this.authService.logout();
  }
}
