// Angular
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core'; // tslint:disable-line

// RxJS
import { Observable } from "rxjs/Observable";

// Ionic
import { Platform, Events } from 'ionic-angular';

// Models
import { SideMenuOption } from './models/side-menu-option';
import { SideMenuSettings } from './models/side-menu-settings';
import { SideMenuOptionSelect, SideMenuOptionSelectData } from './models/side-menu-option-select-event';

// This class is defined in this file because
// we don't want to make it exportable
class InnerMenuOptionModel {
	public id: number;
	public iconName: string;
	public displayText: string;
	public badge?: Observable<any>;
	public targetOption: SideMenuOption;
	public parent: InnerMenuOptionModel;
	public selected: boolean;
	public expanded: boolean;
	public suboptionsCount: number;
	public subOptions: Array<InnerMenuOptionModel>;
	private static counter = 1;
	public static fromMenuOptionModel(option: SideMenuOption, parent?: InnerMenuOptionModel): InnerMenuOptionModel {

		let innerMenuOptionModel = new InnerMenuOptionModel();

		innerMenuOptionModel.id = this.counter++;
		innerMenuOptionModel.iconName = option.iconName;
		innerMenuOptionModel.displayText = option.displayText;
		innerMenuOptionModel.badge = option.badge;
		innerMenuOptionModel.targetOption = option;
		innerMenuOptionModel.parent = parent || null;

		innerMenuOptionModel.selected = option.selected;

		if (option.suboptions) {
			innerMenuOptionModel.expanded = false;
			innerMenuOptionModel.suboptionsCount = option.suboptions.length;
			innerMenuOptionModel.subOptions = [];

			option.suboptions.forEach(subItem => {

				let innerSubItem = InnerMenuOptionModel.fromMenuOptionModel(subItem, innerMenuOptionModel);
				innerMenuOptionModel.subOptions.push(innerSubItem);

				// Select the parent if any
				// child option is selected
				if (subItem.selected) {
					innerSubItem.parent.selected = true;
					innerSubItem.parent.expanded = true;
				}

			});
		}

		return innerMenuOptionModel;
	}
}

@Component({
	selector: 'side-menu-content',
	templateUrl: 'side-menu-content.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuContentComponent {

	// Main inputs
	public menuSettings: SideMenuSettings;
	public menuOptions: Array<SideMenuOption>;

	// Private properties
	private selectedOption: InnerMenuOptionModel;

	public collapsableItems: Array<InnerMenuOptionModel> = [];

	@Input('options')
	set options(value: Array<SideMenuOption>) {
		if (value) {

			// Keep a reference to the options
			// sent to this component
			this.menuOptions = value;
			this.collapsableItems = new Array<InnerMenuOptionModel>();

			// Map the options to our internal models
			this.menuOptions.forEach(option => {
				let innerMenuOption = InnerMenuOptionModel.fromMenuOptionModel(option);
				this.collapsableItems.push(innerMenuOption);

				// Check if there's any option marked as selected
				if (option.selected) {
					this.selectedOption = innerMenuOption;
				} else if (innerMenuOption.suboptionsCount) {
					innerMenuOption.subOptions.forEach(subItem => {
						if (subItem.selected) {
							this.selectedOption = subItem;
						}
					});
				}
			});
		}
	}

	@Input('settings')
	set settings(value: SideMenuSettings) {
		if (value) {
			this.menuSettings = value;
			this.mergeSettings();
		}
	}

	// Outputs: return the selected option to the caller
	@Output() change = new EventEmitter<any>();

	constructor(private platform: Platform,
		private eventsCtrl: Events,
		private cdRef: ChangeDetectorRef) {

		// Handle the redirect event
		this.eventsCtrl.subscribe(SideMenuOptionSelect, (data: SideMenuOptionSelectData) => {
			this.updateSelectedOption(data);
		});
	}

	ngOnDestroy() {
		this.eventsCtrl.unsubscribe(SideMenuOptionSelect);
	}

	// ---------------------------------------------------
	// PUBLIC methods
	// ---------------------------------------------------

	// Send the selected option to the caller component
	public select(option: InnerMenuOptionModel): void {
		if (this.menuSettings.showSelectedOption) {
			this.setSelectedOption(option);
		}

		// Return the selected option (not our inner option)
		this.change.emit(option.targetOption);
	}

	// Toggle the sub options of the selected item
	public toggleItemOptions(targetOption: InnerMenuOptionModel): void {

		if (!targetOption) return;

		// If the accordion mode is set to true, we need
		// to collapse all the other menu options
		if (this.menuSettings.accordionMode) {
			this.collapsableItems.forEach(option => {
				if (option.id !== targetOption.id) {
					option.expanded = false;
				}
			});
		}

		// Toggle the selected option
		targetOption.expanded = !targetOption.expanded;
	}

	// Reset the entire menu
	public collapseAllOptions(): void {
		this.collapsableItems.forEach(option => {
			if (!option.selected) {
				option.expanded = false;
			}

			if (option.suboptionsCount) {
				option.subOptions.forEach(subItem => {
					if (subItem.selected) {
						// Expand the parent if any of
						// its childs is selected
						subItem.parent.expanded = true;
					}
				});
			}
		});

		// Update the view since there wasn't
		// any user interaction with it
		this.cdRef.detectChanges();
	}

	// Get the proper indentation of each option
	public get subOptionIndentation(): number {
		if (this.platform.is('ios')) return this.menuSettings.subOptionIndentation.ios;
		if (this.platform.is('windows')) return this.menuSettings.subOptionIndentation.wp;
		return this.menuSettings.subOptionIndentation.md;
	}

	// Get the proper height of each option
	public get optionHeight(): number {
		if (this.platform.is('ios')) return this.menuSettings.optionHeight.ios;
		if (this.platform.is('windows')) return this.menuSettings.optionHeight.wp;
		return this.menuSettings.optionHeight.md;
	}

	// ---------------------------------------------------
	// PRIVATE methods
	// ---------------------------------------------------

	// Method that set the selected option and its parent
	private setSelectedOption(option: InnerMenuOptionModel) {
		if (!option.targetOption.component) return;

		// Clean the current selected option if any
		if (this.selectedOption) {
			this.selectedOption.selected = false;
			this.selectedOption.targetOption.selected = false;

			if (this.selectedOption.parent) {
				this.selectedOption.parent.selected = false;
				this.selectedOption.parent.expanded = false;
			}

			this.selectedOption = null;
		}

		// Set this option to be the selected
		option.selected = true;
		option.targetOption.selected = true;

		if (option.parent) {
			option.parent.selected = true;
			option.parent.expanded = true;
		}

		// Keep a reference to the selected option
		this.selectedOption = option;

		// Update the view if needed since we may have
		// expanded or collapsed some options
		this.cdRef.detectChanges();
	}

	// Update the selected option
	private updateSelectedOption(data: SideMenuOptionSelectData): void {
		if (!data.displayText) return;

		let targetOption;

		this.collapsableItems.forEach(option => {
			if (option.displayText.toLowerCase() === data.displayText.toLowerCase()) {
				targetOption = option;
			} else if (option.suboptionsCount) {
				option.subOptions.forEach(subOption => {
					if (subOption.displayText.toLowerCase() === data.displayText.toLowerCase()) {
						targetOption = subOption;
					}
				});
			}
		});

		if (targetOption) {
			this.setSelectedOption(targetOption);
		}
	}

	// Merge the settings received with the default settings
	private mergeSettings(): void {
		const defaultSettings: SideMenuSettings = {
			accordionMode: false,
			optionHeight: {
				ios: 50,
				md: 50,
				wp: 50
			},
			arrowIcon: 'ios-arrow-down',
			showSelectedOption: false,
			selectedOptionClass: 'selected-option',
			indentSubOptionsWithoutIcons: false,
			subOptionIndentation: {
				ios: 16,
				md: 16,
				wp: 16
			}
		}

		if (!this.menuSettings) {
			// Use the default values
			this.menuSettings = defaultSettings;
			return;
		}

		if (!this.menuSettings.optionHeight) {
			this.menuSettings.optionHeight = defaultSettings.optionHeight;
		} else {
			this.menuSettings.optionHeight.ios = this.isDefinedAndPositive(this.menuSettings.optionHeight.ios) ? this.menuSettings.optionHeight.ios : defaultSettings.optionHeight.ios;
			this.menuSettings.optionHeight.md = this.isDefinedAndPositive(this.menuSettings.optionHeight.md) ? this.menuSettings.optionHeight.md : defaultSettings.optionHeight.md;
			this.menuSettings.optionHeight.wp = this.isDefinedAndPositive(this.menuSettings.optionHeight.wp) ? this.menuSettings.optionHeight.wp : defaultSettings.optionHeight.wp;
		}

		this.menuSettings.showSelectedOption = this.isDefined(this.menuSettings.showSelectedOption) ? this.menuSettings.showSelectedOption : defaultSettings.showSelectedOption;
		this.menuSettings.accordionMode = this.isDefined(this.menuSettings.accordionMode) ? this.menuSettings.accordionMode : defaultSettings.accordionMode;
		this.menuSettings.arrowIcon = this.isDefined(this.menuSettings.arrowIcon) ? this.menuSettings.arrowIcon : defaultSettings.arrowIcon;
		this.menuSettings.selectedOptionClass = this.isDefined(this.menuSettings.selectedOptionClass) ? this.menuSettings.selectedOptionClass : defaultSettings.selectedOptionClass;
		this.menuSettings.indentSubOptionsWithoutIcons = this.isDefined(this.menuSettings.indentSubOptionsWithoutIcons) ? this.menuSettings.indentSubOptionsWithoutIcons : defaultSettings.indentSubOptionsWithoutIcons;

		if (!this.menuSettings.subOptionIndentation) {
			this.menuSettings.subOptionIndentation = defaultSettings.subOptionIndentation;
		} else {
			this.menuSettings.subOptionIndentation.ios = this.isDefinedAndPositive(this.menuSettings.subOptionIndentation.ios) ? this.menuSettings.subOptionIndentation.ios : defaultSettings.subOptionIndentation.ios;
			this.menuSettings.subOptionIndentation.md = this.isDefinedAndPositive(this.menuSettings.subOptionIndentation.md) ? this.menuSettings.subOptionIndentation.md : defaultSettings.subOptionIndentation.md;
			this.menuSettings.subOptionIndentation.wp = this.isDefinedAndPositive(this.menuSettings.subOptionIndentation.wp) ? this.menuSettings.subOptionIndentation.wp : defaultSettings.subOptionIndentation.wp;
		}
	}

	private isDefined(property: any): boolean {
		return property !== null && property !== undefined;
	}

	private isDefinedAndPositive(property: any): boolean {
		return this.isDefined(property) && !isNaN(property) && property > 0;
	}
}
