import { Component, OnInit } from '@angular/core';
import { MissionsComunicationService } from '../missions-comunication.service';

@Component({
  selector: 'ab-houston',
  templateUrl: './houston.component.html',
  styleUrls: ['./houston.component.css'],
})
export class HoustonComponent implements OnInit {
  constructor(private missionsComunicationService: MissionsComunicationService) {}

  ngOnInit(): void {}

  onStartClick() {
    this.missionsComunicationService.sendMessage({ icon: '🏁', subject: 'Start count down' });
  }
  onIgnitionClick() {
    this.missionsComunicationService.sendMessage({ icon: '🔥', subject: 'Ignition' });
  }
  onAbortClick() {
    this.missionsComunicationService.sendMessage({ icon: '🛑', subject: 'Abort' });
  }
}
