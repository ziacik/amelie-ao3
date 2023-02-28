import { TestBed } from '@angular/core/testing';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { SearchService } from './search.service';
import { Work } from '../../core/work';
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

	afterEach(() => {
		httpMock.verify();
	});

	it('makes a search request to ao3, scrapes the result to a list of Works', () => {
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
			}),
		];

		const keyword = 'wenclair';
		service.search(keyword).subscribe((works) => (actual = works));

		const req = httpMock.expectOne(
			`https://archiveofourown.org/works/search?utf8=✓&commit=Search&work_search[query]=${keyword}`
		);
		req.flush(searchHtml);

		expect(actual.length).toBe(2);
		expect(actual).toEqual(expected);
	});
});
