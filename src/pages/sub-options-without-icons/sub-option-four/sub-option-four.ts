// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'page-sub-option-four',
    templateUrl: 'sub-option-four.html'
})
@SideMenuDisplayText('Sub Option 4')
export class SubOptionFourPage { }
