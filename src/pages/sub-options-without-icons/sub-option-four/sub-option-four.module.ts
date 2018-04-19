// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { SubOptionFourPage } from './sub-option-four';

@NgModule({
    declarations: [SubOptionFourPage],
    imports: [IonicPageModule.forChild(SubOptionFourPage)],
    exports: [SubOptionFourPage]
})
export class SubOptionFourPageModule { }