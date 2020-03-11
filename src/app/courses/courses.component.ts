import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'ab-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  course: any;

  constructor(route: ActivatedRoute) {
    route.params.subscribe(params => {
      const courseSlug = params.slug;
      this.course = environment.courses.find(c => c.slug === courseSlug);
    });
  }

  ngOnInit(): void {}
}
