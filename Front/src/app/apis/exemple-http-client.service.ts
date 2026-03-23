import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseClientService } from './base-client.service';
import { delay, Observable, of } from 'rxjs';
import { ExemplePerson } from '../models/dtos/exemplePerson';


const mockData: ExemplePerson[] = [
  {id: 1, name: 'Bob', age : 30},
  {id: 2, name: 'Alice', age : 25},
  {id: 3, name: 'Charlie', age : 35},
  {id: 4, name: 'David', age : 28},
  {id: 5, name: 'Eve', age : 22},
];

@Injectable({
  providedIn: 'root'
})
export class ExempleHttpClientService extends BaseClientService<ExemplePerson>{

  constructor(HttpClient: HttpClient) 
  {
    super(HttpClient);
  }
  
  override GetAll = () => {
    return of(mockData).pipe(delay(5000));
  } 
  
}
