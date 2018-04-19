// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { SubOptionOnePage } from './sub-option-one';

@NgModule({
    declarations: [SubOptionOnePage],
    imports: [IonicPageModule.forChild(SubOptionOnePage)],
    exports: [SubOptionOnePage]
})
export class SubOptionOnePageModule { }