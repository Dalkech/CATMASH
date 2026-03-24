import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VotingComponent } from './voting.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CatState, initialCatState } from '../../store/cats/cats.state';
import { CatImage } from '../../models/dtos/catImage';

describe('VotingComponent', () => {
  let component: VotingComponent;
  let fixture: ComponentFixture<VotingComponent>;
  let store: MockStore<{ cats: CatState }>;


  beforeEach(async () => {

    const mockCatImages: CatImage[] = [
      { id: '1', url: 'img1.jpg', score: 10 },
      { id: '2', url: 'img2.jpg', score: 20 },
    ];

    await TestBed.configureTestingModule({
      imports: [VotingComponent],
      providers: [
        provideMockStore({
          initialState: { cats: { ...initialCatState, catImages: mockCatImages } }
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

  component.ngOnInit();
    const catimage1 = component.catImage1();
    const catimage2 = component.catImage2();

    expect(catimage1).toBeDefined();
    expect(catimage2).toBeDefined();
    expect(catimage1?.id).not.toBe(catimage2?.id);
  });

  it('should dispatch vote action', () => {

    spyOn(store, 'dispatch');
    component.vote('1', '2');
    expect(store.dispatch).toHaveBeenCalledWith({
      type: '[CatImage] Vote Cat',
      winnerId: '1',
      loserId: '2'
    });
  });
});
