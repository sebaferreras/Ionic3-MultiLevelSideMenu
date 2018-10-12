// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'without-icons-page-sub-option-one',
    templateUrl: 'without-icons-sub-option-one.html'
})
@SideMenuDisplayText('Without icons >> Sub Option 1')
export class WithoutIconsSubOptionOnePage { }
