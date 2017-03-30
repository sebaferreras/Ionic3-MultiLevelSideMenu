// Angular references
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, Renderer, ViewChildren, QueryList } from '@angular/core';

import { Platform, DomController } from 'ionic-angular';

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

	@ViewChildren('options') optionDivs: QueryList<any>;
	@ViewChildren('headerIcon') headerIcons;

	// Main inputs
	@Input() options: Array<MenuOptionModel>;
	@Input() accordionMode: boolean = false;

	// Inputs for custom item sizes
	@Input() iosItemHeight: number = 50;
	@Input() mdItemHeight: number = 50;
	@Input() wpItemHeight: number = 50;

	// Outputs
	@Output() selectOption = new EventEmitter<any>();

	constructor(private platform: Platform,
				private renderer: Renderer,
        		private domCtrl: DomController) { }

	// ---------------------------------------------------
	// PUBLIC methods
	// ---------------------------------------------------

	// Send the selected option to the caller component
	public select(option: MenuOptionModel): void {
		this.selectOption.emit(option);
	}

	// Toggle the sub options of the selected item
	public toggleItemOptions(optionsDivElement: any, arrowIcon: any, itemsCount: number): void {
		let itemHeight;

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
		this.optionDivs.forEach(optionDiv => {
			this.hideSubItems(optionDiv.nativeElement);
		});
		this.headerIcons.forEach(headerIcon => {
			this.resetIcon(headerIcon.nativeElement);
		});
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
			displayName: `Sub options with icons`,
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
			displayName: `Sub options without icons`,
			component: targetComponent || null,
			isLogin: false,
			isLogout: false,
			subItems: [
				{
					iconName: null,
					displayName: `Sub Option 4`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: null,
					displayName: `Sub Option 5`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: null,
					displayName: `Sub Option 6`,
					component: targetComponent || null,
					isLogin: false,
					isLogout: false
				},
				{
					iconName: null,
					displayName: `Sub Option 7`,
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
		this.domCtrl.write(() => {
            this.subItemsAreExpanded(optionsContainer)
                ? this.renderer.setElementStyle(optionsContainer, 'height', '0px')
                : this.renderer.setElementStyle(optionsContainer, 'height', `${(elementHeight * itemsCount)}px`);
        });
	}

	// Toggle the arrow icon of the selected option
	private toggleOptionIcon(arrowIcon: any): void {
		this.domCtrl.write(() => {
            this.iconIsRotated(arrowIcon)
                ? this.renderer.setElementClass(arrowIcon, 'rotate', false)
                : this.renderer.setElementClass(arrowIcon, 'rotate', true);
        });
	}

	// Reset the arrow icon of all the options except the selected option
	private resetAllIconsExceptSelected(selectedArrowIcon: any): void {
		this.headerIcons.forEach(headerIcon => {
			let iconElement = headerIcon.nativeElement;
			if (iconElement.id !== selectedArrowIcon.id && this.iconIsRotated(iconElement)) {
                this.resetIcon(iconElement);
            }
		});
	}

	// Collapse the sub items of all the options except the selected option
	private collapseAllOptionsExceptSelected(selectedOptionsContainer: any): void {
		this.optionDivs.forEach(optionDiv => {
			let optionElement = optionDiv.nativeElement;
			if (optionElement.id !== selectedOptionsContainer.id && this.subItemsAreExpanded(optionElement)) {
				this.hideSubItems(optionElement);
			}
		});
	}

	// Return true if sub items are expanded
	private subItemsAreExpanded(element: any): boolean {
		return element.style.height !== '' && element.style.height !== '0px';
	}

	// Return true if the icon is rotated
	private iconIsRotated(element: any): boolean {
		return element.classList.contains('rotate');
	}

	// Collapse the sub items of the selected option
	private hideSubItems(optionsContainer: any): void {
		this.domCtrl.write(() => {
            this.renderer.setElementStyle(optionsContainer, 'height', '0px');
        });
	}

	// Reset the arrow icon of the selected option
	private resetIcon(arrowIcon: any): void {
		this.domCtrl.write(() => {
            this.renderer.setElementClass(arrowIcon, 'rotate', false);
        });
	}
}
