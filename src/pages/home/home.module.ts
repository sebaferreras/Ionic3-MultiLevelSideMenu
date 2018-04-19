// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { HomePage } from './home';

@NgModule({
    declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage)],
    exports: [HomePage]
})
export class HomePageModule { }