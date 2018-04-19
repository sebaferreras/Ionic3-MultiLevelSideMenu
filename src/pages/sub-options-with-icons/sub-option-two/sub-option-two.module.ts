// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { SubOptionTwoPage } from './sub-option-two';

@NgModule({
    declarations: [SubOptionTwoPage],
    imports: [IonicPageModule.forChild(SubOptionTwoPage)],
    exports: [SubOptionTwoPage]
})
export class SubOptionTwoPageModule { }