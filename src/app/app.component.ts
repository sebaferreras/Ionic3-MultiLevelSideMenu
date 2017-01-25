// Angular references
import { Component, ViewChild } from '@angular/core';

// Ionic references
import { Nav, Platform, MenuController} from 'ionic-angular';

// Ionic Native references
import { StatusBar, Splashscreen } from 'ionic-native';

// Pages
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

// Models
import { MenuOptionModel, SideMenuContentComponent } from '../shared/side-menu/side-menu';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) navCtrl: Nav;

	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

	public rootPage: any = HomePage;
	public options: Array<MenuOptionModel>;

	constructor(private platform: Platform,
				private menuCtrl: MenuController) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			StatusBar.styleDefault();
			Splashscreen.hide();

			// TODO: replace by real options
			this.options = this.sideMenu.getSampleMenuOptions(DetailsPage);
		});
	}

	// Redirect the user to the selected page
	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {

			// Collapse all the options
			this.sideMenu.collapseAllOptions();

			// Redirect to the selected page
			this.navCtrl.push(option.component || DetailsPage, { 'title': option.displayName });
		});
	}
}
