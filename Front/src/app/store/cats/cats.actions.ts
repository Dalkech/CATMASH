import { createAction, props } from '@ngrx/store';
import { CatImage } from '../../models/dtos/catImage';

export const loadCats = createAction('[CatImage] Load Cats');

export const loadCatsSuccess = createAction('[CatImage] Load Cats Success', props<{ catImages: CatImage[] }>());

export const loadCatsFailure = createAction('[CatImage] Load Cats Failure', props<{ error: string }>());

export const voteCat = createAction('[CatImage] Vote Cat', props<{ winnerId: string; loserId: string }>());

export const voteCatSuccess = createAction('[CatImage] Vote Cat Success', props<{ winnerId: string; loserId: string; winnerScore: number; loserScore: number }>());

export const voteCatFailure = createAction('[CatImage] Vote Cat Failure', props<{ error: string }>());
