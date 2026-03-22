import { createAction, props } from '@ngrx/store';
import { Cat } from '../../models/dtos/cat';

export const loadCats = createAction('[Cat] Load Cats');

export const loadCatsSuccess = createAction('[Cat] Load Cats Success', props<{ cats: Cat[] }>());

export const loadCatsFailure = createAction('[Cat] Load Cats Failure', props<{ error: string }>());

export const voteCat = createAction('[Cat] Vote Cat', props<{ winnerId: string; loserId: string }>());

export const voteCatSuccess = createAction('[Cat] Vote Cat Success', props<{ winnerId: string; loserId: string; winnerScore: number; loserScore: number }>());

export const voteCatFailure = createAction('[Cat] Vote Cat Failure', props<{ error: string }>());