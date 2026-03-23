import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CatActions from './cats.actions';
import { CatService } from '../../services/cat.service';

@Injectable()
export class CatEffects {
  loadCats$;
  voteCat$;

  constructor(private actions$: Actions, private catService: CatService) {
    this.loadCats$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatActions.loadCats),
        mergeMap(() =>
          this.catService.getAll().pipe(
            map(cats => CatActions.loadCatsSuccess({ cats })),
            catchError(error => of(CatActions.loadCatsFailure({ error: error.message })))
          )
        )
      )
    );

    this.voteCat$ = createEffect(() =>
      this.actions$.pipe(
        ofType(CatActions.voteCat),
        mergeMap(({ winnerId, loserId }) =>
          this.catService.vote(winnerId, loserId).pipe(
            map(({ winnerScore, loserScore }) => CatActions.voteCatSuccess({ winnerId, loserId, winnerScore, loserScore })),
            catchError(error => of(CatActions.voteCatFailure({ error: error.message })))
          )
        )
      )
    );
  }
}