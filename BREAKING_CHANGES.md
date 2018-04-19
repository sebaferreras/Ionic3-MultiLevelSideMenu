# **🔥 ⚠️️️ Breaking changes ⚠️️️ 🔥**

I'm very sorry for these breaking changes, but I think the new names make more sense and are more consistent than the older ones 😰

1) A few interfaces/properties were renamed:

    Old Name | New name | Description
    --- | --- | ---
    `MenuOptionModel` | `SideMenuOption` | Entity that represents options/suboptions
    `displayName`| `displayText`| Property from the `SideMenuOption` interface that defines the text to be shown for the option/suboption
    `subItems`| `suboptions`| Property from the `SideMenuOption` interface that defines the suboptions of the option
    `selectOption` | `change` | Event emitted when the user selects an option/suboption from the side menu
    `itemHeight` | `optionHeight` | Property from the `SideMenuSettings` interface that defines the height for options/suboptions
    `SideMenuRedirectEvent` | `SideMenuOptionSelect` | Event used to update the selected option/suboption when changing the current page from outside of the side menu
    `SideMenuRedirectEventData` | `SideMenuOptionSelectData` |  Entity used to send data when using the `SideMenuRedirectEvent` event

2) The `subOptionIndentation` property from the `SideMenuSettings` interface has been changed and now each mode property is a number instead of a string.

**Upgrade Instructions ✅**

If you want to update your app from the previous version of this demo project (the one released on **06/01/2018**), please follow these steps:

1) Replace the old `MenuOptionModel` type of the options/suboptions by the new type `SideMenuOption` (usually this will affect your `app.component.ts` file only). So for example the following line:

    ```
    public options: Array<MenuOptionModel>;
    ```
 
    should be replaced by: 
     
    ```
    public options: Array<SideMenuOption>;
    ```

    Please notice that you'd also need to update the `import` statement as well.

2) When creating the options/suboptions, replace the old property name `displayName` by the new property name `displayText`. So for example the following option:

    ```
    this.options.push({
        iconName: 'home',
        displayName: 'Home', // <-- 'displayName' is the old property name!
        component: 'HomePage',
    });
    ```

    should be replaced by:

    ```
    this.options.push({
        iconName: 'home',
        displayText: 'Home', // <-- 'displayText' is the new property name!
        component: 'HomePage',
    });
    ```

3) Also when creating options with suboptions, replace the old `subItems` property by the new `suboptions` property. So for example the following option:

    ```
    this.options.push({
        displayText: 'Sub options with icons',
        subItems: [
            {
                iconName: 'basket',
                displayText: 'Sub Option 1',
                component: 'SubOptionOnePage'
            },
            // ...
        ]
    });
    ```

    should be replaced by:

    ```
    this.options.push({
        displayText: 'Sub options with icons',
        suboptions: [
            {
                iconName: 'basket',
                displayText: 'Sub Option 1',
                component: 'SubOptionOnePage'
            },
            // ...
        ]
    });
    ```

4) Replace the name of the `selectOption` event that is triggered when selecting an option/suboption, by the new `change` event (this should affect your `app.html` file only). So the following line:

    ```
    <side-menu-content [options]="options" (selectOption)="onOptionSelected($event)"></side-menu-content>
    ```

    should be replaced by

    ```
    <side-menu-content [options]="options" (change)="onOptionSelected($event)"></side-menu-content>
    ```

5) If you were using the `itemHeight` property from the `SideMenuSettings`, replace it by the new name `optionHeight`. So for example the following lines:

    ```
	public sideMenuSettings: SideMenuSettings = {
        // ...
        itemHeight: { md: 56, ios: 64, wp: 56 }
    };
    ```

    should be replaced by:

    ```
	public sideMenuSettings: SideMenuSettings = {
        // ...
        optionHeight: { md: 56, ios: 64, wp: 56 }
    };
    ```

6) If you were using the `subOptionIndentation` property from the `SideMenuSettings`, replace the values to be `number`s instead of `string`s. So for example the following lines:

    ```
	public sideMenuSettings: SideMenuSettings = {
        // ...
        subOptionIndentation: { md: '56px', ios: '64px', wp: '56px' }
    };
    ```

    should be replaced by:

    ```
	public sideMenuSettings: SideMenuSettings = {
        // ...
        subOptionIndentation: { md: 56, ios: 64, wp: 56 }
    };
    ```

7) If you were using the old `SideMenuRedirectEvent` event name and the `SideMenuRedirectEventData` type, replace it by the new `SideMenuOptionSelect` event name and `SideMenuOptionSelectData` type. So for example the following code:

    ```
    const redirectData: SideMenuRedirectEventData = { displayName: 'Option 1' };
    this.eventCtrl.publish(SideMenuRedirectEvent, redirectData);
    ```

    should be replaced by:

    ```
    const data: SideMenuOptionSelectData = { displayText: 'Option 1' };    
    this.eventCtrl.publish(SideMenuOptionSelect, data);
    ```

    Please also keep in mind that the `SideMenuDisplayText` and `SideMenuDisplayTextConditions` custom decorators were added to simplify how options can be selected from outside of the side menu so maybe you don't need to use this event at all.
