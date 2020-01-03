import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ScrapingClient {
  private proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  private httpOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'text/html',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100'
      // 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.88 Safari/537.36'
    }),
    responseType: 'text',
    body: null
  };
  constructor(private http: HttpClient) {}

  public async getHtmlAsync(url: string): Promise<string> {
    const result = await this.http
      .get(this.proxyUrl + url, this.httpOptions)
      .toPromise();
    // console.log('res', result);

    const response: string = result.toString();
    return response;
  }
}
