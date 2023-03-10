import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Work } from '../../core/work';
import * as cheerio from 'cheerio';

export type SearchDefinition = {
	text?: string;
	tags?: string[];
};

export type SortDefinition = {
	field: 'kudos_count' | '_score';
	direction: 'asc' | 'desc';
};

export const DEFAULT_SORT: SortDefinition = {
	field: 'kudos_count',
	direction: 'desc',
};

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	baseUrl = 'https://archiveofourown.org';

	constructor(private http: HttpClient) {}

	search(
		search: SearchDefinition,
		sort: SortDefinition = DEFAULT_SORT,
		page = 1
	): Observable<Work[]> {
		const url = new URL(`${this.baseUrl}/works/search`);
		url.searchParams.set('work_search[sort_column]', sort.field);
		url.searchParams.set('work_search[sort_direction]', sort.direction);
		if (search.text) {
			url.searchParams.set('work_search[query]', search.text);
		}
		if (search.tags && search.tags.length) {
			url.searchParams.set(
				'work_search[freeform_names]',
				search.tags.join(',')
			);
		}
		url.searchParams.set('page', page.toString());
		return this.http
			.get(url.toString(), { responseType: 'text' })
			.pipe(map(toWork));
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
		const [chaptersOut, chaptersTotal] = parseProgress(
			$element.find('dd.chapters').text()
		);
		const kudos = parseNumber($element.find('dd.kudos').text());
		const words = parseNumber($element.find('dd.words').text());
		const work = new Work({
			id,
			title,
			author,
			summary,
			tags,
			href,
			chaptersOut,
			chaptersTotal,
			kudos,
			words,
		});
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

function parseNumber(value: string): number {
	return +value.replace(/[^0-9]+/g, '');
}

function parseProgress(value: string): [number, number | null] {
	const [out, total] = value.split('/');
	return [parseNumber(out), total === '?' ? null : parseNumber(total)];
}
