// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'page-option-two',
    templateUrl: 'option-two.html'
})
@SideMenuDisplayText('Option 2')
export class OptionTwoPage { }
