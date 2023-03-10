import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss'],
})
export class CardComponent {
	@Input()
	title = 'Title';

	@Input()
	author = 'Author';

	@Input()
	summary = '';

	@Input()
	tags: string[] = [];

	@Input()
	url = '';

	@Input()
	words = 0;

	@Input()
	chaptersOut = 0;

	@Input()
	chaptersTotal: number | undefined;

	@Input()
	kudos = 0;

	@Input()
	bookmarks = 0;

	@Output()
	tap: EventEmitter<void> = new EventEmitter();

	onTapped(): void {
		this.tap.emit();
	}
}
