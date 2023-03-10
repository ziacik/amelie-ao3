import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';

jest.mock('@nativescript/core', () => ({}));

type TextElement = {
	text: string;
};

type HtmlElement = {
	html: string;
};

describe('CardComponent', () => {
	let component: CardComponent;
	let fixture: ComponentFixture<CardComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [CardComponent],
			schemas: [NO_ERRORS_SCHEMA],
		}).compileComponents();

		fixture = TestBed.createComponent(CardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('shows title', () => {
		component.title = 'Some Work';
		fixture.detectChanges();
		const e: TextElement = fixture.debugElement.query(
			By.css('.card-title')
		).nativeElement;
		expect(e.text).toEqual('Some Work');
	});

	it('shows author', () => {
		component.author = 'Some Author';
		fixture.detectChanges();
		const e: TextElement = fixture.debugElement.query(
			By.css('.card-author')
		).nativeElement;
		expect(e.text).toEqual('Some Author');
	});

	it('shows tags', () => {
		component.tags = [
			'No Archive Warnings Apply',
			'Wednesday Addams is Soft for Enid Sinclair',
		];
		fixture.detectChanges();
		const e: TextElement = fixture.debugElement.query(
			By.css('.card-tags')
		).nativeElement;

		expect(e.text).toEqual(
			'No Archive Warnings Apply, Wednesday Addams is Soft for Enid Sinclair'
		);
	});

	it('shows summary', () => {
		component.summary = '<p>Some html text</p>';
		fixture.detectChanges();
		const e: HtmlElement = fixture.debugElement.query(
			By.css('.card-summary')
		).nativeElement;
		expect(e.html).toEqual('<p>Some html text</p>');
	});

	it('shows chapters out and chapters total', () => {
		component.chaptersOut = 10;
		component.chaptersTotal = 18;
		fixture.detectChanges();
		const e: TextElement = fixture.debugElement.query(
			By.css('.card-chapters')
		).nativeElement;
		expect(e.text).toEqual('10 / 18');
	});

	it('can show unknown chapters total', () => {
		component.chaptersOut = 5;
		component.chaptersTotal = null;
		fixture.detectChanges();
		const e: TextElement = fixture.debugElement.query(
			By.css('.card-chapters')
		).nativeElement;
		expect(e.text).toEqual('5 / ?');
	});

	it('shows kudos count', () => {
		component.kudos = 5792;
		fixture.detectChanges();
		const e: TextElement = fixture.debugElement.query(
			By.css('.card-kudos')
		).nativeElement;
		expect(e.text).toEqual(5792);
	});

	it('shows word count', () => {
		component.words = 666712;
		fixture.detectChanges();
		const e: TextElement = fixture.debugElement.query(
			By.css('.card-words')
		).nativeElement;
		expect(e.text).toEqual(666712);
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
