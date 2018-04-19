// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage, NavParams } from 'ionic-angular';

// Side Menu Component
import { Matcher } from '../../../shared/side-menu-content/models/side-menu-option-select-condition';
import { SideMenuDisplayTextConditions } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text-conditions.decorator';

@IonicPage({
    segment: 'emails/:showDeleted'
})
@Component({
    selector: 'page-emails',
    templateUrl: 'emails.html'
})
@SideMenuDisplayTextConditions([
    { propertyName: 'showDeleted', matcher: Matcher.ToBeFalsy, displayText: 'Inbox' },
    { propertyName: 'showDeleted', matcher: Matcher.ToBeTruthy, displayText: 'Bin' }
])
export class EmailsPage {

    public showDeleted: boolean;

    constructor(private navParams: NavParams) { }

    ionViewWillEnter() {
        // We initialize the showDeleted property so it can be ready
        // to be used in the SideMenuDisplayTextConditions decorator
        this.showDeleted = this.toBoolean(this.navParams.get('showDeleted'));
    }

    // Method that converts the parameter to boolean if needed
    private toBoolean(value: any): boolean {
        if (typeof value === 'boolean') return value;
        return value === 'false' ? false : true;
    }
}
