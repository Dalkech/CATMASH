import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimatedTextComponentComponent } from './components/animated-text-component/animated-text-component.component';
import { delay, of } from 'rxjs';
import LoadingService, { LoaderComponent } from './components/loader/loader.component';
import { AppPulsingPlaceholderComponent } from './components/app-pulsing-placeholder/app-pulsing-placeholder.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AnimatedTextComponentComponent, LoaderComponent, AppPulsingPlaceholderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front';

  /**
   *
   */
  constructor(private loadingService: LoadingService) {}

  showLoader() {
    this.loadingService.show();
    of(null).pipe(delay(2000)).subscribe(() => this.loadingService.hide());
  }
}
