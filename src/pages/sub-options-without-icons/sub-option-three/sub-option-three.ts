// Angular
import { Component } from '@angular/core';

// Ionic
import { IonicPage } from 'ionic-angular';

// Side Menu Component
import { SideMenuDisplayText } from '../../../shared/side-menu-content/custom-decorators/side-menu-display-text.decorator';

@IonicPage()
@Component({
    selector: 'page-sub-option-three',
    templateUrl: 'sub-option-three.html'
})
@SideMenuDisplayText('Sub Option 3')
export class SubOptionThreePage { }
