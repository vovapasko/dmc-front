import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditableComponent} from './components/editable/editable.component';
import {EditModeDirective} from './directives/edit-mode.directive';
import {EditableOnEnterDirective} from './directives/editable-on-enter.directive';
import {ViewModeDirective} from './directives/view-mode.directive';

@NgModule({
    declarations: [
        EditableComponent,
        EditModeDirective,
        EditableOnEnterDirective,
        ViewModeDirective
    ],
    exports: [
        EditableComponent,
        EditModeDirective,
        EditableOnEnterDirective,
        ViewModeDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserModule
    ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
