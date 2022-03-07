import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { isLoggedIn } from "./auth.selectors";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(isLoggedIn);
  }
}
