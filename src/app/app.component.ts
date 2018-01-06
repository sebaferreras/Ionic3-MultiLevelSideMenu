
// Angular
import { Component, ViewChild } from '@angular/core';

// RxJS
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ArrayObservable } from "rxjs/observable/ArrayObservable";

// Ionic
import { Nav, Platform, MenuController, AlertController } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

// Side Menu Component
import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';
import { SideMenuSettings } from './../shared/side-menu-content/models/side-menu-settings';
import { MenuOptionModel } from './../shared/side-menu-content/models/menu-option-model';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) navCtrl: Nav;

	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

	public rootPage: any = HomePage;

	// Options to show in the SideMenuComponent
	public options: Array<MenuOptionModel>;

	// Settings for the SideMenuComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option',
		subOptionIndentation: {
			md: '56px',
			ios: '64px',
			wp: '56px'
		}
	};

	private unreadCountObservable: any = new ReplaySubject<number>(0);

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
			this.initializeOptions();
		});

		// Change the value for the batch every 5 seconds
		setInterval(() => {
			this.unreadCountObservable.next(Math.floor(Math.random() * 10));
		}, 5000);

	}

	private initializeOptions(): void {
		this.options = new Array<MenuOptionModel>();

		// Load simple menu options
		// ------------------------------------------
		this.options.push({
			iconName: 'home',
			displayName: 'Home',
			component: HomePage,

			// This option is already selected
			selected: true
		});

		this.options.push({
			iconName: 'analytics',
			displayName: 'Option 1',
			component: DetailsPage
		});

		this.options.push({
			iconName: 'apps',
			displayName: 'Option 2',
			component: DetailsPage
		});

		this.options.push({
			iconName: 'bowtie',
			displayName: 'With Badge',
			badge: ArrayObservable.of('NEW'),
			component: DetailsPage
		});

		// Load options with nested items (with icons)
		// -----------------------------------------------
		this.options.push({
			displayName: 'Sub options with icons',
			subItems: [
				{
					iconName: 'basket',
					displayName: 'Sub Option 1',
					component: DetailsPage
				},
				{
					iconName: 'bookmark',
					displayName: 'Sub Option 2',
					component: DetailsPage
				},
				{
					iconName: 'bug',
					displayName: 'With Badge',
					badge: this.unreadCountObservable,
					component: DetailsPage
				}
			]
		});

		// Load options with nested items (without icons)
		// -----------------------------------------------
		this.options.push({
			displayName: 'Sub options without icons',
			subItems: [
				{
					displayName: 'Sub Option 4',
					component: DetailsPage
				},
				{
					displayName: 'Sub Option 5',
					component: DetailsPage
				},
				{
					displayName: 'Sub Option 6',
					component: DetailsPage
				},
				{
					displayName: 'Sub Option 7',
					component: DetailsPage
				}
			]
		});

		// Load special options
		// -----------------------------------------------
		this.options.push({
			displayName: 'Special options',
			subItems: [
				{
					iconName: 'log-in',
					displayName: 'Login',
					custom: {
						isLogin: true
					}
				},
				{
					iconName: 'log-out',
					displayName: 'Logout',
					custom: {
						isLogout: true
					}
				},
				{
					iconName: 'globe',
					displayName: 'Open Google',
					custom: {
						isExternalLink: true,
						externalUrl: 'http://www.google.com'
					}
				}
			]
		});
	}

	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Redirect to the selected page
				this.navCtrl.setRoot(option.component || DetailsPage, { 'title': option.displayName });
			}
		});
	}

	public collapseMenuOptions(): void {
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
