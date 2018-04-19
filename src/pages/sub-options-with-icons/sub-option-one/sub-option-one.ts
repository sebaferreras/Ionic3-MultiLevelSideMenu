// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'page-sub-option-one',
    templateUrl: 'sub-option-one.html'
})
@SideMenuDisplayText('Sub Option 1')
export class SubOptionOnePage { }
