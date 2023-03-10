import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Work } from '../../core/work';
import { SearchService } from './search.service';
import * as searchHtml from './__fixtures__/search.html';

describe('SearchService', () => {
	let service: SearchService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [SearchService],
		});
		service = TestBed.inject(SearchService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	it('scrapes a search result to a list of Works', () => {
		let actual: Work[] = [];
		const expected: Work[] = [
			new Work({
				id: 43765777,
				title: 'Wenclair',
				author: 'Wilbobunny',
				summary: `<p>
									If you have ideas or promts for wenclair one shots, tell them
									in comments so I can write them
								</p>`,
				tags: [
					'Wednesday (TV 2022)',
					'No Archive Warnings Apply',
					'Wednesday Addams/Enid Sinclair',
					'Wednesday Addams',
					'Enid Sinclair',
				],
				href: 'https://archiveofourown.org/works/43765777',
				chaptersOut: 3,
				chaptersTotal: 17,
				kudos: 18,
				words: 86,
			}),
			new Work({
				id: 45108169,
				title: 'Distractions',
				author: 'Kr0wZ',
				summary: `<p>
									My offer for Wenclair week, Day three: Distractions /
									Personality-swap / Japanese/Folklore au
								</p>`,
				tags: [
					'Wednesday (TV 2022)',
					'Creator Chose Not To Use Archive Warnings',
					'Wednesday Addams/Enid Sinclair',
					'Wednesday Addams',
					'Enid Sinclair',
					'Yoko Tanaka',
					'Bianca Barclay',
					'Ajax Petropolus',
					'Out of Character',
					'Established Relationship',
					'Wenclair Week 2023',
					'Surprise Kissing',
					'Girls Kissing',
					'Wednesday Addams is Whipped',
					'Addams Family Curse',
				],
				href: 'https://archiveofourown.org/works/45108169',
				chaptersOut: 7,
				chaptersTotal: null,
				kudos: 64,
				words: 1101,
			}),
		];

		service.search({ text: 'wenclair' }).subscribe((works) => (actual = works));
		httpMock.expectOne(() => true).flush(searchHtml);

		expect(actual.length).toBe(2);
		expect(actual).toEqual(expected);
	});

	it('can sort', () => {
		service
			.search({ text: `enid` }, { field: '_score', direction: 'asc' })
			.subscribe();
		const expectedUrl = `https://archiveofourown.org/works/search?work_search%5Bsort_column%5D=_score&work_search%5Bsort_direction%5D=asc&work_search%5Bquery%5D=enid&page=1`;
		httpMock.expectOne(expectedUrl);
		httpMock.verify();
	});

	it('can page', () => {
		service
			.search({ text: `enid` }, { field: '_score', direction: 'asc' }, 130)
			.subscribe();
		const expectedUrl = `https://archiveofourown.org/works/search?work_search%5Bsort_column%5D=_score&work_search%5Bsort_direction%5D=asc&work_search%5Bquery%5D=enid&page=130`;
		httpMock.expectOne(expectedUrl);
		httpMock.verify();
	});

	it('can search by free text, encodes the text', () => {
		service.search({ text: `what /? ever &'"` }).subscribe();
		const expectedUrl = `https://archiveofourown.org/works/search?work_search%5Bsort_column%5D=kudos_count&work_search%5Bsort_direction%5D=desc&work_search%5Bquery%5D=what+%2F%3F+ever+%26%27%22&page=1`;
		httpMock.expectOne(expectedUrl);
		httpMock.verify();
	});

	it('can search by additional tags, encodes the text', () => {
		service
			.search({
				tags: [
					'Wednesday Addams is Soft for Enid Sinclair',
					'Lesbian Enid Sinclair',
				],
			})
			.subscribe();
		const expectedUrl = `https://archiveofourown.org/works/search?work_search%5Bsort_column%5D=kudos_count&work_search%5Bsort_direction%5D=desc&work_search%5Bfreeform_names%5D=Wednesday+Addams+is+Soft+for+Enid+Sinclair%2CLesbian+Enid+Sinclair&page=1`;
		httpMock.expectOne(expectedUrl);
		httpMock.verify();
	});
});
