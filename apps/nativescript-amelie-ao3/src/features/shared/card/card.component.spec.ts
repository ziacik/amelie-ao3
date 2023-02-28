import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

@Component({
	selector: 'Label',
})
class MockLabel {
	@Input() text = '???';
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

	it('will render a work title', () => {
		component.title = 'Some Work';
		fixture.detectChanges();
		const e: MockLabel = fixture.debugElement.query(
			By.css('.card-title')
		).componentInstance;
		expect(e.text).toEqual('Some Work');
	});

	it('will render a work author', () => {
		component.author = 'Some Author';
		fixture.detectChanges();
		const e: MockLabel = fixture.debugElement.query(
			By.css('.card-author')
		).componentInstance;
		expect(e.text).toEqual('Some Author');
	});
});
