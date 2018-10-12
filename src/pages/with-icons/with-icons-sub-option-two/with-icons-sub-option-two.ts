// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'with-icons-page-sub-option-two',
    templateUrl: 'with-icons-sub-option-two.html'
})
@SideMenuDisplayText('With icons >> Sub Option 2')
export class WithIconsSubOptionTwoPage { }
