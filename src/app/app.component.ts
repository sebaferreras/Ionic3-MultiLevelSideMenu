// Angular
import { Component, ViewChild } from '@angular/core';

// Ionic
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

// Models
import { MenuOptionModel, SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) navCtrl: Nav;

	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

	public rootPage: any = HomePage;

	public enableAccordion: boolean = true;
	public options: Array<MenuOptionModel>;

	constructor(private platform: Platform,
				private statusBar: StatusBar,
				private splashScreen: SplashScreen,
				private alertCtrl: AlertController,
				private menuCtrl: MenuController) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleLightContent();
			this.splashScreen.hide();

			// Initialize some options
			this.initializeOptions(DetailsPage);
		});
	}

	private initializeOptions(targetComponent?: any): void {
		this.options = new Array<MenuOptionModel>();

		// Load simple menu options
		// ------------------------------------------
		this.options.push({
			iconName: 'home',
			displayName: `Option 1`,
			component: targetComponent
		});

		this.options.push({
			iconName: 'analytics',
			displayName: `Option 2`,
			component: targetComponent
		});

		this.options.push({
			iconName: 'apps',
			displayName: `Option 3`,
			component: targetComponent
		});

		// Load options with nested items (with icons)
		// -----------------------------------------------
		this.options.push({
			displayName: `Sub options with icons`,
			subItems: [
				{
					iconName: 'basket',
					displayName: `Sub Option 1`,
					component: targetComponent
				},
				{
					iconName: 'bookmark',
					displayName: `Sub Option 2`,
					component: targetComponent
				}
			]
		});

		// Load options with nested items (without icons)
		// -----------------------------------------------
		this.options.push({
			displayName: `Sub options without icons`,
			subItems: [
				{
					displayName: `Sub Option 4`,
					component: targetComponent
				},
				{
					displayName: `Sub Option 5`,
					component: targetComponent
				},
				{
					displayName: `Sub Option 6`,
					component: targetComponent
				},
				{
					displayName: `Sub Option 7`,
					component: targetComponent
				}
			]
		});

		// Load special options
		// -----------------------------------------------
		this.options.push({
			displayName: `Special options`,
			subItems: [
				{
					iconName: 'log-in',
					displayName: `Login`,
					isLogin: true
				},
				{
					iconName: 'log-out',
					displayName: `Logout`,
					isLogout: true
				}
			]
		});
	}

	// Redirect the user to the selected page
	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {

			// Collapse all the options
			this.sideMenu.collapseAllOptions();

			if (option.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else {
				// Redirect to the selected page
				this.navCtrl.push(option.component || DetailsPage, { 'title': option.displayName });
			}
		});
	}

	public collapseMenuOptions(): void {
		// Collapse all the options
		this.sideMenu.collapseAllOptions();
	}

	public presentAlert(message: string): void {
		let alert = this.alertCtrl.create({
			title: 'Information',
			message: message,
			buttons: ['Ok']
		});
		alert.present();
	}

}
