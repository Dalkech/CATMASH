import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CatEffects } from './cats.effects';
import * as CatActions from './cats.actions';
import { CatService } from '../../services/cat.service';

describe('CatEffects', () => {
  let actions$: Observable<any>;
  let effects: CatEffects;
  let catServiceSpy: jasmine.SpyObj<CatService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CatService', ['getAll', 'vote']);

    TestBed.configureTestingModule({
      providers: [
        CatEffects,
        provideMockActions(() => actions$),
        { provide: CatService, useValue: spy }
      ]
    });

    effects = TestBed.inject(CatEffects);
    catServiceSpy = TestBed.inject(CatService) as jasmine.SpyObj<CatService>;
  });

  describe('loadCats$', () => {
    it('should return loadCatsSuccess on success', (done) => {
      const cats = [{ id: '1', image: 'img.jpg' }];
      catServiceSpy.getAll.and.returnValue(of(cats));

      actions$ = of(CatActions.loadCats());

      effects.loadCats$.subscribe(action => {
        expect(action).toEqual(CatActions.loadCatsSuccess({ cats }));
        done();
      });
    });

    it('should return loadCatsFailure on error', (done) => {
      catServiceSpy.getAll.and.returnValue(throwError(new Error('error')));

      actions$ = of(CatActions.loadCats());

      effects.loadCats$.subscribe(action => {
        expect(action).toEqual(CatActions.loadCatsFailure({ error: 'error' }));
        done();
      });
    });
  });

  describe('voteCat$', () => {
    it('should return voteCatSuccess on success', (done) => {
      const response = { winnerScore: 100, loserScore: 50 };
      catServiceSpy.vote.and.returnValue(of(response));

      actions$ = of(CatActions.voteCat({ winnerId: '1', loserId: '2' }));

      effects.voteCat$.subscribe(action => {
        expect(action).toEqual(CatActions.voteCatSuccess({
          winnerId: '1',
          loserId: '2',
          winnerScore: 100,
          loserScore: 50
        }));
        done();
      });
    });

    it('should return voteCatFailure on error', (done) => {
      catServiceSpy.vote.and.returnValue(throwError(new Error('error')));

      actions$ = of(CatActions.voteCat({ winnerId: '1', loserId: '2' }));

      effects.voteCat$.subscribe(action => {
        expect(action).toEqual(CatActions.voteCatFailure({ error: 'error' }));
        done();
      });
    });
  });
});