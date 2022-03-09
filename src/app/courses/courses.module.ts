import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { RouterModule, Routes } from "@angular/router";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { CourseComponent } from "./course/course.component";
import { CoursesCardListComponent } from "./courses-card-list/courses-card-list.component";
import { CoursesResolver } from "./courses.resolver";
import { EditCourseDialogComponent } from "./edit-course-dialog/edit-course-dialog.component";
import { HomeComponent } from "./home/home.component";
import { CoursesHttpService } from "./services/courses-http.service";
import { CoursesEffects } from "./store/courses.effects";
import * as fromCourses from "./store/reducers";

export const coursesRoutes: Routes = [
  {
    path: "",
    component: HomeComponent,
    resolve: {
      courses: CoursesResolver,
    },
  },
  {
    path: ":courseUrl",
    component: CourseComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    RouterModule.forChild(coursesRoutes),
    EffectsModule.forFeature([CoursesEffects]),
    StoreModule.forFeature(fromCourses.coursesKey, fromCourses.coursesReducer),
  ],
  declarations: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent,
  ],
  exports: [
    HomeComponent,
    CoursesCardListComponent,
    EditCourseDialogComponent,
    CourseComponent,
  ],
  entryComponents: [EditCourseDialogComponent],
  providers: [CoursesHttpService],
})
export class CoursesModule {
  constructor() {}
}
