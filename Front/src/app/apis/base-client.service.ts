import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface IBaseClientService<Type> {
  apiUrl: string;
  type : string;
  httpClient: HttpClient;

  getAll: () => Observable<Type[]>;
  getById: (id: number) => Observable<Type>;
}

export interface IBaseClientServicePOST<PostType> {
  apiUrl: string;
  type : string;
  httpClient: HttpClient;

  post: (data: PostType) => Observable<PostType>;
}

type IBaseClientServiceGETnPOST<TGet, TPost> = IBaseClientService<TGet> & IBaseClientServicePOST<TPost>;

export abstract class BaseClientService<Type> implements IBaseClientService<Type>  {

  apiUrl: string;
  httpClient: HttpClient;
  type: string;

  constructor (httpClient: HttpClient, type: string = 'default') {
    this.httpClient = httpClient;
    this.type = type;
    this.apiUrl = 'http://localhost:5181';
  }

  getAll = (): Observable<Type[]> => {
    return this.httpClient.get<Type[]>(`${this.apiUrl}/${this.type}`);
  };

  getById = (id: any): Observable<Type> => {
    return this.httpClient.get<Type>(`${this.apiUrl}/${this.type}/${id}`);
  };
}
