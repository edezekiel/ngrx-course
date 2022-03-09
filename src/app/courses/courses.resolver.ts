import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, first, tap } from "rxjs/operators";
import { AppState } from "../store/reducers";
import { getAllCourses } from "./store/courses.actions";
import { areCoursesLoaded } from "./store/courses.selectors";

@Injectable({ providedIn: "root" })
export class CoursesResolver implements Resolve<any> {
  constructor(private store: Store<AppState>) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.store.pipe(
      select(areCoursesLoaded),
      tap((coursesLoaded) => {
        if (!coursesLoaded) {
          this.store.dispatch(getAllCourses());
        }
      }),
      filter((coursesLoaded) => coursesLoaded),
      first()
    );
  }
}
