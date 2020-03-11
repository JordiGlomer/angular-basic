import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'ab-pedals-presenter',
  templateUrl: './pedals-presenter.component.html',
  styleUrls: ['./pedals-presenter.component.css'],
})
export class PedalsPresenterComponent implements OnInit {
  @Input() brakeDisabled: boolean;
  @Input() throttleDisabled: boolean;
  @Output() brake = new EventEmitter<number>();
  @Output() throttle = new EventEmitter<number>();

  constructor() {}

  ngOnInit(): void {}
}
