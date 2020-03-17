import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MissionsComunicationService } from '../missions-comunication.service';

@Component({
  selector: 'ab-florida',
  templateUrl: './florida.component.html',
  styleUrls: ['./florida.component.css'],
})
export class FloridaComponent implements OnInit {
  messages$: Observable<any>;

  constructor(private missionsComunicationService: MissionsComunicationService) {}

  ngOnInit(): void {
    this.messages$ = this.missionsComunicationService.getMessages$();
  }
}
