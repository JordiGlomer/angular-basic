import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicConverterComponent } from './dynamic-converter.component';

describe('DynamicConverterComponent', () => {
  let component: DynamicConverterComponent;
  let fixture: ComponentFixture<DynamicConverterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicConverterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
