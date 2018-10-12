
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

// Side Menu Component
import { SideMenuSettings } from './../shared/side-menu-content/models/side-menu-settings';
import { SideMenuOption } from './../shared/side-menu-content/models/side-menu-option';
import { SideMenuContentComponent } from './../shared/side-menu-content/side-menu-content.component';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) navCtrl: Nav;

	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

	public rootPage: any = 'HomePage';

	// Options to show in the SideMenuContentComponent
	public options: Array<SideMenuOption>;

	// Settings for the SideMenuContentComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option'		
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
			this.unreadCountObservable.next(Math.floor(Math.random() * 10) + 1);
		}, 5000);

	}

	private initializeOptions(): void {
		this.options = new Array<SideMenuOption>();

		// Load simple menu options
		// ------------------------------------------
		this.options.push({
			iconName: 'home',
			displayText: 'Home',
			component: 'HomePage',
		});

		this.options.push({
			iconName: 'analytics',
			displayText: 'Option 1',
			component: 'OptionOnePage'
		});

		this.options.push({
			iconName: 'apps',
			displayText: 'Option 2',
			component: 'OptionTwoPage'
		});

		this.options.push({
			iconName: 'bowtie',
			displayText: 'Static Badge',
			badge: ArrayObservable.of('NEW'),
			component: 'StaticBadgePage'
		});

		// Load options with nested items (with icons)
		// -----------------------------------------------
		this.options.push({
			displayText: 'With icons',
			suboptions: [
				{
					iconName: 'basket',
					displayText: 'Sub Option 1',
					component: 'WithIconsSubOptionOnePage'
				},
				{
					iconName: 'bookmark',
					displayText: 'Sub Option 2',
					component: 'WithIconsSubOptionTwoPage'
				},
				{
					iconName: 'bug',
					displayText: 'Dynamic Badge',
					badge: this.unreadCountObservable,
					component: 'DynamicBadgePage'
				}
			]
		});

		// Load options with nested items (without icons)
		// -----------------------------------------------
		this.options.push({
			displayText: 'Without icons',
			suboptions: [
				{
					displayText: 'Sub Option 1',
					component: 'WithoutIconsSubOptionOnePage'
				},
				{
					displayText: 'Sub Option 2',
					component: 'WithoutIconsSubOptionTwoPage'
				},
			]
		});

		this.options.push({
			displayText: 'Same component',
			suboptions: [
				{
					iconName: 'mail',
					displayText: 'Inbox',
					component: 'EmailsPage',
					custom: {
						param: { showDeleted: false }
					}
				},
				{
					iconName: 'trash',
					displayText: 'Bin',
					component: 'EmailsPage',
					custom: {
						param: { showDeleted: true }
					}
				}
			]
		});

		// Load special options
		// -----------------------------------------------
		this.options.push({
			displayText: 'Special options',
			suboptions: [
				{
					iconName: 'log-in',
					displayText: 'Login',
					custom: {
						isLogin: true
					}
				},
				{
					iconName: 'log-out',
					displayText: 'Logout',
					custom: {
						isLogout: true
					}
				},
				{
					iconName: 'globe',
					displayText: 'Open Google',
					custom: {
						isExternalLink: true,
						externalUrl: 'http://www.google.com'
					}
				}
			]
		});

	}

	public onOptionSelected(option: SideMenuOption): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url, '_blank');
			} else {
				// Get the params if any
				const params = option.custom && option.custom.param;

				// Redirect to the selected page
				this.navCtrl.setRoot(option.component, params);
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
