// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'page-sub-option-five',
    templateUrl: 'sub-option-five.html'
})
@SideMenuDisplayText('Sub Option 5')
export class SubOptionFivePage { }
