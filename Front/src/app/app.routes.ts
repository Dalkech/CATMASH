import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'ladder',
        loadComponent: () => import('./pages/ladder/ladder.component').then(c => c.LadderComponent)
    },
    {
        path: 'voting',
        loadComponent: () => import('./pages/voting/voting.component').then(c => c.VotingComponent)
    }
];
