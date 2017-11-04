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