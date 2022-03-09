import { Component, ChangeDetectionStrategy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { combineLatest } from "rxjs";
import { delay, map, tap } from "rxjs/operators";
import { Course } from "../model/course";
import { Lesson } from "../model/lesson";
import { CourseEntityService } from "../services/course-entity.service";
import { LessonEntityService } from "../services/lesson-entity.service";

@Component({
  selector: "course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseComponent implements OnInit {
  course$ = this.coursesService.entities$.pipe(
    map((cs) =>
      cs.find((c) => c.url === this.route.snapshot.paramMap.get("courseUrl"))
    )
  );

  lessons$ = combineLatest([this.lessonsService.entities$, this.course$]).pipe(
    tap(([lessons, course]) => {
      if (this.nextPage === 0) {
        this.loadLessonsPage(course);
      }
    }),
    map(([ls, c]: [Lesson[], Course]) => ls.filter((l) => l.courseId === c.id))
  );

  loading$ = this.lessonsService.loading$.pipe(delay(0));

  displayedColumns = ["seqNo", "description", "duration"];

  nextPage = 0;

  constructor(
    private coursesService: CourseEntityService,
    private lessonsService: LessonEntityService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  loadLessonsPage(course: Course) {
    this.lessonsService.getWithQuery({
      courseId: course.id.toString(),
      pageNumber: this.nextPage.toString(),
      pageSize: "3",
    });
    this.nextPage += 1;
  }
}
