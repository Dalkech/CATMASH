import { catReducer } from './cats.reducer';
import { initialCatState } from './cats.state';
import * as CatActions from './cats.actions';

describe('CatReducer', () => {
  it('should return initial state', () => {
    const action = { type: 'unknown' };
    const state = catReducer(initialCatState, action);
    expect(state).toBe(initialCatState);
  });

  it('should handle loadCats', () => {
    const action = CatActions.loadCats();
    const state = catReducer(initialCatState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBe(null);
  });

  it('should handle loadCatsSuccess', () => {
    const cats = [{ id: '1', image: 'img.jpg' }];
    const action = CatActions.loadCatsSuccess({ cats });
    const state = catReducer({ ...initialCatState, loading: true }, action);
    expect(state.cats).toEqual(cats);
    expect(state.loading).toBe(false);
  });

  it('should handle loadCatsFailure', () => {
    const error = 'error';
    const action = CatActions.loadCatsFailure({ error });
    const state = catReducer({ ...initialCatState, loading: true }, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should handle voteCat', () => {
    const action = CatActions.voteCat({ winnerId: '1', loserId: '2' });
    const state = catReducer(initialCatState, action);
    expect(state.loading).toBe(true);
  });

  it('should handle voteCatSuccess', () => {
    const initialCats = [
      { id: '1', image: 'img1.jpg', score: 10 },
      { id: '2', image: 'img2.jpg', score: 20 }
    ];
    const action = CatActions.voteCatSuccess({
      winnerId: '1',
      loserId: '2',
      winnerScore: 15,
      loserScore: 15
    });
    const state = catReducer({ ...initialCatState, cats: initialCats, loading: true }, action);
    expect(state.cats[0].score).toBe(15);
    expect(state.cats[1].score).toBe(15);
    expect(state.loading).toBe(false);
  });

  it('should handle voteCatFailure', () => {
    const error = 'error';
    const action = CatActions.voteCatFailure({ error });
    const state = catReducer({ ...initialCatState, loading: true }, action);
    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });
});