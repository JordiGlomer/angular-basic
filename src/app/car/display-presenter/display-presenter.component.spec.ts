import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayPresenterComponent } from './display-presenter.component';

describe('DisplayPresenterComponent', () => {
  let component: DisplayPresenterComponent;
  let fixture: ComponentFixture<DisplayPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
