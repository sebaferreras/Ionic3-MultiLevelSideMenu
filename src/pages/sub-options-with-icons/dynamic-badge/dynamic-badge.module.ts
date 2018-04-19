// Angular
import { NgModule } from '@angular/core';

// Ionic
import { IonicPageModule } from 'ionic-angular';

// Pages
import { DynamicBadgePage } from './dynamic-badge';

@NgModule({
    declarations: [DynamicBadgePage],
    imports: [IonicPageModule.forChild(DynamicBadgePage)],
    exports: [DynamicBadgePage]
})
export class DynamicBadgePageModule { }