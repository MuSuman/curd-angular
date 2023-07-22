import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public appData:any[] = []

constructor(private httpClient:HttpClient) { }

public getData():Observable<any> {
 return this.httpClient.get('assets/data.json').pipe(map(result => result))
}

}
