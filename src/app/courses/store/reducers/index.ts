import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { compareCourses, Course } from "../../model/course";
import { CourseActions } from "../action-types";

export const coursesKey = "courses";

export interface CoursesState extends EntityState<Course> {
}

export const adapter = createEntityAdapter<Course>({
  sortComparer: compareCourses,
});

export const initialCoursesState = adapter.getInitialState({
});

export const coursesReducer = createReducer(
  initialCoursesState,
  on(CourseActions.updateCourse, (state, action) =>
    adapter.updateOne(action.update, state)
  )
);

export const { selectAll } = adapter.getSelectors();
