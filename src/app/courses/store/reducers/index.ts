import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { compareCourses, Course } from "../../model/course";
import { CourseActions } from "../action-types";

export const coursesKey = "courses";

export interface CoursesState extends EntityState<Course> {
  allCoursesLoaded: boolean;
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
  allCoursesLoaded: false,
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.getAllCoursesSuccess, (state, action) =>
    adapter.addMany(action.courses, { ...state, allCoursesLoaded: true })
  )
);

export const { selectAll } = adapter.getSelectors();
