// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'page-sub-option-two',
    templateUrl: 'sub-option-two.html'
})
@SideMenuDisplayText('Sub Option 2')
export class SubOptionTwoPage { }
