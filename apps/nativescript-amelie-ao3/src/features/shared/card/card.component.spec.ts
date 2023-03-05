import {
	Component,
	EventEmitter,
	Input,
	NO_ERRORS_SCHEMA,
	Output,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

jest.mock('@nativescript/core', () => ({}));

@Component({
	selector: 'Label',
})
class MockLabel {
	@Input() text = '???';
	@Output() tap = new EventEmitter<void>();
}

describe('CardComponent', () => {
	let component: CardComponent;
	let fixture: ComponentFixture<CardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CardComponent, MockLabel],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(CardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('shows a work title', () => {
		component.title = 'Some Work';
		fixture.detectChanges();
		const e: MockLabel = fixture.debugElement.query(
			By.css('.card-title')
		).componentInstance;
		expect(e.text).toEqual('Some Work');
	});

	it('shows a work author', () => {
		component.author = 'Some Author';
		fixture.detectChanges();
		const e: MockLabel = fixture.debugElement.query(
			By.css('.card-author')
		).componentInstance;
		expect(e.text).toEqual('Some Author');
	});

	it('emits a tap event when tapped', () => {
		let tapped = false;
		component.tap.subscribe(() => (tapped = true));
		fixture.debugElement
			.query(By.css('GridLayout'))
			.triggerEventHandler('tap', null);
		fixture.detectChanges();
		expect(tapped).toBe(true);
	});
});
