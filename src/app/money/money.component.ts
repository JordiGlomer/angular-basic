import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ab-money',
  templateUrl: './money.component.html',
  styleUrls: ['./money.component.css'],
})
export class MoneyComponent implements OnInit {
  private urlapi = 'https://api.exchangeratesapi.io/latest';

  currentEuroRates: ApiModel = null;

  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    this.getCurrentEuroRates();
  }

  private getCurrentEuroRates() {
    const currencies = 'USD,GBP,CHF,JPY';

    const url = `${this.urlapi}?symbols=${currencies}`;

    this.httpClient.get<ApiModel>(url).subscribe(apiResult => (this.currentEuroRates = apiResult));

    // const x = this.httpClient.get(url);

    // x.subscribe({
    //   next: data => {
    //     console.log({ data });
    //   },
    //   error: error => {
    //     console.warn(error.message);
    //   },
    //   complete: () => {
    //     console.warn('The end...');
    //   },
    // });

    // x.subscribe(
    //   apiResult => {
    //     this.currentEuroRates = apiResult;
    //   },
    //   error => {
    //     console.warn(error.message);
    //   },
    //   () => {
    //     console.warn('The end...');
    //   }
    // );
  }
}

// {
//   "rates": {
//     "CHF": 1.0546,
//     "JPY": 117.76,
//     "USD": 1.1157,
//     "GBP": 0.90918
//   },
//   "base": "EUR",
//   "date": "2020-03-16"
// }

interface ApiModel{
  rates: any;
  base: string,
  date: string
}