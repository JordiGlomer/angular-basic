import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedalsPresenterComponent } from './pedals-presenter.component';

describe('PedalsPresenterComponent', () => {
  let component: PedalsPresenterComponent;
  let fixture: ComponentFixture<PedalsPresenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedalsPresenterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedalsPresenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
