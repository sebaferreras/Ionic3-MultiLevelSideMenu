// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { OptionTwoPage } from './option-two';

@NgModule({
    declarations: [OptionTwoPage],
    imports: [IonicPageModule.forChild(OptionTwoPage)],
    exports: [OptionTwoPage]
})
export class OptionTwoPageModule { }