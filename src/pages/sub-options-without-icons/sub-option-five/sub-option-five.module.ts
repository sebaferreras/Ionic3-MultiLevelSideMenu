// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { SubOptionFivePage } from './sub-option-five';

@NgModule({
    declarations: [SubOptionFivePage],
    imports: [IonicPageModule.forChild(SubOptionFivePage)],
    exports: [SubOptionFivePage]
})
export class SubOptionFivePageModule { }