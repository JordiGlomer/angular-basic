import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MissionsComunicationService {
  private messages: object[] = [{ icon: '👩‍🚀', subject: 'Crew on board' }];
  private messages$ = new BehaviorSubject<any[]>(this.messages);

  constructor() {}

  public getMessages$ = () => this.messages$.asObservable();

  public sendMessage = (message: object) => {
    this.messages.push(message);
    this.messages$.next(this.messages);
  };
}
