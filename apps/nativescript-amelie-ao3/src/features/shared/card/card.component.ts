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
	url = '';

	@Output()
	tap: EventEmitter<void> = new EventEmitter();

	onTapped(): void {
		this.tap.emit();
	}
}
