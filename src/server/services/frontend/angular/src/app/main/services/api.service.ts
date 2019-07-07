import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from  'rxjs/operators';
import { Observable } from  'rxjs';

import { Url } from  '../models/url';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_SERVER = "http://exam.co/api/url";

  constructor(private httpClient: HttpClient) { }

  processUrl(url: Url, type: any): Observable<Url> {
    return this.httpClient.post<Url>(`${this.API_SERVER}/${type}`, url);
  }

}
