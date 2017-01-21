// Angular references
import { NgModule, ErrorHandler } from '@angular/core';

// Ionic references
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// App
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

// Custom components
import { SideMenuContentComponent } from '../shared/side-menu/side-menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,

    // Side menu custom component
    SideMenuContentComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
