export class Work {
	readonly id: number;
	readonly title: string;
	readonly author: string;
	readonly summary: string;
	readonly tags: string[];
	readonly href: string;
	readonly chaptersOut: number;
	readonly chaptersTotal: number | null;
	readonly kudos: number;
	readonly words: number;

	constructor({
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
	}: {
		id: number;
		title: string;
		author: string;
		summary: string;
		tags: string[];
		href: string;
		chaptersOut: number;
		chaptersTotal: number | null;
		kudos: number;
		words: number;
	}) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.summary = summary;
		this.tags = tags;
		this.href = href;
		this.chaptersOut = chaptersOut;
		this.chaptersTotal = chaptersTotal;
		this.kudos = kudos;
		this.words = words;
	}
}

export function testWork(data: Partial<Work>): Work {
	const id = data.id ?? 123;
	return {
		id,
		title: data.title ?? `Title ${id}`,
		author: data.author ?? `Author ${id}`,
		summary: data.summary ?? `Summary ${id}`,
		tags: data.tags ?? [`Tag One`, `Tag Two`],
		href: data.href ?? `href/${id}`,
		chaptersOut: data.chaptersOut ?? 3,
		chaptersTotal: data.chaptersTotal ?? null,
		kudos: data.kudos ?? 4800,
		words: data.words ?? 16257,
	};
}
