// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { WithoutIconsSubOptionTwoPage } from './without-icons-sub-option-two';

@NgModule({
    declarations: [WithoutIconsSubOptionTwoPage],
    imports: [IonicPageModule.forChild(WithoutIconsSubOptionTwoPage)],
    exports: [WithoutIconsSubOptionTwoPage]
})
export class WithoutIconsSubOptionTwoPageModule { }