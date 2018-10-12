// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'without-icons-page-sub-option-two',
    templateUrl: 'without-icons-sub-option-two.html'
})
@SideMenuDisplayText('Without icons >> Sub Option 2')
export class WithoutIconsSubOptionTwoPage { }
