import { createAction, props } from "@ngrx/store";
import { User } from "../model/user.model";

export const login = createAction(
  "[Login Page] User Login",
  props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
  "[Login Page] User Login Success",
  props<{ user: User }>()
);

export const loginFailure = createAction("[Login Page] User Login Failure");

export const logout = createAction("[Top Menu] Logout");
