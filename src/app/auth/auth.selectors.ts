import { createSelector } from "@ngrx/store";
import { AppState } from "../reducers";
import { AuthState } from "./reducers";

export const selectAuth = (state: AuthState) => state.user;

export const isLoggedOut = createSelector(
  (state) => state["auth"],
  (auth) => !auth.user
);
