import { catReducer } from './cats.reducer';
import { initialCatState } from './cats.state';
import * as CatActions from './cats.actions';
import { Cat } from '../../tests/models/Cat';
import { CatImage } from '../../models/dtos/catImage';

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
    const catImages:CatImage[] = [{ id: '1', url: 'img.jpg', score: 0 }];

    const action = CatActions.loadCatsSuccess({ catImages: catImages });
    const state = catReducer({ ...initialCatState, loading: true }, action);

    expect(state.catImages).toEqual(catImages);
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
    const initialCats: CatImage[] = [
      { id: '1', url: 'img1.jpg', score: 10 },
      { id: '2', url: 'img2.jpg', score: 20 }
    ];
    const action = CatActions.voteCatSuccess({
      winnerId: '1',
      loserId: '2',
      winnerScore: 15,
      loserScore: 15
    });

    const state = catReducer({ ...initialCatState, catImages: initialCats, loading: true }, action);

    expect(state.catImages[0].score).toBe(15);
    expect(state.catImages[1].score).toBe(15);
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
