import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { Course } from "../../model/course";
import { CourseActions } from "../action-types";

export const coursesKey = "courses";

export interface CoursesState extends EntityState<Course> {}

export const adapter = createEntityAdapter<Course>();

export const initialCoursesState = adapter.getInitialState();

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.getAllCoursesSuccess, (state, action) =>
    adapter.addMany(action.courses, state)
  )
);

export const { selectAll } = adapter.getSelectors();
