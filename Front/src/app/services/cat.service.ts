import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { Cat } from '../tests/models/Cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private apiUrl = 'api/cats'; // Adjust based on your backend API

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cat[]> {
    console.log('CatService.getAll called');
    const mockData: Cat[] = [
        { id: '1', image: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', score: 10 },
        { id: '2', image: 'https://cdn2.thecatapi.com/images/bpc.jpg', score: 20 },
        { id: '3', image: 'https://cdn2.thecatapi.com/images/kg.jpg', score: 30 },
        { id: '4', image: 'https://cdn2.thecatapi.com/images/5qi.jpg', score: 40 },
        { id: '5', image: 'https://cdn2.thecatapi.com/images/6fd.jpg', score: 50 },
        { id: '6', image: 'https://cdn2.thecatapi.com/images/5fm.jpg', score: 60 }
    ];
    return of(mockData).pipe(delay(5000));
    return this.http.get<Cat[]>(this.apiUrl);
  }

  vote(winnerId: string, loserId: string): Observable<{ winnerScore: number; loserScore: number }> {
    return of({ winnerScore: 100, loserScore: 50 }).pipe(delay(500)); // Simulate API call delay
    return this.http.post<{ winnerScore: number; loserScore: number }>(`${this.apiUrl}/vote`, { winnerId, loserId });
  }
}
