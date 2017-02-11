# Multi-level Side Menu [![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)

Ionic 2 demo of a two-level side menu. The component currently supports only two levels of items. If more levels are needed, maybe using tabs layout for the other levels would be a better approach. 

The component also supports two different modes: default and accordion.

<p>
  <img src="http://i.giphy.com/d1E17atMulAI9UEU.gif" width="350"/>
  <img src="http://i.giphy.com/l0ExnRMoD2v40Agvu.gif" width="350"/>
</p>

## Ionic View

If you want to take a look at this demo using Ionic View, use this code: **d90d8463**

## Running the demo

Inside of the project folder, run `npm install` and then to run the demo in the browser `ionic serve [-t android/ios]`

## Using the component in your projects

Just copy the `side-menu` folder (inculding the html, ts and scss files) in your project. Then include the `SideMenuContentComponent` in the `declarations` array from your `@NgModule`.

## Items structure

Menu and sub menu items should have the following format:

```
// Base Interface
export interface MenuOptionModel {
	iconName: string;
	displayName: string;
	component: any;
	isLogin: boolean;
	isLogout: boolean;
	subItems?: Array<MenuOptionModel>;
}
```

So an item with nested sub items would look like this:

```
let menuOption: MenuOptionModel = {
    iconName: 'ios-arrow-down',
    displayName: `Option Name`,
    component: PageName,
    isLogin: false,
    isLogout: false,
    subItems: [
        {
            iconName: 'ios-basket',
            displayName: `Sub Option 1`,
            component: PageName,
            isLogin: false,
            isLogout: false
        },
        {
            iconName: 'ios-bookmark',
            displayName: `Sub Option 2`,
            component: PageName,
            isLogin: false,
            isLogout: false
        }
    ]
};
```

## Selecting options

When an option is selected, the `MenuOptionModel` object is returned to the caller by the `selectOption` event. The `MenuOptionModel` object returned can then be used to check not only if the user should be redirected to a given page but also if the login / logout logic should be executed, and so on...

```
<side-menu-content [options]="options" (selectOption)="selectOption($event)"></side-menu-content>
```

## Accordion mode

To enable the accordion mode just add `[accordionMode]="true"` to the `side-menu-content` element.

```
<side-menu-content [accordionMode]="true" [options]="options" (selectOption)="selectOption($event)"></side-menu-content>
```

## Some other public methods

The component also exposes the `collapseAllOptions()` method to reset the state of the options when needed (when closing the menu for instance):

```
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

    // ...

    // Redirect the user to the selected page
	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {

			// Collapse all the options
			this.sideMenu.collapseAllOptions();

			// ...
		});
	}

}
```
