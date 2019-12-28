import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScrapingClient {
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'text/html'
    }),
    responseType: 'text',
    body: null
  };
  constructor(private http: HttpClient) {}

  public async getHtmlAsync(url: string): Promise<string> {
    const result = await this.http
      .get(this.proxyUrl + url, this.httpOptions)
      .toPromise();
    console.log('res', result);

    const response: string = result.toString();
    return response;
  }
}
