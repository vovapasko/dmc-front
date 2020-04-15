import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ServiceWorkerModule} from '@angular/service-worker';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreRouterConnectingModule} from '@ngrx/router-store';

import {ErrorInterceptor} from './core/interceptors/error.interceptor';
import {JwtInterceptor} from './core/interceptors/jwt.interceptor';
import {LoadingInterceptor} from './core/interceptors/loading.interceptor';

import {LayoutsModule} from './layouts/layouts.module';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';

import {AppComponent} from './app.component';
import {NotificationComponent} from './core/components/notification/notification.component';
import {NotificationService} from './core/services/notification.service';
import {Error404Component} from './pages/errors/error404/error404.component';
import {Error500Component} from './pages/errors/error500/error500.component';

import {UserEffects} from './core/store/effects/user.effects';
import {ContractorEffects} from './core/store/effects/contractor.effects';
import {reducerProvider, reducerToken} from './core/store/reducers/app.reducers';

import {environment} from '../environments/environment';
import {NewsEffects} from './core/store/effects/news.effects';


@NgModule({
    declarations: [
        AppComponent,
        Error404Component,
        Error500Component,
        NotificationComponent
    ],
    imports: [
        SharedModule,
        CoreModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LayoutsModule,
        AppRoutingModule,
        StoreModule.forRoot(reducerToken),
        EffectsModule.forRoot([UserEffects, ContractorEffects, NewsEffects]),
        StoreRouterConnectingModule.forRoot({stateKey: 'router'}),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    ],
    providers: [
        reducerProvider,
        {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
        NotificationService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
