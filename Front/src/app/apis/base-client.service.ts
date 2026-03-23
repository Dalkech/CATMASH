import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IBaseClientService<Type, POSTTYPE = Type, PUTTYPE = Type> {
  apiUrl: string;
  type : string;
  httpClient: HttpClient;

  GetAll: () => Observable<Type[]>;
  GetById: (id: number) => Observable<Type>;
  Create: (data: Type) => Observable<Type>;
  Update: (id: number, data: Type) => Observable<Type>;
  Delete: (id: number) => Observable<void>;
}

export abstract class BaseClientService<Type, POSTTYPE = Type, PUTTYPE = Type> implements IBaseClientService<Type, POSTTYPE, PUTTYPE> {

  apiUrl: string;
  httpClient: HttpClient;
  type: string;
  
  constructor (httpClient: HttpClient, type: string = 'default') {
    this.httpClient = httpClient;
    this.type = type;
    this.apiUrl = 'http://localhost:8080/api'; 
  }
 
  GetAll = (): Observable<Type[]> => {
    return this.httpClient.get<Type[]>(`${this.apiUrl}/${this.type}`);
  };

  GetById = (id: number): Observable<Type> => {
    return this.httpClient.get<Type>(`${this.apiUrl}/${this.type}/${id}`);
  };

  Create = (data: Type): Observable<Type> => {
    return this.httpClient.post<Type>(`${this.apiUrl}/${this.type}`, data);
  };

  Update = (id: number, data: Type): Observable<Type> => {
    return this.httpClient.put<Type>(`${this.apiUrl}/${this.type}/${id}`, data);
  };

  Delete = (id: number): Observable<void> => {
    return this.httpClient.delete<void>(`${this.apiUrl}/${this.type}/${id}`);
  }
}

// <div *ngFor="let user of users$ | async">{{ user.name }}</div>
