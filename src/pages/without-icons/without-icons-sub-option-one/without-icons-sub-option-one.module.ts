// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { WithoutIconsSubOptionOnePage } from './without-icons-sub-option-one';

@NgModule({
    declarations: [WithoutIconsSubOptionOnePage],
    imports: [IonicPageModule.forChild(WithoutIconsSubOptionOnePage)],
    exports: [WithoutIconsSubOptionOnePage]
})
export class WithoutIconsSubOptionOnePageModule { }