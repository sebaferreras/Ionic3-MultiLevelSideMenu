// Angular
import { Component, Input, Output, Renderer2, EventEmitter, ChangeDetectionStrategy, ViewChildren, QueryList, NgZone, ChangeDetectorRef } from '@angular/core'; // tslint:disable-line

// Ionic
import { Platform, DomController, Events } from 'ionic-angular';

// MenuOptionModel interface
export interface MenuOptionModel {

	// If the option has sub items and the iconName is null,
	// the default icon will be 'ios-arrow-down'.
	iconName?: string;

	// The name to display in the menu
	displayName: string;

	// Target component (or null if it's a "special option" like login/logout)
	component?: any;

	// Here you can pass whatever you need, and will be returned if this
	// option is selected. That way you can handle login/logout options,
	// changing the language, and son on...
	custom?: any;

	// Set if this option is selected by default
	selected?: boolean;

	// List of sub items if any
	subItems?: Array<MenuOptionModel>;
}

// SideMenuSettings interface
export interface SideMenuSettings {
	accordionMode?: boolean;
	arrowIcon?: string;

	itemHeight?: {
		ios?: number,
		md?: number,
		wp?: number
	};

	showSelectedOption?: boolean;
	selectedOptionClass?: string;

	indentSubOptionsWithoutIcons?: boolean;

	subOptionIndentation?: {
		ios?: string,
		md?: string,
		wp?: string
	};
}

// SideMenuRedirectEvent constant
export const SideMenuRedirectEvent: string = 'sidemenu:redirect';

// SideMenuRedirectEventData interface
export interface SideMenuRedirectEventData {
	displayName?: string;
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
	public menuSettings: SideMenuSettings;
	public menuOptions: Array<MenuOptionModel>;

	// Private properties
	private selectedOption: MenuOptionModel;
	private parents: Map<string, MenuOptionModel>;

	@Input('options')
	set options(value: Array<MenuOptionModel>) {
		if (value) {
			this.menuOptions = value;

			if (!this.menuSettings || this.menuSettings.showSelectedOption) {
				this.selectedOption = this.menuOptions.find(option => option.selected);

				this.parents = new Map<string, MenuOptionModel>();

				this.menuOptions.forEach(option => {
					if (option.subItems) {
						option.subItems.forEach(subItem => {
							this.parents.set(subItem.displayName.toLowerCase(), option);
						});
					}
				});
			}
		}
	}

	@Input('settings')
	set settings(value: SideMenuSettings) {
		if (value) {
			this.menuSettings = value;
			this.mergeSettings();

			if (!this.menuSettings.showSelectedOption && this.selectedOption) {
				let parent = this.parents.get(this.selectedOption.displayName.toLowerCase());

				// Unselect the parent and the child
				parent.selected = false;
				this.selectedOption.selected = false;

				// Reset the reference to the selected option
				this.selectedOption = null;
			}
		}
	}

	// Outputs: return the selected option to the caller
	@Output() selectOption = new EventEmitter<any>();

	constructor(private platform: Platform,
				private renderer: Renderer2,
				private domCtrl: DomController,
				private eventsCtrl: Events,
				private cdRef: ChangeDetectorRef) {
		this.eventsCtrl.subscribe(SideMenuRedirectEvent, (data: SideMenuRedirectEventData) => {
			this.updateSelectedOption(data);
			this.collapseAllOptions();
		});
	}

	ngOnDestroy() {
		this.eventsCtrl.unsubscribe(SideMenuRedirectEvent);
	}

	// ---------------------------------------------------
	// PUBLIC methods
	// ---------------------------------------------------

	// Send the selected option to the caller component
	public select(option: MenuOptionModel): void {
		if (this.menuSettings.showSelectedOption) {
			this.setSelectedOption(option);
		}
		this.selectOption.emit(option);
	}

	// Toggle the sub options of the selected item
	public toggleItemOptions(optionsDivElement: any, arrowIcon: any, itemsCount: number): void {
		if (this.menuSettings.accordionMode) {
			this.collapseAllOptionsExceptToggled(optionsDivElement);
			this.resetAllIconsExceptToggled(arrowIcon);
		}

		this.toggleOptionSubItems(optionsDivElement, this.itemHeight + 1, itemsCount);
		this.toggleOptionIcon(arrowIcon);
	}

	// Reset the entire menu
	public collapseAllOptions(): void {
		this.optionDivs.forEach(optionDiv => {
			this.domCtrl.read(() => {
				let optionElement = optionDiv.nativeElement;
				if (!optionElement.classList.contains('parent-of-selected')) {
					this.hideSubItems(optionDiv.nativeElement);
				} else {
					if (!this.subItemsAreExpanded(optionElement)) {
						let parent = this.parents.get(this.selectedOption.displayName.toLowerCase());
						this.toggleOptionSubItems(optionElement, this.itemHeight + 1, parent.subItems.length);
					}
				}
			});
		});
		this.headerIcons.forEach(headerIcon => {
			this.domCtrl.read(() => {
				let iconElement = headerIcon.nativeElement;
				if (!iconElement.classList.contains('parent-of-selected')) {
					this.resetIcon(headerIcon.nativeElement);
				} else {
					if (!this.iconIsRotated(iconElement)) {
						this.toggleOptionIcon(iconElement);
					}
				}
			});
		});
	}

	public get subOptionIndentation(): string {
		if (this.platform.is('ios')) return this.menuSettings.subOptionIndentation.ios;
		if (this.platform.is('windows')) return this.menuSettings.subOptionIndentation.wp;
		return this.menuSettings.subOptionIndentation.md;
	}

	public get itemHeight(): number {
		if (this.platform.is('ios')) return this.menuSettings.itemHeight.ios;
		if (this.platform.is('windows')) return this.menuSettings.itemHeight.wp;
		return this.menuSettings.itemHeight.md;
	}

	// ---------------------------------------------------
	// PRIVATE methods
	// ---------------------------------------------------

	// Method that resets the selected option and its parent
	private resetSelectedOption() {
		if (!this.selectedOption) return;

		this.resetSelectedOptionParent();
		this.selectedOption.selected = false;
		this.selectedOption = null;
	}

	// Method that resets the parent of the current selected option
	private resetSelectedOptionParent() {
		let parent = this.parents.get(this.selectedOption.displayName.toLowerCase());
		if (parent) {
			parent.selected = false;
		}
	}

	// Method that set the selected option and its parent
	private setSelectedOption(option: MenuOptionModel) {
		if (!option.component) return;

		this.resetSelectedOption();

		this.setOptionParentAsSelected(option);
		option.selected = true;
		this.selectedOption = option;
	}

	// Method that sets as selected the parent of the given option
	private setOptionParentAsSelected(option: MenuOptionModel) {
		let parent = this.parents.get(option.displayName.toLowerCase());
		if (parent) {
			parent.selected = true;
		}
	}

	// Update the selected option
	private updateSelectedOption(data: SideMenuRedirectEventData): void {

		if (!data.displayName) {
			return;
		}

		let targetOption;

		this.menuOptions.forEach(option => {
			if (option.displayName.toLowerCase() === data.displayName.toLowerCase()) {
				targetOption = option;
			} else {
				if (option.subItems) {
					option.subItems.forEach(subItem => {
						if (subItem.displayName.toLowerCase() === data.displayName.toLowerCase()) {
							targetOption = subItem;
						}
					});
				}
			}
		});

		if (targetOption) {
			this.resetSelectedOption();
			this.setSelectedOption(targetOption);
			this.cdRef.detectChanges();
		}
	}

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
	private resetAllIconsExceptToggled(selectedArrowIcon: any): void {
		this.headerIcons.forEach(headerIcon => {
			this.domCtrl.read(() => {
				let iconElement = headerIcon.nativeElement;
				if (iconElement.id !== selectedArrowIcon.id && this.iconIsRotated(iconElement)) {
					this.resetIcon(iconElement);
				}
			});
		});
	}

	// Collapse the sub items of all the options except the selected option
	private collapseAllOptionsExceptToggled(selectedOptionsContainer: any): void {
		this.optionDivs.forEach(optionDiv => {
			this.domCtrl.read(() => {
				let optionElement = optionDiv.nativeElement;
				if (optionElement.id !== selectedOptionsContainer.id && this.subItemsAreExpanded(optionElement)) {
					this.hideSubItems(optionElement);
				}
			});
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

	// Merge the settings received with the default settings
	private mergeSettings(): void {
		const defaultSettings: SideMenuSettings = {
			accordionMode: false,
			itemHeight: {
				ios: 50,
				md: 50,
				wp: 50
			},
			arrowIcon: 'ios-arrow-down',
			showSelectedOption: false,
			selectedOptionClass: 'selected-option',
			indentSubOptionsWithoutIcons: false,
			subOptionIndentation: {
				ios: '16px',
				md: '16px',
				wp: '16px'
			}
		}

		if (!this.menuSettings) {
			// Use the default values
			this.menuSettings = defaultSettings;
			return;
		}

		if (!this.menuSettings.itemHeight) {
			this.menuSettings.itemHeight = defaultSettings.itemHeight;
		} else {
			this.menuSettings.itemHeight.ios = this.isDefinedAndPositive(this.menuSettings.itemHeight.ios) ? this.menuSettings.itemHeight.ios : defaultSettings.itemHeight.ios;
			this.menuSettings.itemHeight.md = this.isDefinedAndPositive(this.menuSettings.itemHeight.md) ? this.menuSettings.itemHeight.md : defaultSettings.itemHeight.md;
			this.menuSettings.itemHeight.wp = this.isDefinedAndPositive(this.menuSettings.itemHeight.wp) ? this.menuSettings.itemHeight.wp : defaultSettings.itemHeight.wp;
		}

		this.menuSettings.showSelectedOption = this.isDefined(this.menuSettings.showSelectedOption) ? this.menuSettings.showSelectedOption : defaultSettings.showSelectedOption;
		this.menuSettings.accordionMode = this.isDefined(this.menuSettings.accordionMode) ? this.menuSettings.accordionMode : defaultSettings.accordionMode;
		this.menuSettings.arrowIcon = this.isDefined(this.menuSettings.arrowIcon) ? this.menuSettings.arrowIcon : defaultSettings.arrowIcon;
		this.menuSettings.selectedOptionClass = this.isDefined(this.menuSettings.selectedOptionClass) ? this.menuSettings.selectedOptionClass : defaultSettings.selectedOptionClass;
		this.menuSettings.subOptionIndentation = this.isDefined(this.menuSettings.subOptionIndentation) ? this.menuSettings.subOptionIndentation : defaultSettings.subOptionIndentation;

		this.menuSettings.indentSubOptionsWithoutIcons = this.isDefined(this.menuSettings.indentSubOptionsWithoutIcons) ? this.menuSettings.indentSubOptionsWithoutIcons : defaultSettings.indentSubOptionsWithoutIcons;


		if (!this.menuSettings.subOptionIndentation) {
			this.menuSettings.subOptionIndentation = defaultSettings.subOptionIndentation;
		} else {
			this.menuSettings.subOptionIndentation.ios = this.isDefined(this.menuSettings.subOptionIndentation.ios) ? this.menuSettings.subOptionIndentation.ios : defaultSettings.subOptionIndentation.ios;
			this.menuSettings.subOptionIndentation.md = this.isDefined(this.menuSettings.subOptionIndentation.md) ? this.menuSettings.subOptionIndentation.md : defaultSettings.subOptionIndentation.md;
			this.menuSettings.subOptionIndentation.wp = this.isDefined(this.menuSettings.subOptionIndentation.wp) ? this.menuSettings.subOptionIndentation.wp : defaultSettings.subOptionIndentation.wp;
		}
	}

	private isDefined(property: any): boolean {
		return property !== null && property !== undefined;
	}

	private isDefinedAndPositive(property: any): boolean {
		return this.isDefined(property) && !isNaN(property) && property > 0;
	}
}
