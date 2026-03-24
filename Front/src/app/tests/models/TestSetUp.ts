import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

export class TestSetUp {
	static configureTestBed(component: any = null) {
		beforeEach(() => {
			const moduleConfig: any = {
				providers: [
					provideHttpClient(withInterceptorsFromDi()),
					provideHttpClientTesting()
				]
			};

			if (component) {
				moduleConfig.imports = [component];
			}

			TestBed.configureTestingModule(moduleConfig);
		});
	}
}
