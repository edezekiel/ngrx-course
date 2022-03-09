import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Course } from "../model/course";

export const updateCourse = createAction(
  "[Edit Course Dialog] Course Updated",
  props<{ update: Update<Course> }>()
);
