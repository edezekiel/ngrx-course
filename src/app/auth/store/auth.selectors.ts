import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const authKey = "auth";

export const selectAuthState = createFeatureSelector<AuthState>(authKey);

export const selectAuth = (state: AuthState) => state.user;

export const isLoggedIn = createSelector(
  selectAuthState,
  (auth) => !!auth.user
);

export const isLoggedOut = createSelector(isLoggedIn, (user) => !user);
