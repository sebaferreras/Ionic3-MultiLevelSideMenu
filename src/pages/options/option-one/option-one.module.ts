// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { OptionOnePage } from './option-one';

@NgModule({
    declarations: [OptionOnePage],
    imports: [IonicPageModule.forChild(OptionOnePage)],
    exports: [OptionOnePage]
})
export class OptionOnePageModule { }