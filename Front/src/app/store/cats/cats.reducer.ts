import { createReducer, on } from '@ngrx/store';
import * as CatActions from './cats.actions';
import { initialCatState } from './cats.state';

export const catReducer = createReducer(
  initialCatState,
  on(CatActions.loadCats, state => ({ ...state, loading: true, error: null })),
  on(CatActions.loadCatsSuccess, (state, { cats }) => ({ ...state, cats, loading: false })),
  on(CatActions.loadCatsFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(CatActions.voteCat, state => ({ ...state, loading: true })),
  on(CatActions.voteCatSuccess, (state, { winnerId, loserId, winnerScore, loserScore }) => {
    const updatedCats = state.cats.map(cat => {
      if (cat.id === winnerId) return { ...cat, score: winnerScore };
      if (cat.id === loserId) return { ...cat, score: loserScore };
      return cat;
    });
    return { ...state, cats: updatedCats, loading: false };
  }),
  on(CatActions.voteCatFailure, (state, { error }) => ({ ...state, error, loading: false }))
);