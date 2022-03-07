import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { switchMap, map, catchError } from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";
import { CourseActions } from "./action-types";
import { getAllCoursesFailure, getAllCoursesSuccess } from "./courses.actions";

@Injectable()
export class CoursesEffects {
  getAllCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.getAllCourses),
      switchMap((action) =>
        this.coursesService.findAllCourses().pipe(
          map((courses) => getAllCoursesSuccess({ courses })),
          catchError((err) => of(getAllCoursesFailure()))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesHttpService
  ) {}
}
