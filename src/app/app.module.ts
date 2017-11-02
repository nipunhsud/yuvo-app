import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AgmCoreModule } from '@agm/core';
import { HttpModule } from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';
import { RouterModule, Routes } from '@angular/router';
import { QuestionPage } from '../pages/question/question';
import { MainPage } from '../pages/main/main';
import { QuestionAnswerPage } from '../pages/question-answer/question-answer';
import { AnswerPage } from '../pages/answer/answer';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuestionPage,
    MainPage,
    QuestionAnswerPage,
    AnswerPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC6cDj3MI_KcV9VVg-R_guAPMJtkxuxtRI',
      libraries: ['places']
    }),
    RouterModule.forRoot(
      [
        { path: 'home', component: HomePage },
        { path: 'question-list', component: QuestionPage },
      ],
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MainPage,
    QuestionAnswerPage,
    AnswerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
  
})
export class AppModule {}

