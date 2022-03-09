import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { filter, first, map, tap } from "rxjs/operators";
import { CourseEntityService } from "./course-entity.service";

@Injectable({ providedIn: "root" })
export class CoursesResolver implements Resolve<boolean> {
  constructor(private entityService: CourseEntityService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.entityService.loaded$.pipe(
      tap((loaded: boolean) => {
        if (!loaded) {
          this.entityService.getAll();
        }
      }),
      filter((loaded: boolean) => !!loaded),
      first()
    );
  }
}
