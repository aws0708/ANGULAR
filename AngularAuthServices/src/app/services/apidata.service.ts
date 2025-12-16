import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApidataService {

  private readonly apiUrl = 'https://api.freeprojectapi.com/api/BusBooking/GetAllUsers';

  constructor( private http: HttpClient ) { }

  getData(page: number = 1,pageSize: number =10): Observable<any> {

    let params = new HttpParams()
    .set('page', page)
    .set('pageSize', pageSize)

    return this.http.get<any>(this.apiUrl);

  }
}
