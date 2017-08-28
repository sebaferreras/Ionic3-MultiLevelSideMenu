// Angular
import { Component, Input, Output, Renderer2, EventEmitter, ChangeDetectionStrategy, ViewChildren, QueryList } from '@angular/core'; // tslint:disable-line

// Ionoc
import { Platform, DomController } from 'ionic-angular';

// MenuOptionModel Interface
export interface MenuOptionModel {

	// If the option has sub items and the iconName is null,
	// the default icon will be 'ios-arrow-down'.
	iconName?: string;

	// The name to display in the menu
	displayName: string;

	// Target component (or null if it's a "special option" like login/logout)
	component?: any;

	// Boolean properties to know how to handle the selected option
	// if it's a "special option". You can add some more properties to handle
	// changing the language and so on...
	isLogin?: boolean;
	isLogout?: boolean;

	// List of sub items if any
	subItems?: Array<MenuOptionModel>;
}

@Component({
	selector: 'side-menu-content',
	templateUrl: 'side-menu-content.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuContentComponent {

	@ViewChildren('options') optionDivs: QueryList<any>;
	@ViewChildren('headerIcon') headerIcons: QueryList<any>;

	// Main inputs
	@Input() options: Array<MenuOptionModel>;
	@Input() accordionMode: boolean = false;

	// Inputs for custom item sizes
	@Input() iosItemHeight: number = 50;
	@Input() mdItemHeight: number = 50;
	@Input() wpItemHeight: number = 50;

	// Default arrow icon
	@Input() arrowIcon: string = 'ios-arrow-down';

	// Outputs: return the selected option to the caller
	@Output() selectOption = new EventEmitter<any>();

	constructor(private platform: Platform,
				private renderer: Renderer2,
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

	// ---------------------------------------------------
	// PRIVATE methods
	// ---------------------------------------------------

	// Toggle the sub items of the selected option
	private toggleOptionSubItems(optionsContainer: any, elementHeight: number, itemsCount: number): void {
		this.domCtrl.write(() => {
			this.subItemsAreExpanded(optionsContainer)
				? this.renderer.setStyle(optionsContainer, 'height', '0px')
				: this.renderer.setStyle(optionsContainer, 'height', `${(elementHeight * itemsCount)}px`);
		});
	}

	// Toggle the arrow icon of the selected option
	private toggleOptionIcon(arrowIcon: any): void {
		this.domCtrl.write(() => {
			this.iconIsRotated(arrowIcon)
				? this.renderer.removeClass(arrowIcon, 'rotate')
				: this.renderer.addClass(arrowIcon, 'rotate');
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
			this.renderer.setStyle(optionsContainer, 'height', '0px');
		});
	}

	// Reset the arrow icon of the selected option
	private resetIcon(arrowIcon: any): void {
		this.domCtrl.write(() => {
			this.renderer.removeClass(arrowIcon, 'rotate');
		});
	}
}
