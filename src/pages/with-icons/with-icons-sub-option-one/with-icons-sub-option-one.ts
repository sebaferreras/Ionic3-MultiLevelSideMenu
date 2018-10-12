// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'with-icons-page-sub-option-one',
    templateUrl: 'with-icons-sub-option-one.html'
})
@SideMenuDisplayText('With icons >> Sub Option 1')
export class WithIconsSubOptionOnePage { }
