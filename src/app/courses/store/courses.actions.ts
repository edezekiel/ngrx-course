import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Course } from "../model/course";

export const getAllCourses = createAction(
  "[Courses Resolver] Get All Courses Request"
);

export const getAllCoursesSuccess = createAction(
  "[Load Courses Effect] Get All Courses Success",
  props<{ courses: Course[] }>()
);

export const getAllCoursesFailure = createAction(
  "[Load Courses Effect] Get All Courses Failure"
);

export const updateCourse = createAction(
  "[Edit Course Dialog] Course Updated",
  props<{ update: Update<Course> }>()
);
