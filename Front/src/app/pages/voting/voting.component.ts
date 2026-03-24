import { Component, OnInit, signal, computed, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cat } from '../../tests/models/Cat';
import * as CatActions from '../../store/cats/cats.actions';
import { selectCats, selectLoading, selectRandomCat } from '../../store/cats/cats.selectors';
import { CommonModule } from '@angular/common';
import { CatImage } from '../../models/dtos/catImage';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  catImages: Signal<CatImage[]>;
  loading: Signal<boolean>;

  catImage1: Signal<CatImage | null>;
  catImage2: Signal<CatImage | null>;

  constructor(private store: Store) {
    this.catImages = this.store.selectSignal(selectCats);
    this.loading = this.store.selectSignal(selectLoading);

    this.catImage1 = this.store.selectSignal(selectRandomCat());
    this.catImage2 = computed(() => {
      const firstCat = this.catImage1();
      if (!firstCat)
        return null;
      return this.store.selectSignal(selectRandomCat(firstCat.id))();
    });
  }

  ngOnInit() {
    // Load cats on init
    this.store.dispatch(CatActions.loadCats());
  }

  vote(winnerId: string, loserId: string) {
    // Dispatch vote action, which calls API and updates store
    this.store.dispatch(CatActions.voteCat({ winnerId, loserId }));
  }
}
