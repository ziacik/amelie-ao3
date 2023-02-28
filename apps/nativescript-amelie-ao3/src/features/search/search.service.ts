import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Work } from '../../core/work';
import * as cheerio from 'cheerio';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	baseUrl =
		'https://archiveofourown.org/works/search?utf8=✓&commit=Search&work_search[query]=';

	constructor(private http: HttpClient) {}

	search(keyword: string): Observable<Work[]> {
		const url = this.baseUrl + keyword;
		return this.http.get(url, { responseType: 'text' }).pipe(map(toWork));
	}
}

function toWork(html: string) {
	const $ = cheerio.load(html);
	const works: Work[] = [];
	$('li.work.blurb.group').each((_i, element) => {
		const $element = $(element);
		const id = parseInt(req($element.attr('id'), 'id').replace('work_', ''));
		const title = $element.find('h4.heading a:not([rel])').text().trim();
		const author = $element.find('h4.heading a[rel="author"]').text().trim();
		const summary =
			$element.find('blockquote.userstuff.summary').html()?.trim() ?? '';
		const tags = $element
			.find('.tag')
			.map((_i, el) => $(el).text().trim())
			.get();
		const href =
			'https://archiveofourown.org' +
			$element.find('h4.heading a').attr('href');
		const work = new Work({ id, title, author, summary, tags, href });
		works.push(work);
	});
	return works;
}

function req<T>(value: T | undefined, name: string): T {
	if (value == null) {
		throw new Error(`Value of '${name}' required but not found.`);
	} else {
		return value;
	}
}
