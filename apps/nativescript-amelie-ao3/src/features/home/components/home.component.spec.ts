import { HttpClient } from '@angular/common/http';
import { Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { testWork, Work } from '../../../core/work';
import * as utils from '../../../utils';
import {
	DEFAULT_SORT,
	SearchDefinition,
	SearchService,
	SortDefinition,
} from '../../search/search.service';
import { CardComponent } from '../../shared/card/card.component';

import { Utils } from '@nativescript/core';
import { HomeComponent } from './home.component';

jest.mock('@nativescript/core', () => ({
	Utils: {
		openUrl: jest.fn(),
	},
}));

@Injectable()
class MockSearchService extends SearchService {
	constructor() {
		super({} as HttpClient);
	}

	override search(
		search: SearchDefinition,
		sort: SortDefinition = DEFAULT_SORT,
		page = 1
	): Observable<Work[]> {
		return of([testWork({ id: page * 2 - 1 }), testWork({ id: page * 2 })]);
	}
}

describe('HomeComponent', () => {
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;

	beforeEach(async () => {
		jest.spyOn(utils, 'setStatusBarColor').mockImplementation();

		await TestBed.configureTestingModule({
			declarations: [HomeComponent, CardComponent],
			providers: [{ provide: SearchService, useClass: MockSearchService }],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('shows works from search', () => {
		const cardComponents = fixture.debugElement.queryAll(
			By.directive(CardComponent)
		);
		expect(cardComponents.length).toBe(2);
	});

	it('opens work in external browser when the card is tapped', () => {
		const [cardComponent] = fixture.debugElement.queryAll(
			By.directive(CardComponent)
		);
		jest.spyOn(console, 'log').mockImplementation();
		cardComponent.componentInstance.onTapped();
		expect(Utils.openUrl).toHaveBeenCalledWith('href/1');
		expect(console.log).toHaveBeenCalledWith(expect.anything(), 'href/1');
	});

	it('loads next page of works when scrolled to the end', () => {
		fixture.debugElement
			.query(By.css('ScrollView'))
			.triggerEventHandler('scroll', {
				object: {
					verticalOffset: 100,
					scrollableHeight: 100,
				},
			});

		fixture.detectChanges();

		const cardComponents = fixture.debugElement.queryAll(
			By.directive(CardComponent)
		);
		expect(cardComponents.length).toBe(4);
		expect(
			cardComponents.map(
				(component) => (component.componentInstance as CardComponent).title
			)
		).toEqual(['Title 1', 'Title 2', 'Title 3', 'Title 4']);
	});
});
