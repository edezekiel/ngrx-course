import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CoursesState } from "./reducers";
import * as fromCourses from "./reducers";

export const coursesKey = "courses";

export const selectCoursesState =
  createFeatureSelector<CoursesState>(coursesKey);

export const selectAllCourses = createSelector(
  selectCoursesState,
  fromCourses.selectAll
);

export const selectBeginnerCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "BEGINNER")
);

export const selectAdvancedCourses = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.category === "ADVANCED")
);

export const selectPromoTotal = createSelector(
  selectAllCourses,
  (courses) => courses.filter((course) => course.promo).length
);
