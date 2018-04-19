// Angular
import { AppModule } from "../../../app/app.module";

// Ionic
import { Events } from "ionic-angular";

// SideMenuContentComponent
import { SideMenuOptionSelect, SideMenuOptionSelectData } from "../models/side-menu-option-select-event";

export function SideMenuDisplayText(displayText: string) {

    return function (constructor) {
        const originalDidEnter = constructor.prototype.ionViewDidEnter;

        constructor.prototype.ionViewDidEnter = function () {

            // Call the ionViewDidEnter event defined in the page
            originalDidEnter && typeof originalDidEnter === 'function' && originalDidEnter.apply(this, arguments);

            if (AppModule && AppModule.injector) {
                if (displayText) {
                    // Get an instance of the Events service
                    const eventsCtrl = AppModule.injector.get(Events);

                    // Prepare the data that the SideMenuContentComponent expects
                    const redirectData: SideMenuOptionSelectData = { displayText: displayText };

                    // Send the event with the data
                    eventsCtrl.publish(SideMenuOptionSelect, redirectData);
                } else {
                    console.error('[SideMenuDisplayText]: You must provide a name in order to use this decorator.');
                }
            }
            else {
                console.error('[SideMenuDisplayText]: You must make the injector to be available in the AppModule to use this decorator. Please take a look at [DOCS URL] for more information.');
            }
        };
    }

}