import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { delay, of } from 'rxjs';
import LoadingService, { LoaderComponent } from './components/loader/loader.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, LoaderComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	title = 'Front';

	constructor(private loadingService: LoadingService, private router: Router) { }

	ngOnInit() {
		this.activateLoadingOnPageChange();
	}

	private activateLoadingOnPageChange() {
		this.router.events.subscribe(event => {

			if (event instanceof NavigationStart)
				this.loadingService.show();


			if (event instanceof NavigationEnd ||
				event instanceof NavigationCancel ||
				event instanceof NavigationError)
				of(null).pipe(delay(1000)).subscribe(() => this.loadingService.hide());

		});
	}
}
