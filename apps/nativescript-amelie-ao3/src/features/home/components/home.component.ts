import { Component } from '@angular/core';
import { ScrollEventData, ScrollView, Utils } from '@nativescript/core';
import { BehaviorSubject, concatMap, Observable, scan } from 'rxjs';
import { Work } from '../../../core/work';
import { setStatusBarColor } from '../../../utils';
import { DEFAULT_SORT, SearchService } from '../../search/search.service';

@Component({
	moduleId: module.id,
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent {
	works?: Observable<Work[]>;
	page: BehaviorSubject<number> = new BehaviorSubject(1);

	constructor(private readonly searchService: SearchService) {}

	ngOnInit() {
		setStatusBarColor('dark', '#97d9e9');

		this.works = this.page.pipe(
			concatMap((pageNo) =>
				this.searchService.search(
					{
						tags: ['Wednesday Addams is Soft for Enid Sinclair'],
					},
					DEFAULT_SORT,
					pageNo
				)
			),
			scan((allWorks, newWorks) => allWorks.concat(newWorks), [] as Work[])
		);
	}

	onCardTapped(work: Work): void {
		console.log('Open url', work.href);
		Utils.openUrl(work.href);
	}

	onScroll(args: ScrollEventData) {
		const scrollView = args.object as ScrollView;
		const scrollY = scrollView.verticalOffset;
		const scrollHeight = scrollView.scrollableHeight;

		if (scrollY === scrollHeight) {
			this.page.next(this.page.value + 1);
		}
	}
}
