import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { appRoutes } from './app/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser"
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    importProvidersFrom(BrowserModule, BrowserAnimationsModule),
    provideRouter(appRoutes),
     provideAnimations(),
     providePrimeNG({
      theme: {
          preset: Aura
      }
  })
  ]
}).catch(err => console.error(err));