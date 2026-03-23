import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatImage } from '../models/dtos/catImage';
import { BaseClientService } from './base-client.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root',
})
export class CatImageApiService extends BaseClientService<CatImage> {


	constructor(httpClient: HttpClient)
  {
    super(httpClient, 'catimage');
  }
}
