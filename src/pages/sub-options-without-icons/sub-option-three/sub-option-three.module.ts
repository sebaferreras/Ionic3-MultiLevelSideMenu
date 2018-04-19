// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { SubOptionThreePage } from './sub-option-three';

@NgModule({
    declarations: [SubOptionThreePage],
    imports: [IonicPageModule.forChild(SubOptionThreePage)],
    exports: [SubOptionThreePage]
})
export class SubOptionThreePageModule { }