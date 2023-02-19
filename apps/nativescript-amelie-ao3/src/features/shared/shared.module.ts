import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import {
	NativeScriptCommonModule,
	NativeScriptFormsModule,
	NativeScriptRouterModule,
} from '@nativescript/angular';
import { CardComponent } from './card/card.component';

const MODULES = [
	NativeScriptCommonModule,
	NativeScriptFormsModule,
	NativeScriptRouterModule,
];

const COMPONENTS = [
	CardComponent
]

@NgModule({
	imports: [...MODULES],
	exports: [...MODULES, ...COMPONENTS],
	schemas: [NO_ERRORS_SCHEMA],
	declarations: [...COMPONENTS],
})
export class SharedModule { }
