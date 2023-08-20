import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { OAuthModule } from 'angular-oauth2-oidc';

import { ServicesListComponent } from './services-list/services-list.component';
import { ApiConnectorService } from './services/api-connector.service';

@NgModule({
  declarations: [AppComponent, ServicesListComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8000/v1'],
        sendAccessToken: true,
      },
    }),
  ],
  providers: [ApiConnectorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
