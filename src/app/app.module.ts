// Angular references
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Ionic references
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

// Ionic Native
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// App
import { MyApp } from './app.component';

// Pages
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

// Custom components
import { SideMenuContentComponent } from '../shared/side-menu-content/side-menu-content.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,

    // Side menu custom component
    SideMenuContentComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
