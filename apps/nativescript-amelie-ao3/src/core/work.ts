export class Work {
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly summary: string;
	readonly tags: string[];
	readonly href: string;

	constructor({
		id,
		title,
		author,
		summary,
		tags,
		href,
	}: {
		id: number;
		title: string;
		author: string;
		summary: string;
		tags: string[];
		href: string;
	}) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.summary = summary;
		this.tags = tags;
		this.href = href;
	}
}
