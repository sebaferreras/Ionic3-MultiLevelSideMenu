// ---------------------------------------------------
// This enum is used when the same component
// (page) is used in more than one option from the
// side menu. So instead of using our custom decorator
// passing the displayText of an option, we would need
// to give the decorator some information about how it
// should check which option from the side menu should
// be marked as selected based on a property from 
// the component
// ---------------------------------------------------

export enum Matcher {
    ToBe, // Expects the current value to be == to the expected value.
    NotToBe, // Expects the current value to be != to the expected value.
    ToEqual, // Expects the current value to be === to the expected value.
    NotToEqual, // Expects the current value to be !== to the expected value.
    ToBeDefined, // Expects the current value to be defined (not undefined)
    ToBeFalsy, //  Expects the current value to be falsy
    ToBeGreaterThan, // Expects the current value to be greater than the expected value.
    ToBeGreaterThanOrEqual, // Expects the current value to be greater than or equal to the expected value.
    ToBeLessThan, // Expects the current value to be less than the expected value.
    ToBeLessThanOrEqual, // Expects the current value to be less than or equal to the expected value.
    ToBeNull, // Expects the current value to be null.
    ToBeTruthy, // Expects the current value to be truthy.
    ToBeUndefined, // Expects the current value to be undefined.
    ToContain, // Expects the current value to contain a specific value.
    ToMatch // Expects the current value to match a regular expression
}

// SideMenuOptionSelectCondition interface
export interface SideMenuOptionSelectCondition {

    // The name of a property from the component to
    // check its value against the value
    propertyName: string;

    // The value that the property with name propertyName 
    // should have mark this option as selected
    value?: any;

    // Defines how should the value from propertyName
    // to be checked to figure out if the condition is satisfied
    matcher: Matcher;

    // The displayText of the option from the side menu 
    // that should be marked as selected if the condition is satisfied
    displayText: string;
}
