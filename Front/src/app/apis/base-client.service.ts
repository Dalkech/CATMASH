import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IBaseClientService<Type> {
  apiUrl: string;
  type : string;
  httpClient: HttpClient;

  GetAll: () => Observable<Type[]>;
  GetById: (id: number) => Observable<Type>;
}

export interface IBaseClientServicePOST<PostType> {
  apiUrl: string;
  type : string;
  httpClient: HttpClient;

  Post: (data: PostType) => Observable<PostType>;
}

type IBaseClientServiceGETnPOST<TGet, TPost> = IBaseClientService<TGet> & IBaseClientServicePOST<TPost>;

export abstract class BaseClientService<Type> implements IBaseClientService<Type>  {

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

  GetById = (id: any): Observable<Type> => {
    return this.httpClient.get<Type>(`${this.apiUrl}/${this.type}/${id}`);
  };
}

// <div *ngFor="let user of users$ | async">{{ user.name }}</div>
