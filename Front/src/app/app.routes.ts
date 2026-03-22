import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/exemple/exemple.component').then(c => c.ExempleComponent)
    },
    {
        path: 'voting',
        loadComponent: () => import('./pages/voting/voting.component').then(c => c.VotingComponent)
    }
];
