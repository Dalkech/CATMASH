import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingComponent } from './voting.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CatState, initialCatState } from '../../store/cats/cats.state';
import { Cat } from '../../models/dtos/cat';

describe('VotingComponent', () => {
  let component: VotingComponent;
  let fixture: ComponentFixture<VotingComponent>;
  let store: MockStore<{ cats: CatState }>;
  const mockCats: Cat[] = [
    { id: '1', image: 'img1.jpg', score: 10 },
    { id: '2', image: 'img2.jpg', score: 20 },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotingComponent],
      providers: [
        provideMockStore({
          initialState: { cats: { ...initialCatState, cats: mockCats } }
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(VotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select random cats', () => {
    const cat1 = component.cat1();
    const cat2 = component.cat2();
    expect(cat1).toBeDefined();
    expect(cat2).toBeDefined();
    expect(cat1?.id).not.toBe(cat2?.id);
  });

  it('should dispatch vote action', () => {
    spyOn(store, 'dispatch');
    component.vote('1', '2');
    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[Cat] Vote Cat',
      winnerId: '1',
      loserId: '2'
    });
  });
});