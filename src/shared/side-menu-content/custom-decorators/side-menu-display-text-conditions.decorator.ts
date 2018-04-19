// Angular
import { AppModule } from "../../../app/app.module";

// Ionic
import { Events } from "ionic-angular";

// SideMenuContentComponent
import { SideMenuOptionSelectCondition, Matcher } from "../models/side-menu-option-select-condition";
import { SideMenuOptionSelect, SideMenuOptionSelectData } from "../models/side-menu-option-select-event";

export function SideMenuDisplayTextConditions(conditions: Array<SideMenuOptionSelectCondition>) {

    // Method that uses our events to tell the SideMenuContentComponent that
    // an option with the name sent should be marked as selected
    function selectOption(name: string): void {

        // Get an instance of the Events service
        const eventsCtrl = AppModule.injector.get(Events);

        // Prepare the data that the SideMenuContentComponent expects
        const redirectData: SideMenuOptionSelectData = { displayText: name };

        // Send the event with the data
        eventsCtrl.publish(SideMenuOptionSelect, redirectData);
    }

    // Method that returns true if the condition is satisfied
    function conditionIsMet(self: any, condition: SideMenuOptionSelectCondition): boolean {
        switch (condition.matcher) {
            case Matcher.ToBe:
                return self[condition.propertyName] == condition.value;
            case Matcher.NotToBe:
                return self[condition.propertyName] != condition.value;
            case Matcher.ToEqual:
                return self[condition.propertyName] === condition.value;
            case Matcher.NotToEqual:
                return self[condition.propertyName] !== condition.value;
            case Matcher.ToBeDefined:
                return self[condition.propertyName] !== undefined;
            case Matcher.ToBeUndefined:
                return self[condition.propertyName] === undefined;
            case Matcher.ToBeFalsy:
                return !!!self[condition.propertyName];
            case Matcher.ToBeTruthy:
                return !!self[condition.propertyName];
            case Matcher.ToBeGreaterThan:
                return self[condition.propertyName] > condition.value;
            case Matcher.ToBeGreaterThanOrEqual:
                return self[condition.propertyName] >= condition.value;
            case Matcher.ToBeLessThan:
                return self[condition.propertyName] < condition.value;
            case Matcher.ToBeLessThanOrEqual:
                return self[condition.propertyName] <= condition.value;
            case Matcher.ToBeNull:
                return self[condition.propertyName] === null;
            case Matcher.ToContain:
                return (<Array<any>>self[condition.propertyName]).indexOf(condition.value) > -1;
            case Matcher.ToMatch:
                const regexp = new RegExp(condition.value);
                return regexp.test(self[condition.propertyName])
        }
    }

    // Method that returns the name of the option whose condition is satisfied
    function checkConditions(self: any, conditions: Array<SideMenuOptionSelectCondition>): string {
        let result = null;
        for (let i = 0; i < conditions.length; i++) {
            if (conditionIsMet(self, conditions[i])) {
                result = conditions[i].displayText;
                break;
            }
        }
        return result;
    }

    return function (constructor) {
        const originalDidEnter = constructor.prototype.ionViewDidEnter;

        constructor.prototype.ionViewDidEnter = function () {

            // Call the ionViewDidEnter event defined in the page
            originalDidEnter && typeof originalDidEnter === 'function' && originalDidEnter.apply(this, arguments);

            if (AppModule && AppModule.injector) {
                if (conditions && conditions.length) {
                    // Check if there's at least one option that satisfies its conditions
                    const optionNameToBeSelected = checkConditions(this, conditions);

                    // If we could find one condition that is satisfied, tell
                    // the SideMenuContentComponent to select that option
                    if (optionNameToBeSelected) {
                        selectOption(optionNameToBeSelected)
                    } else {
                        console.warn(`[SideMenuDisplayTextConditions]: No condition could be met.`);
                    }
                } else {
                    console.error('[SideMenuDisplayTextConditions]: You must provide an array of SideMenuOptionSelectCondition entities in order to use this decorator.');
                }
            } else {
                console.error('[SideMenuDisplayTextConditions]: You must make the injector to be available in the AppModule to use this decorator. Please take a look at [DOCS URL] for more information.');
            }
        }
    }

}