import { Component, OnInit } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from "@angular/router";
import { Store } from "@ngrx/store";
import { loginSuccess, logout } from "./auth/store/auth.actions";
import { isLoggedOut } from "./auth/store/auth.selectors";
import { AppState } from "./store/reducers";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loading = true;

  isLoggedOut$ = this.store.select(isLoggedOut);

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this._setUserFromLocalStorage();

    this.router.events.subscribe((event) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(logout());
  }

  private _setUserFromLocalStorage() {
    const userProfile = localStorage.getItem("user");
    if (userProfile) {
      this.store.dispatch(loginSuccess({ user: JSON.parse(userProfile) }));
    }
  }
}
