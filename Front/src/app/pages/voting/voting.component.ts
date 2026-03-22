import { Component, OnInit, signal, computed, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Cat } from '../../models/dtos/cat';
import * as CatActions from '../../store/cats/cats.actions';
import { selectCats, selectLoading, selectRandomCat } from '../../store/cats/cats.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-voting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.css']
})
export class VotingComponent implements OnInit {
  // Signals from NgRx store (no subscription needed)
  cats: Signal<Cat[]>;
  loading: Signal<boolean>;

  cat1: Signal<Cat | null>;
  cat2: Signal<Cat | null>;

  constructor(private store: Store) {
    this.cats = this.store.selectSignal(selectCats);
    this.loading = this.store.selectSignal(selectLoading);

    this.cat1 = this.store.selectSignal(selectRandomCat());
    this.cat2 = computed(() => {
      const firstCat = this.cat1();
      if (!firstCat) return null;
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