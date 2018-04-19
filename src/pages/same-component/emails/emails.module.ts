// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { EmailsPage } from './emails';

@NgModule({
    declarations: [EmailsPage],
    imports: [IonicPageModule.forChild(EmailsPage)],
    exports: [EmailsPage]
})
export class EmailsPageModule { }