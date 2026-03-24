import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of, timer } from 'rxjs';
import * as CatActions from './cats.actions';
import { CatImageApiService } from '../../apis/cat-image-api.service';

@Injectable()
export class CatEffects {
	loadCats$;
	voteCat$;

	constructor(private actions$: Actions, private catImageApiService: CatImageApiService) {
		this.loadCats$ = createEffect(() =>
			this.actions$.pipe(
				ofType(CatActions.loadCats),
				mergeMap(() =>
					this.catImageApiService.getAll().pipe(
						map(catImages => CatActions.loadCatsSuccess({ catImages: catImages })),
						catchError(error => of(CatActions.loadCatsFailure({ error: error.message })))
					)
				)
			)
		);

		this.voteCat$ = createEffect(() =>
			this.actions$.pipe(
				ofType(CatActions.voteCat),
				mergeMap(({ winnerId, loserId }) =>
					timer(1000).pipe( // Simulate 1s delay
						map(() => ({
							winnerScore: Math.random(), // Mock response data
							loserScore: Math.random()
						})),
						map(({ winnerScore, loserScore }) =>
							CatActions.voteCatSuccess({ winnerId, loserId, winnerScore, loserScore })
						),
						catchError(error => of(CatActions.voteCatFailure({ error: error.message })))
					)
				)
			)
		);
	}
}
