import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Injectable, signal } from "@angular/core";

@Injectable({providedIn: 'root'})
export default class LoadingService {
    public loading = signal(false);

    show = () => this.loading.set(true);
    hide = () => this.loading.set(false);
}

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent {
  constructor(private loadingService: LoadingService) {}
}
