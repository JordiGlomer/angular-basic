import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ab-display-presenter',
  templateUrl: './display-presenter.component.html',
  styleUrls: ['./display-presenter.component.css'],
})
export class DisplayPresenterComponent implements OnInit {
  @Input() model: string;
  @Input() currentSpeed: number;
  @Input() topSpeed: number;
  @Input() units: string;

  constructor() {}

  ngOnInit(): void {}

  getSpeedClass = () => (this.currentSpeed < this.getThreshold() ? 'good' : 'warning');

  private getThreshold = () => this.topSpeed * 0.8;
}
