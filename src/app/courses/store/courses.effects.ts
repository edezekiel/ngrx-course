import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap } from "rxjs/operators";
import { CoursesHttpService } from "../services/courses-http.service";
import { CourseActions } from "./action-types";

@Injectable()
export class CoursesEffects {

  saveCourse$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(CourseActions.updateCourse),
        concatMap((action) =>
          this.coursesService.saveCourse(
            action.update.id,
            action.update.changes
          )
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private coursesService: CoursesHttpService
  ) {}
}
