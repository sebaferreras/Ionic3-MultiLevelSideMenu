// Angular references
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Platform } from 'ionic-angular';

// Base Interface
export interface MenuOptionModel {
	iconName: string;
	displayName: string;
	component: any;
	isLogin: boolean;
	isLogout: boolean;
	subItems?: Array<MenuOptionModel>;
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'side-menu-content',
	templateUrl: 'side-menu.html'
})
export class SideMenuContentComponent {

	// Main inputs
	@Input() options: Array<MenuOptionModel>;
	@Input() accordionMode: boolean = false;

	// Inputs for custom item sizes
	@Input() iosItemHeight: number = 45;
	@Input() mdItemHeight: number = 50;
	@Input() wpItemHeight: number = 50;

	// Outputs
	@Output() selectOption = new EventEmitter<any>();

	constructor(private platform: Platform) { }

	// ---------------------------------------------------
	// PUBLIC methods
	// ---------------------------------------------------

	// Send the selected option to the caller component
	public select(option: MenuOptionModel): void {
		this.selectOption.emit(option);
	}

	// Toggle the sub options of the selected item
	public toggleItemOptions(e: any, itemsCount: number): void {
		let itemHeight,
			optionsDivElement = e.currentTarget.parentElement.getElementsByClassName('options')[0],
			arrowIcon = e.currentTarget.parentElement.getElementsByClassName('header-icon')[0];

		if (this.accordionMode) {
			this.collapseAllOptionsExceptSelected(optionsDivElement);
			this.resetAllIconsExceptSelected(arrowIcon);
		}

		if (this.platform.is('ios')) {
			itemHeight = this.iosItemHeight;
		} else if (this.platform.is('windows')) {
			itemHeight = this.wpItemHeight;
		} else {
			itemHeight = this.mdItemHeight;
		}

		this.toggleOptionSubItems(optionsDivElement, itemHeight + 1, itemsCount);
		this.toggleOptionIcon(arrowIcon);
	}

	// Reset the entire menu
	public collapseAllOptions(): void {
		let options = document.getElementsByClassName('options'),
			icons = document.getElementsByClassName('header-icon');
		for (let i = 0; i < options.length; i++) {
			this.hideSubItems(options[i]);
		}
		for (let i = 0; i < icons.length; i++) {
			this.resetIcon(icons[i]);
		}
	}

	// Create fake options to populate the side menu
	public getSampleMenuOptions(targetComponent?: any): Array<MenuOptionModel> {
		let options = new Array<MenuOptionModel>();

		// Load simple menu options
		// ------------------------------------------
		options.push({
			iconName: 'ios-home',
			displayName: `Option 1`,
			isLogin: false,
			isLogout: false,
			component: targetComponent || null
		});

		options.push({
			iconName: 'ios-analytics',
			displayName: `Option 2`,
			isLogin: false,
			isLogout: false,
			component: targetComponent || null
		});

		options.push({
			iconName: 'ios-apps',
			displayName: `Option 3`,
			isLogin: false,
			isLogout: false,
			component: targetComponent || null
		});

		// Load options with nested items
		// ------------------------------------------
		options.push({
			iconName: 'ios-arrow-down',
			displayName: `Option 4`,
			component: targetComponent || null,
			isLogin: false,
			isLogout: false,
			subItems: [
				{
					iconName: 'ios-basket',
					displayName: `Sub Option 1`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-bookmark',
					displayName: `Sub Option 2`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				}
			]
		});

		options.push({
			iconName: 'ios-arrow-down',
			displayName: `Option 5`,
			component: targetComponent || null,
			isLogin: false,
			isLogout: false,
			subItems: [
				{
					iconName: 'ios-cafe',
					displayName: `Sub Option 4`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-camera',
					displayName: `Sub Option 5`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-cart',
					displayName: `Sub Option 6`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-chatboxes',
					displayName: `Sub Option 7`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				}
			]
		});

		options.push({
			iconName: 'ios-arrow-down',
			displayName: `Option 6`,
			component: targetComponent || null,
			isLogin: false,
			isLogout: false,
			subItems: [
				{
					iconName: 'ios-clock',
					displayName: `Sub Option 8`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: 'ios-flask',
					displayName: `Sub Option 9`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				}
			]
		});

		return options;
	}

	// ---------------------------------------------------
	// PRIVATE methods
	// ---------------------------------------------------

	// Toggle the sub items of the selected option
	private toggleOptionSubItems(optionsContainer: any, elementHeight: number, itemsCount: number): void {
		optionsContainer.style.height = this.subItemsAreExpanded(optionsContainer) ? '0px' : `${(elementHeight * itemsCount)}px`;
	}

	// Toggle the arrow icon of the selected option
	private toggleOptionIcon(arrowIcon: any): void {
		this.iconIsRotated(arrowIcon) ? arrowIcon.classList.remove('rotate') : arrowIcon.classList.add('rotate');
	}

	// Reset the arrow icon of all the options except the selected option
	private resetAllIconsExceptSelected(selectedArrowIcon: any): void {
		let icons = document.getElementsByClassName('header-icon');
		for (let i = 0; i < icons.length; i++) {
			if (icons[i].id !== selectedArrowIcon.id && this.iconIsRotated(icons[i])) {
				this.resetIcon(icons[i]);
			}
		}
	}

	// Collapse the sub items of all the options except the selected option
	private collapseAllOptionsExceptSelected(selectedOptionsContainer: any): void {
		let options = document.getElementsByClassName('options');
		for (let i = 0; i < options.length; i++) {
			if (options[i].id !== selectedOptionsContainer.id && this.subItemsAreExpanded(options[i])) {
				this.hideSubItems(options[i]);
			}
		}
	}

	// Return true if sub items are expanded
	private subItemsAreExpanded(element: any): boolean {
		return element.style.height !== '' && element.style.height !== '0px';
	}

	// Return true if the icon is rotated
	private iconIsRotated(element: any): boolean {
		return element.classList.contains('rotate')
	}

	// Collapse the sub items of the selected option
	private hideSubItems(optionsContainer: any): void {
		optionsContainer.style.height = '0px';
	}

	// Reset the arrow icon of the selected option
	private resetIcon(arrowIcon: any): void {
		arrowIcon.classList.remove('rotate')
	}
}
