// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { WithIconsSubOptionOnePage } from './with-icons-sub-option-one';

@NgModule({
    declarations: [WithIconsSubOptionOnePage],
    imports: [IonicPageModule.forChild(WithIconsSubOptionOnePage)],
    exports: [WithIconsSubOptionOnePage]
})
export class WithIconsSubOptionOnePageModule { }