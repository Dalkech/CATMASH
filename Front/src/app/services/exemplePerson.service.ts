import { Inject, Injectable } from "@angular/core";
import { ExempleHttpClientService } from "../apis/exemple-http-client.service";
import { ExemplePerson } from "../models/dtos/exemplePerson";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ExemplePersonService {
    constructor(private exemplePersonApi: ExempleHttpClientService) {
    }

    getAll = () :Observable<ExemplePerson[]> => 
    {
        return this.exemplePersonApi.GetAll();
    }
}