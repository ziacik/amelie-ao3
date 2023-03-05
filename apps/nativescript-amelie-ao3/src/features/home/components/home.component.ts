import { Component } from '@angular/core';
import { Utils } from '@nativescript/core';
import { Observable } from 'rxjs';
import { Work } from '../../../core/work';
import { setStatusBarColor } from '../../../utils';
import { SearchService } from '../../search/search.service';

@Component({
	moduleId: module.id,
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent {
	works?: Observable<Work[]>;

	constructor(private readonly searchService: SearchService) {}

	ngOnInit() {
		setStatusBarColor('dark', '#97d9e9');
		this.works = this.searchService.search({
			tags: ['Wednesday Addams is Soft for Enid Sinclair'],
		});
	}

	onCardTapped(work: Work): void {
		console.log('Open url', work.href);
		Utils.openUrl(work.href);
	}
}
