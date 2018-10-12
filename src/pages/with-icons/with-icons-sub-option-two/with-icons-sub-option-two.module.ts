// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { WithIconsSubOptionTwoPage } from './with-icons-sub-option-two';

@NgModule({
    declarations: [WithIconsSubOptionTwoPage],
    imports: [IonicPageModule.forChild(WithIconsSubOptionTwoPage)],
    exports: [WithIconsSubOptionTwoPage]
})
export class WithIconsSubOptionTwoPageModule { }