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
			this.loadFakeOptions();
		});
	}

	// Create fake options to populate the side menu
	private loadFakeOptions(): void {
		this.options = new Array<MenuOptionModel>();

		// Load simple menu options
		// ------------------------------------------
		this.options.push({
			iconName: 'ios-home',
			displayName: `Option 1`,
			isLogin: false,
			isLogout: false,
			component: DetailsPage
		});

		this.options.push({
			iconName: 'ios-analytics',
			displayName: `Option 2`,
			isLogin: false,
			isLogout: false,
			component: DetailsPage
		});

		this.options.push({
			iconName: 'ios-apps',
			displayName: `Option 3`,
			isLogin: false,
			isLogout: false,
			component: DetailsPage
		});

		// Load options with nested items
		// ------------------------------------------
		this.options.push({
			iconName: 'ios-arrow-down',
			displayName: `Option 4`,
			component: DetailsPage,
			isLogin: false,
			isLogout: false,
			subItems: [
				{
					iconName: 'ios-basket',
					displayName: `Sub Option 1`,
					component: DetailsPage,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-bookmark',
					displayName: `Sub Option 2`,
					component: DetailsPage,
					isLogin: false,
					isLogout: false
				}
			]
		});

		this.options.push({
			iconName: 'ios-arrow-down',
			displayName: `Option 5`,
			component: DetailsPage,
			isLogin: false,
			isLogout: false,
			subItems: [
				{
					iconName: 'ios-cafe',
					displayName: `Sub Option 4`,
					component: DetailsPage,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-camera',
					displayName: `Sub Option 5`,
					component: DetailsPage,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-cart',
					displayName: `Sub Option 6`,
					component: DetailsPage,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-chatboxes',
					displayName: `Sub Option 7`,
					component: DetailsPage,
					isLogin: false,
					isLogout: false
				}
			]
		});

		this.options.push({
			iconName: 'ios-arrow-down',
			displayName: `Option 6`,
			component: DetailsPage,
			isLogin: false,
			isLogout: false,
			subItems: [
				{
					iconName: 'ios-clock',
					displayName: `Sub Option 8`,
					component: DetailsPage,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-flask',
					displayName: `Sub Option 9`,
					component: DetailsPage,
					isLogin: false,
					isLogout: false
				}
			]
		});

	}

	// Redirect the user to the selected page
	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {

			// Collapse all the options
			this.sideMenu.collapseAllOptions();

			// Redirect to the selected page
			this.navCtrl.push(DetailsPage, { 'title': option.displayName });
		});
	}
}
