import { Component } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { AppState } from "../../store/reducers";
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { CourseEntityService } from "../services/course-entity.service";
import { defaultDialogConfig } from "../shared/default-dialog-config";

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent {
  advancedCourses$ = this.coursesEntityService.entities$.pipe(
    map((cs) => cs.filter((c) => c.category === "ADVANCED"))
  );
  beginnerCourses$ = this.coursesEntityService.entities$.pipe(
    map((cs) => cs.filter((c) => c.category === "BEGINNER"))
  );
  promoTotal$ = this.coursesEntityService.entities$.pipe(
    map((cs) => cs.filter((c) => c.promo).length)
  );

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private coursesEntityService: CourseEntityService
  ) {}

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
