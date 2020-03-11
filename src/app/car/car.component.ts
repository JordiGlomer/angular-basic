import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  car: CarModel;
  disableBrake: boolean;
  disableThrottle: boolean;

  constructor() {}

  ngOnInit(): void {
    this.car = { name: 'Roadster', maxSpeed: 120, currentSpeed: 0 };
    this.checkLimits();
  }
  onBrake(drive: number) {
    this.car.currentSpeed -= this.getDelta(drive);
    this.checkLimits();
  }
  onThrottle(drive: number) {
    this.car.currentSpeed += this.getDelta(drive);
    this.checkLimits();
  }

  private getDelta = (drive: number) => drive + (this.car.maxSpeed - this.car.currentSpeed) / 10;
  private checkLimits() {
    this.disableBrake = false;
    this.disableThrottle = false;
    if (this.car.currentSpeed <= 0) {
      this.car.currentSpeed = 0;
      this.disableBrake = true;
    } else if (this.car.currentSpeed >= this.car.maxSpeed) {
      this.car.currentSpeed = this.car.maxSpeed;
      this.disableThrottle = true;
    }
  }
}

export interface CarModel {
  name: string;
  maxSpeed: number;
  currentSpeed: number;
}
