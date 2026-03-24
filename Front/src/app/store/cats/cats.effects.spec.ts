import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { CatEffects } from './cats.effects';
import * as CatActions from './cats.actions';
import { CatImage } from '../../models/dtos/catImage';
import { CatImageApiService } from '../../apis/cat-image-api.service';

describe('CatEffects', () => {
  let actions$: Observable<any>;
  let effects: CatEffects;
  let catServiceSpy: jasmine.SpyObj<CatImageApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CatService', ['getAll', 'vote']);

    TestBed.configureTestingModule({
      providers: [
        CatEffects,
        provideMockActions(() => actions$),
        { provide: CatImageApiService, useValue: spy }
      ]
    });

    effects = TestBed.inject(CatEffects);
    catServiceSpy = TestBed.inject(CatImageApiService) as jasmine.SpyObj<CatImageApiService>;
  });

  describe('loadCats$', () => {
    it('should return loadCatsSuccess on success', (done) => {
      const catImages: CatImage[] = [{ id: '1', url: 'img.jpg', score: 0 }];
      catServiceSpy.getAll.and.returnValue(of(catImages));

      actions$ = of(CatActions.loadCats());

      effects.loadCats$.subscribe(action => {
        expect(action).toEqual(CatActions.loadCatsSuccess({ catImages }));
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
});
