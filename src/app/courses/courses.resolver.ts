import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { AppState } from "../store/reducers";
import { getAllCourses } from "./store/courses.actions";

@Injectable({ providedIn: "root" })
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.store.pipe(
      tap(() => {
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(getAllCourses());
        }
      }),
      first(),
      finalize(() => (this.loading = false))
    );
  }
}
