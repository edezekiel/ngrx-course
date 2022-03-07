import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Store } from '@ngrx/store';
import { Observable } from "rxjs";
import { AppState } from '../../store/reducers';
import { EditCourseDialogComponent } from "../edit-course-dialog/edit-course-dialog.component";
import { defaultDialogConfig } from "../shared/default-dialog-config";
import { selectAdvancedCourses, selectBeginnerCourses, selectPromoTotal } from '../store/courses.selectors';

@Component({
  selector: "home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  promoTotal$ = this.store.select(selectPromoTotal);

  loading$: Observable<boolean>;

  beginnerCourses$ = this.store.select(selectBeginnerCourses)

  advancedCourses$ = this.store.select(selectAdvancedCourses);

  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {

  }

  onAddCourse() {
    const dialogConfig = defaultDialogConfig();

    dialogConfig.data = {
      dialogTitle: "Create Course",
      mode: "create",
    };

    this.dialog.open(EditCourseDialogComponent, dialogConfig);
  }
}
