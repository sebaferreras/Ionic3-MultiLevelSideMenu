// Angular
import { Component } from '@angular/core';

// Ionic
import { NavController, Events } from "ionic-angular";

// Pages
import { DetailsPage } from "../details/details";

// SideMenuComponent
import { SideMenuRedirectEvent, SideMenuRedirectEventData } from './../../shared/side-menu-content/side-menu-content.component';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	constructor(private navCtrl: NavController,
				private eventCtrl: Events) { }

	public goToOption(): void {
		// Since we're redirecting to a page without clicking the option from the
		// side menu, we need to use events to tell the side menu component
		// which option should be marked as selected.
		let redirectData: SideMenuRedirectEventData = {
			displayName: 'Option 1'
		};
		this.eventCtrl.publish(SideMenuRedirectEvent, redirectData);

		// Now we can set that page as root
		this.navCtrl.setRoot(DetailsPage, { title: 'Option 1' });
	}

	public goToSubOption(): void {
		// Since we're redirecting to a page without clicking the option from the
		// side menu, we need to use events to tell the side menu component
		// which option should be marked as selected.
		let redirectData: SideMenuRedirectEventData = {
			displayName: 'Sub Option 2'
		};
		this.eventCtrl.publish(SideMenuRedirectEvent, redirectData);

		// Now we can set that page as root
		this.navCtrl.setRoot(DetailsPage, { title: 'Sub Option 2' });
	}
}
