import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'ab-rockets',
  templateUrl: './rockets.component.html',
  styleUrls: ['./rockets.component.css'],
})
export class RocketsComponent implements OnInit {
  private rocketsApi = 'https://launchlibrary.net/1.4/';
  nextLaunches$: Observable<any> = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getNextLaunches();
  }

  private getNextLaunches() {
    const url = this.rocketsApi + 'launch/next/5';
    this.nextLaunches$ = this.httpClient.get<any>(url).pipe(
      map(apiData => apiData.launches),
      map(launchesArray =>
        launchesArray.map(launch => ({
          name: launch.name,
          status: launch.status,
          scheduled: launch.net,
        }))
      ),
      map(customLaunches =>
        customLaunches.map(launch => ({
          ...launch,
          statusColor: launch.status === 1 ? 'green' : 'red',
        }))
      ),
      tap(rockets => console.log('num rockets:' + rockets.length))
    );
  }
}
