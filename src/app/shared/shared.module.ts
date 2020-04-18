import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UIModule} from './ui/ui.module';
import {EditableComponent} from './editable/editable.component';
import {EditModeDirective} from './directives/edit-mode.directive';
import {EditableOnEnterDirective} from './directives/editable-on-enter.directive';
import {ViewModeDirective} from './directives/view-mode.directive';
import {AlifeFileToBase64Module} from "alife-file-to-base64";

@NgModule({
    declarations: [
        EditableComponent,
        EditModeDirective,
        EditableOnEnterDirective,
        ViewModeDirective
    ],
    imports: [
        CommonModule,
        UIModule,
        AlifeFileToBase64Module
    ],
    exports: [
        UIModule,
        AlifeFileToBase64Module,
        EditableComponent,
        EditModeDirective,
        EditableOnEnterDirective,
        ViewModeDirective
    ]
})
export class SharedModule {
}
