// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { StaticBadgePage } from './static-badge';

@NgModule({
    declarations: [StaticBadgePage],
    imports: [IonicPageModule.forChild(StaticBadgePage)],
    exports: [StaticBadgePage]
})
export class StaticBadgePageModule { }