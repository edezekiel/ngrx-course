import { Injectable } from "@angular/core";
import { Actions, concatLatestFrom, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { tap, map, exhaustMap, catchError } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { AuthActions } from "./action-types";
import { loginFailure, loginSuccess } from "./auth.actions";
import { User } from "../model/user.model";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((user: User) => loginSuccess({ user })),
          catchError((error) => of(loginFailure()))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap((action) => {
          localStorage.setItem("user", JSON.stringify(action.user));
          this.router.navigateByUrl("/courses");
        })
      ),
    { dispatch: false }
  );

  loginFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginFailure),
        tap(() => alert("Login Failed"))
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
