import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CatState } from './cats.state';

export const selectCatState = createFeatureSelector<CatState>('cats');

export const selectCats = createSelector(selectCatState, state => state.catImages);

export const selectLoading = createSelector(selectCatState, state => state.loading);

export const selectError = createSelector(selectCatState, state => state.error);

// Selector factory (modern way to handle props, avoiding deprecated inline props)
export const selectCatById = (id: string) => createSelector(
  selectCats,
  cats => cats.find(cat => cat.id === id)
);

// Selector factory for random cat, with optional exclude ID
export const selectRandomCat = (excludeId?: string) => createSelector(
  selectCats,
  cats => {
    const availableCats = excludeId ? cats.filter(cat => cat.id !== excludeId) : cats;
    if (availableCats.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * availableCats.length);
    return availableCats[randomIndex];
  }
);

// Selector for cats ordered by score descending (highest score first)
export const selectOrderedByScoreDesc = createSelector(
  selectCats,
  cats => [...cats].sort((a, b) => (b.score || 0) - (a.score || 0))
);
